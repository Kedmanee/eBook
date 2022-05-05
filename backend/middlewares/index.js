const { log } = require("console");
const pool = require("../config");

async function isLoggedIn(req, res, next) {
    let authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        return res.status(401).send('You are not logged in')
    }

    // Check token
    const [tokens] = await pool.query('SELECT * FROM tokens WHERE token = ?', [part2])
    const token = tokens[0]
    if (!token) {
        return res.status(401).send('You are not logged in')
    }

    // Set user
    const [users] = await pool.query(
        'SELECT * ' +
        'FROM customer WHERE customer_id = ?', [token.cus_id]
    )

    if (users[0]) {
        const [selectTotalEbook] = await pool.query('SELECT count(ebook_id) as `total_ebook` FROM customer_ebook WHERE customer_id = ?', [
            token.cus_id
        ])
        users[0].type = 'customer'
        users[0].total_ebook = selectTotalEbook[0].total_ebook

        if(users[0].total_ebook > 10){
            await pool.query('update customer set grade = "Silver" WHERE customer_id = ?', [
                token.cus_id
            ])
        }
        if(users[0].total_ebook > 30){
            await pool.query('update customer set grade = "Gold" WHERE customer_id = ?', [
                token.cus_id
            ])
        }

        req.user = users[0]
    }
    else{
        const [adminUser] = await pool.query(
            'SELECT * ' +
            'FROM admin WHERE admin_id = ?', [token.ad_id]
        )
        adminUser[0].type = 'admin'
        req.user = adminUser[0]
    }
    next()
}

const isAdmin = (req, res, next) => {
    if(req.user.type == 'admin') {
        return next()
    }
    return res.status(403).send('You do not have permission to perform this action')
  }


module.exports = {
    isLoggedIn,
    isAdmin
} 