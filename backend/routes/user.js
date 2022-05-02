const express = require("express")
const pool = require("../config")
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')

router = express.Router();

const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const usernameValidator = async  (value, helpers) => {

    const [rows, _] = await pool.query("SELECT username FROM customer WHERE username = ?", [value])
    console.log(rows[0])
    if (rows[0].length > 0) {
        const message = 'This user is already taken'
        throw new Joi.ValidationError(message, { message })

    }
    return value
}

const signupSchema = Joi.object({
    name: Joi.string(),
    username: Joi.string().min(5).max(20).custom(usernameValidator),
    password: Joi.string().custom(passwordValidator),
    phone:  Joi.string().pattern(/0[0-9]{9}/),
    email:  Joi.string(),
    sex:  Joi.string(),
    date:  Joi.string(),
}).unknown();   


//signup
router.post('/user/signup', async (req, res, next) => {
    try {
        const value = await signupSchema.validateAsync(req.body, { abortEarly: false });
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            err: err.details[0].message
        })
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const name = req.body.name.split(" ");

    try {
        await conn.query(
            'INSERT INTO `customer` (`username`, `password`, `date`, `fname`, `lname`,`phone`,`email`,`grade`,`sex` ) VALUES (?, ?, ?, ?, ?,?,?,"Bronze",?)',
            [req.body.username, await bcrypt.hash(req.body.password, 5),req.body.date, name[0], name[1],req.body.phone,req.body.email,req.body.sex])
        
        conn.commit()
        res.status(201).send()
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})
const loginSchema = Joi.object({
     username: Joi.string().required(),
     password: Joi.string().required()
 })
 

//login
 router.post('/user/login', async (req, res, next) => {
     console.log(req.body)
     try {
         await loginSchema.validateAsync(req.body, { abortEarly: false })
     } catch (err) {
         return res.status(400).send('err')
     }
     const username = req.body.username
     const password = req.body.password
 
     const conn = await pool.getConnection()
     await conn.beginTransaction()
 
     try {
         // Check if username is correct
         const [users] = await conn.query(
             'SELECT * FROM customer WHERE username=?', 
             [username]
         )
         const user = users[0]
         if (!user) {    
             throw new Error('Incorrect username or password')
         }
 
         // Check if password is correct
         if (!(await bcrypt.compare(password, user.password))) {
             throw new Error('Incorrect username or password')
         }
        
         // Check if token already existed
         const [tokens] = await conn.query(
             'SELECT * FROM tokens WHERE cus_id=?', 
             [user.customer_id]
         )
         
         let token = tokens[0]?.token
         
         if (!token) {
             // Generate and save token into database
             token = generateToken()
             console.log(token)
             await conn.query(
                 'INSERT INTO tokens(cus_id, token) VALUES (?, ?)', 
                 [user.customer_id, token]
             )
         }
 
         conn.commit()
         res.status(200).json({'token': token})
     } catch (error) {
         conn.rollback()
         res.status(400).json(error.toString())
     } finally {
         conn.release()
     }
 })


 router.get('/user/me', isLoggedIn, async (req, res, next) => {
     // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
     console.log('test')
     res.json(req.user)
    })
exports.router = router