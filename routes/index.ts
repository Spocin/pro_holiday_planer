/*Imports*/
import express from "express";

/*Declarations*/
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

export {router as indexRouter}
