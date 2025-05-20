const express =require('express');
const Joi =require('joi')
const router=express.Router();
const mysql=require('../mysql')



router.get('/',(req,res)=>{
    var query=`SELECT d.devicename  ,ips.name as subnet ,ipa.* FROM ip_addresses as ipa INNER JOIN device_info as d ON d.id=ipa.device_id inner join ip_subnets as ips on ips.id=ipa.subnet_id   where ipa.delete_flag='N'`;
    //var id=req.params.id;

    mysql.execute(query).then(result=>{
        console.log("Ip subnet",result[0]);
        return res.json(result[0]);
    }).catch(error=>{
        console.log("IP subnet not found",error);
        return res.status(404).send("data not found");
    })
});



router.get('/device',(req,res)=>{
    var query=`Select id,devicename from device_info`;
    //var id=req.params.id;

    mysql.execute(query).then(result=>{
        console.log("IP Subnet",result[0]);
        return res.json(result[0]);
    }).catch(error=>{
        console.log("IP Subnet not found ",error);
        return res.status(404).send("ipSubnet data not found");
    })
});

router.get('/subnet',(req,res)=>{
    var query=`Select id,name from ip_subnets`;
    //var id=req.params.id;

    mysql.execute(query).then(result=>{
        console.log("IP Subnet",result[0]);
        return res.json(result[0]);
    }).catch(error=>{
        console.log("IP Subnet not found ",error);
        return res.status(404).send("ipSubnet data not found");
    })
});



router.get('/:id',(req,res)=>{
   
    var query="SELECT * from ip_addresses WHERE id=?";
    var id=req.params.id;

    mysql.query(query,[id]).then((result)=>{
        console.log(result[0]);
        return res.json(result[0]);
    }).catch((error)=>{
        console.log("error",error);
        return res.status(404).send("IP_address Not Found");
    });
});




router.post('/', (req, res) => {
    // const { error } = validatedevice(req.body);
    // if (error) {
    //     console.log("Validation error:", error.details[0].message);
    //     return res.status(400).send(error.details[0].message); // 400 = Bad Request
    // }

    const values = req.body;
    const query = "INSERT INTO  ip_addresses SET ?";

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
    var query = "UPDATE ip_addresses SET ? WHERE id = ? ";

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

    var query = "UPDATE ip_addresses SET delete_flag='Y' WHERE id = ? ";

    mysql.query(query,[id]).then(result=>{
        return res.json({ success: "Data deleted" });
    }).catch(error=>{
        console.log("error",error);
        return res.status(500).json("error",error);
    });
});




module.exports =router;

