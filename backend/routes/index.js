const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/eBook", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM e_book natural JOIN author JOIN book_type ON (book_type_id = type_id)")

    return res.json(rows);
  }
   catch (err) {
    console.log("---------------")
    return res.status(500).json(err)
  }
});

exports.router = router;
