const express = require("express")
const pool = require("../config")
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { isLoggedIn } = require('../middlewares')

router = express.Router();


//add to cart
router.post('/cart/add/:eid', async (req, res, next) => {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  try {
    let [rows,fields,] = await conn.query("SELECT * FROM `e_book` WHERE `eid` = ?", [
      req.params.eid,
    ]);
    let [total_price, fie] = await conn.query("SELECT `cart_id`,`total_price` FROM `cart` WHERE `customer_id` = ?", [
      req.body.id
    ]);
    if (total_price[0] === undefined) {
      let [addcart, fields1] = await conn.query('INSERT INTO `cart` (`cart_date`, `total_price`, `status`, `pay_date`, `customer_id`) VALUES (CURRENT_TIMESTAMP, 0, 0, null,?)', [
        req.body.id
      ]);
      [total_price, fie] = await conn.query("SELECT `cart_id`,`total_price` FROM `cart` WHERE `customer_id` = ?", [req.body.id]);
    }

    let [checkbook, fields3] = await conn.query('SELECT * FROM `cart_item` WHERE `cart_id` = ? AND `ebook_id` = ?', [total_price[0].cart_id, req.params.eid]);

    if (checkbook.length > 0) {
      throw new Error('This E-book is already in cart')
    }

    let [addbook, fields1] = await conn.query('INSERT INTO `cart_item` (`unit_price`, `ebook_id`, `cart_id`) VALUES (?, ?, ?)', [
      rows[0].price, req.params.eid, total_price[0].cart_id
    ]);

    total_price[0].total_price = total_price[0].total_price + rows[0].price

    let [putprice, fields2] = await conn.query('UPDATE `cart` SET `total_price` = ? WHERE `cart_id` =?', [
      total_price[0].total_price, total_price[0].cart_id
    ]);


    await conn.commit()
    return res.json()

  } catch (err) {
    await conn.rollback();
    res.status(405).json(err.toString())
  } finally {
    conn.release();
  }
})

//show cart
router.get('/cart/show/:id', isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.params.id)
    const [cart, fields2] = await pool.query("SELECT cart_id FROM cart WHERE customer_id = ?;", req.params.id)
    const [newsum, fields1] = await pool.query("SELECT SUM(unit_price) `sum_price` FROM cart_item WHERE cart_id = ?;", cart[0].cart_id)
    const [updatesum, fields3] = await pool.query("UPDATE cart SET total_price = ? WHERE customer_id = ?",  [
      newsum[0].sum_price, req.params.id
    ])

    const [rows, fields] = await pool.query("SELECT * FROM cart_item natural JOIN cart JOIN e_book ON (eid = ebook_id) WHERE customer_id = ?", req.user.customer_id)
    return res.json(rows);
  }
  catch (err) {
    return res.status(500).json(err)
  }
})

//del from cart
router.delete('/cart/del/:itemno', async (req, res, next) => {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  try {
    console.log(req.params.itemno)

    // let [item_price, fie] = await conn.query("SELECT `unit_price`,`cart_id` FROM `cart_item` WHERE `item_no` = ?", [
    //   req.params.itemno
    // ]);

    // let [settotal, fields] = await conn.query("UPDATE cart SET total_price = total_price-? WHERE cart_id = ?", [item_price,
    //   item_price[0].cart_id
    // ]);

    const del = await conn.query("DELETE FROM cart_item WHERE item_no = ?",[req.params.itemno]);

    await conn.commit()
    return res.json()

  } catch (err) {
    await conn.rollback();
    res.status(405).json(err.toString())
  } finally {
    conn.release();
  }
})
exports.router = router