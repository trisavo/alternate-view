const express=require('express');
const router=express.Router();

router.get('/',(req,res)=> {
  res.send('server is up omg i did it');
});

module.exports=router;
