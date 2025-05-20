const express =require('express');
const Joi =require('joi')
const router=express.Router();
const mysql=require('../mysql')



router.get('/',(req,res)=>{
    var query=`SELECT f.name as floor_name ,r.* FROM rooms as r INNER JOIN floors as f ON f.id=r.floor_id  where r.delete_flag='N'`;
    //var id=req.params.id;

    mysql.execute(query).then(result=>{
        console.log("device Location map",result[0]);
        return res.json(result[0]);
    }).catch(error=>{
        console.log("device Location map",error);
        return res.status(404).send("data not found");
    })
});



router.get('/floors',(req,res)=>{
    var query=`Select id,name from floors`;
    //var id=req.params.id;

    mysql.execute(query).then(result=>{
        console.log("Floors",result[0]);
        return res.json(result[0]);
    }).catch(error=>{
        console.log("Floors",error);
        return res.status(404).send("Floorss data not found");
    })
});



router.get('/:id',(req,res)=>{
   
    var query="SELECT * from rooms WHERE id=?";
    var id=req.params.id;

    mysql.query(query,[id]).then((result)=>{
        console.log(result[0]);
        return res.json(result[0]);
    }).catch((error)=>{
        console.log("error",error);
        return res.status(404).send("Rooms Not Found");
    });
});




router.post('/', (req, res) => {
    // const { error } = validatedevice(req.body);
    // if (error) {
    //     console.log("Validation error:", error.details[0].message);
    //     return res.status(400).send(error.details[0].message); // 400 = Bad Request
    // }

    const values = req.body;
    const query = "INSERT INTO  rooms SET ?";

    mysql.query(query,[values]).then(result=>{
        console.log("result",result);
        return res.json({id: result[0].insertId});
    }).catch(error=>{
        console.log("Insert error",error);
        return res.status(500).json({ error: "Database insert failed" });
    });
});



router.put('/:id',(req,res)=>{
    // const { error } = validatedevice(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message); // 400 = Bad Request
    // }
    var id = req.params.id;
    var values = req.body;
    var query = "UPDATE rooms SET ? WHERE id = ? ";

    // Return Query Status
    // mysql.exec(query, [values, id], function (err, data) {
    //     if (err) { if (err) return res.status(404).send('error'); };
    //     if (data.affectedRows < 1) {
    //         return res.status(404).send('error');
    //     }
    //     res.json({ success: "Data" });
    // });

    mysql.query(query,[values,id]).then(result=>{
        return res.json({ success: "Data" });
    }).catch(error=>{
        console.log("Update error",error);
        return res.status(500).json("error",error);
    });
});

router.delete('/:id',(req,res)=>{
    var id = req.params.id;

    var query = "UPDATE rooms SET delete_flag='Y' WHERE id = ? ";

    mysql.query(query,[id]).then(result=>{
        return res.json({ success: "Data deleted" });
    }).catch(error=>{
        console.log("error",error);
        return res.status(500).json("error",error);
    });
});




module.exports =router;

