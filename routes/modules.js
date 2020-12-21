var express = require('express');
var router = express.Router();
const pool  = require('../config/settings')



router.get('/', function(req, res) {
    pool.query("SELECT * FROM modules").then(result=>{
        console.log(result);
        const modules = result.rows;
        return res.json({modules})
    }).catch(err=>{
        return res.json({err})
    })
});


router.get("/:module_id", function (req, res) {
  const module_id = req.params.module_id;
  console.log(module_id);
  const query = "SELECT * FROM modules WHERE module_id = $1";
  const query_string={
      text:query,
      values:[module_id]
  }
  pool.query(query_string,(err,result)=>{
      if(err){
          return res.json({err})
      }
      const data = result.rows[0];
      return res.json({module:data});
  })
});


router.post('/',(req,res)=>{
    const body = req.body;
    // let query="INSERT INTO modules()VALUES (?, ?, ?, ?, ?)"
    let query="INSERT INTO modules("
    let columns  = [...Object.keys(body.module)].map(col=>col).join(",");
    query+=columns;
    query+=")";
    query+=" VALUES (";
    let t = [...Object.keys(body.module)].map((col,i)=>"$"+(i+1)).join(",");
    query+=t;
    query+=")";
    const values =  [...Object.values(body.module)].map(item=>item);
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


router.put('/:module_id',(req,res)=>{
    const module_id = req.params.module_id;
    const body = req.body;
    // let query="INSERT INTO modules()VALUES (?, ?, ?, ?, ?)"
    let query=" UPDATE modules SET "
    let columns  = [...Object.keys(body.module)].map((col,i)=>col+"="+"$"+(i+1)).join(",");
    query+=columns;
    query+=" WHERE module_id=$"+(Object.keys(body.module).length+1);
    const values =  [...Object.values(body.module)].map(item=>item);
    values.push(module_id);

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

router.delete('/:module_id',(req,res)=>{
    const module_id = req.params.module_id;
    const query = "DELETE FROM modules WHERE module_id = $1";  
    const query_string  = {
        text:query,
        values:[module_id]
    }
    pool.query(query_string,(err,result)=>{
        if(err){
            return res.json({err})
        }
        const data = result.rows[0];
        return res.json({module:data});
    })
})
module.exports = router;
