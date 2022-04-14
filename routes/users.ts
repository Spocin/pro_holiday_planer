/*Imports*/
import express from "express";

/*Declarations*/
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export {router};
