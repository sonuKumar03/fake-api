var express = require('express');
var router = express.Router();
const pool  = require('../config/settings')



router.get('/', function(req, res) {
    pool.query("SELECT * FROM courses").then(result=>{
        console.log(result);
        const courses = result.rows;
        return res.json({courses})
    }).catch(err=>{
        console.log(err);
        return res.json({err})
    })
});


router.get("/:course_id", function (req, res) {
  const course_id = req.params.course_id;
  const query = "SELECT * FROM courses WHERE course_id = $1";
  const values=[];
  values.push(course_id);
  const query_string = {
      text:query,
      values
  }
  pool.query(query_string,(err,result)=>{
      if(err){
          return res.json({err})
      }
      const data = result.rows[0];
      return res.json({course:data});
  })
});


router.post('/',(req,res)=>{
    const body = req.body;
    // let query="INSERT INTO courses()VALUES (?, ?, ?, ?, ?)"
    let query="INSERT INTO courses("
    let columns  = [...Object.keys(body.course)].map(col=>col).join(",");
    query+=columns;
    query+=")";
    query+=" VALUES (";
    let t = [...Object.keys(body.course)].map((col,i)=>"$"+(i+1)).join(",");
    query+=t;
    query+=")";
    const values =  [...Object.values(body.course)].map(item=>item);
    const query_string = {
        text:query,
        values:values
    }
    pool.query(query_string,(err,result)=>{
        if(err){
            return res.json({err});
        }
        return res.json({result})
    })
})


router.put('/:course_id',(req,res)=>{
    const course_id = req.params.course_id;
    const body = req.body;
    // let query="INSERT INTO courses()VALUES (?, ?, ?, ?, ?)"
    let query=" UPDATE courses SET "
    let columns  = [...Object.keys(body.course)].map((col,i)=>col+"="+"$"+(i+1)).join(",");
    query+=columns;
    query+=" WHERE course_id=$"+(Object.keys(body.course).length+1);
    const values =  [...Object.values(body.course)].map(item=>item);
    values.push(course_id);

    const query_string = {
        text:query,
        values:values
    }
    pool.query(query_string,(err,result)=>{
        if(err){
            return res.json({err});
        }
        return res.json({result})
    })
})

router.delete('/:course_id',(req,res)=>{
    const course_id = req.params.course_id;
    const query = "DELETE FROM courses WHERE course_id = $1";  
    const query_string = {
        text:query,
        values:[course_id]
    }
    pool.query(query_string,(err,result)=>{
        if(err){
            return res.json({err})
        }
        const data = result.rows[0];
        return res.json({course:data});
    })
})
module.exports = router;
