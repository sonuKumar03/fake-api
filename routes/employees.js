const app = require('express');
const router = app.Router();


router.get('/employees',(req,res)=>{
    return res.json("all emp");
})


router.get('/employee/:id',(req,res)=>{
    return res.json({msg:"one ,emp"});
})

router.post('/employee',(req,res)=>{
    return res.json({msg:"post"})
})

router.put('/employee/:id',(req,res)=>{
    return res.json({msg:"put"})
})

router.delete('/employee/:id',(req,res)=>{
    return res.json({msg:"put"})
})


module.exports = router