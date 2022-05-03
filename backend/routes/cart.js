const express = require("express")
const pool = require("../config")
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { isLoggedIn } = require('../middlewares')

router = express.Router(); 


//add to cart
router.post('/cart/add/:eid', async (req, res, next) => {
    console.log(req.params.eid)
    const conn = await pool.getConnection();
      // Begin transaction
      await conn.beginTransaction();
      try {
        let [
          rows,
          fields,
        ] = await conn.query("SELECT * FROM `e_book` WHERE `eid` = ?", [
          req.params.eid,
        ]);
    
        console.log(rows)
      } catch (err) {
        await conn.rollback();
        return res.status(500).json(err);
      } finally {
        conn.release();
      }
})
exports.router = router