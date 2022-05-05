const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const Joi = require('joi')
const { isLoggedIn } = require('../middlewares')
const { isAdmin } = require('../middlewares')

router = express.Router();



// Require multer for file upload
const multer = require("multer");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

// Like blog that id = blogId
// router.put("/blogs/addlike/:blogId", async function (req, res, next) {
//   const conn = await pool.getConnection();
//   // Begin transaction
//   await conn.beginTransaction();

//   try {
//     let [
//       rows,
//       fields,
//     ] = await conn.query("SELECT `like` FROM `blogs` WHERE `id` = ?", [
//       req.params.blogId,
//     ]);
//     let like = rows[0].like + 1;

//     await conn.query("UPDATE `blogs` SET `like` = ? WHERE `id` = ?", [
//       like,
//       req.params.blogId,
//     ]);

//     await conn.commit();
//     res.json({ like: like });
//   } catch (err) {
//     await conn.rollback();
//     return res.status(500).json(err);
//   } finally {
//     conn.release();
//   }
// });
const signupSchema = Joi.object({
  title: Joi.string().min(5).max(100),
  price: Joi.number(),
  author: Joi.string().min(2).max(100),
  synopsis:  Joi.string().min(5).max(300),
}).unknown(); 

router.post("/ebook/upload", isLoggedIn, isAdmin, upload.single("myImage"), async (req, res, next) => {
      const file = req.file;
 
      if (!file) {
        return res.status(400).json({ message: "Please upload a file" });
      }
      try {
        const value = await signupSchema.validateAsync(req.body, { abortEarly: false });
    } catch (err) {
        console.log(err.details[0].message)
        return res.status(400).json({
          message: err.details[0].message
        })
    }
      const title = req.body.title;
      const price = req.body.price;
      const book_type_id = req.body.type;
      const author = req.body.author;
      const synopsis = req.body.synopsis;
      const imageOfEbook = file.path;
      

      const conn = await pool.getConnection();
      // Begin transaction
      await conn.beginTransaction();

      try {
        const authorlist = await conn.query("SELECT * FROM author WHERE author_name=?",[author]);
        let authorid=0
        if (authorlist[0].length>0){
          console.log("Jame")
          authorid = authorlist[0][0].author_id
          console.log(authorid)
        }
        else{

          const authorinsert = await conn.query("INSERT INTO author(author_name) VALUES(?);",[author]);

          authorid = authorinsert[0].insertId;
        }
        console.log(authorid)
        const results = await conn.query(
          "INSERT INTO e_book(title, price, book_type_id, synopsis, imageOfEbook,author_id) VALUES(?, ?, ?, ?, ?,?);",
          [title, price, book_type_id, synopsis,imageOfEbook,authorid]
        );
        const bookid = results[0].insertId;

        await conn.commit();
        res.send("success!");
      } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
      } finally {
        console.log("finally");
        conn.release();
      }
    
  }
);

router.delete("/ebook/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  const conn = await pool.getConnection();
      // Begin transaction
  await conn.beginTransaction();
  try {
    console.log(req.params.id)
    const results = await conn.query(
      "DELETE FROM cart_item WHERE ebook_id = ?",
      [req.params.id]
    );
    console.log(results)
    const del = await conn.query("DELETE FROM e_book WHERE eid = ?",[req.params.id]);
    await conn.commit();
    res.send("success!");
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

}


);
router.get("/selectBook/:ebook", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM e_book natural JOIN author JOIN book_type ON (book_type_id = type_id) WHERE eid = ?",[req.params.ebook])

    return res.json(rows);
  }
   catch (err) {
    console.log("---------------")
    return res.status(500).json(err)
  }
});

exports.router = router;
