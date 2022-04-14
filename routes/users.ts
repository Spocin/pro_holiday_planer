/*Imports*/
import express from "express";

/*Declarations*/
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

export {router as usersRouter};
