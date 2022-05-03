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

// Blog detail
// router.get("/blogs/:id", function (req, res, next) {
//   // Query data from 3 tables
//   const promise1 = pool.query("SELECT * FROM blogs WHERE id=?", [
//     req.params.id,
//   ]);
//   const promise2 = pool.query("SELECT * FROM comments WHERE blog_id=?", [
//     req.params.id,
//   ]);
//   const promise3 = pool.query("SELECT * FROM images WHERE blog_id=?", [
//     req.params.id,
//   ]);

//   // Use Promise.all() to make sure that all queries are successful
//   Promise.all([promise1, promise2, promise3])
//     .then((results) => {
//       const [blogs, blogFields] = results[0];
//       const [comments, commentFields] = results[1];
//       const [images, imageFields] = results[2];
//       comments.map(comments => {
//         comments.editToggle = false
//         comments.editCommentMessage = comments.comment
//       });
//       res.json({
//         blog: blogs[0],
//         images: images,
//         comments: comments,
//         error: null,
//       });
//     })
//     .catch((err) => {
//       return res.status(500).json(err);
//     });
// });

// router.put("/blogs/:id", function (req, res) {
//   // Your code here
//   return;
// });

// router.delete("/blogs/:blogId", async function (req, res, next) {
//   // Your code here
//   const conn = await pool.getConnection();
//   // Begin transaction
//   await conn.beginTransaction();

//   try {
//     // Check that there is no comments
//     const [
//       rows1,
//       fields1,
//     ] = await conn.query(
//       "SELECT COUNT(*) FROM `comments` WHERE `blog_id` = ?",
//       [req.params.blogId]
//     );
//     console.log(rows1);

//     if (rows1[0]["COUNT(*)"] > 0) {
//       return res
//         .status(400)
//         .json({ message: "Cannot delete blogs with comments" });
//     }

//     //Delete files from the upload folder
//     const [
//       images,
//       imageFields,
//     ] = await conn.query(
//       "SELECT `file_path` FROM `images` WHERE `blog_id` = ?",
//       [req.params.blogId]
//     );
//     const appDir = path.dirname(require.main.filename); // Get app root directory
//     console.log(appDir)
//     images.forEach((e) => {
//       const p = path.join(appDir, 'static', e.file_path);
//       fs.unlinkSync(p);
//     });

//     // Delete images
//     await conn.query("DELETE FROM `images` WHERE `blog_id` = ?", [
//       req.params.blogId,
//     ]);
//     // Delete the selected blog
//     const [
//       rows2,
//       fields2,
//     ] = await conn.query("DELETE FROM `blogs` WHERE `id` = ?", [
//       req.params.blogId,
//     ]);

//     if (rows2.affectedRows === 1) {
//       await conn.commit();
//       res.status(204).send();
//     } else {
//       throw "Cannot delete the selected blog";
//     }
//   } catch (err) {
//     console.log(err)
//     await conn.rollback();
//     return res.status(500).json(err);
//   } finally {
//     conn.release();
//   }
// });

exports.router = router;
