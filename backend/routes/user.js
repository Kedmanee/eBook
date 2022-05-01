const { json } = require("express");
const express = require("express");
const pool = require("../config");

const router = express.Router();

// Create user
router.post('/user/signup', async function (req, res, next) {
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();
    const name = req.body.name.split(" ");
    try {
        const [rows1, fields1] = await conn.query(
            'INSERT INTO `customer` (`username`, `password`, `date`, `fname`, `lname`,`phone`,`email`,`grade`,`sex` ) VALUES (?, ?, ?, ?, ?,?,?,"Bronze",?)',
            [req.body.username, req.body.password,req.body.date, name[0], name[1],req.body.phone,req.body.email,req.body.sex])
        res.json({
            message: "success"
        })
        await conn.commit()

    } catch (err) {
        console.log(err)
        await conn.rollback();
        return res.json(err)
    } finally {
        console.log('finally')
        conn.release();
    }
});

exports.router = router