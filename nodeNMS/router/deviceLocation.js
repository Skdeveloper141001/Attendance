const express =require('express');
const Joi =require('joi')
const router=express.Router();
const mysql=require('../mysql')



router.get('/',(req,res)=>{
    var query=`SELECT l.name  , di.devicename,dl.* FROM device_locations AS dl INNER JOIN device_info AS di ON di.id=dl.device_id inner join locations as l on dl.location_id=l.id where dl.delete_flag='N'`;
    //var id=req.params.id;

    mysql.execute(query).then(result=>{
        console.log("device Location map",result[0]);
        return res.json(result[0]);
    }).catch(error=>{
        console.log("device Location map",error);
        return res.status(404).send("data not found");
    })
});

router.get('/devices',(req,res)=>{
    var query=`Select id,devicename from device_info  `;
    //var id=req.params.id;

    mysql.execute(query).then(result=>{
        console.log("device Location map",result[0]);
        return res.json(result[0]);
    }).catch(error=>{
        console.log("device Location map",error);
        return res.status(404).send("data not found");
    })
});

router.get('/location',(req,res)=>{
    var query=`Select id,name from locations`;
    //var id=req.params.id;

    mysql.execute(query).then(result=>{
        console.log("Locations",result[0]);
        return res.json(result[0]);
    }).catch(error=>{
        console.log("Locations",error);
        return res.status(404).send("Locations data not found");
    })
});



router.get('/:id',(req,res)=>{
   
    var query="SELECT * from device_locations WHERE id=?";
    var id=req.params.id;

    mysql.query(query,[id]).then((result)=>{
        console.log(result[0]);
        return res.json(result[0]);
    }).catch((error)=>{
        console.log("error",error);
        return res.status(404).send("Device Group Not Found");
    });
});




router.post('/', (req, res) => {
    // const { error } = validatedevice(req.body);
    // if (error) {
    //     console.log("Validation error:", error.details[0].message);
    //     return res.status(400).send(error.details[0].message); // 400 = Bad Request
    // }

    const values = req.body;
    const query = "INSERT INTO  device_locations SET ?";

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
    var query = "UPDATE device_locations SET ? WHERE id = ? ";

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

    var query = "UPDATE device_locations SET delete_flag='Y' WHERE id = ? ";

    mysql.query(query,[id]).then(result=>{
        return res.json({ success: "Data deleted" });
    }).catch(error=>{
        console.log("error",error);
        return res.status(500).json("error",error);
    });
});




module.exports =router;

