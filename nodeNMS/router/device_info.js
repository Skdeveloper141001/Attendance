const express =require('express');
const Joi =require('joi')
const router=express.Router();
const mysql=require('../mysql')



router.get('/',(req,res)=>{
    var query="SELECT * from device_info where delete_flag='N'";
    //var id=req.params.id;

    mysql.execute(query).then(result=>{
        console.log("device Information",result[0]);
        return res.json(result[0]);
    }).catch(error=>{
        console.log("device Information",error);
        return res.status(404).send("data not found");
    })
});


router.get('/:id',(req,res)=>{
   
    var query="SELECT * from device_info WHERE id=?";
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
    const { error } = validatedevice(req.body);
    if (error) {
        console.log("Validation error:", error.details[0].message);
        return res.status(400).send(error.details[0].message); // 400 = Bad Request
    }

    const values = req.body;
    const query = "INSERT INTO device_info SET ?";

    mysql.query(query,[values]).then(result=>{
        console.log("result",result);
        return res.json({id: result[0].insertId});
    }).catch(error=>{
        console.log("Insert error",error);
        return res.status(500).json({ error: "Database insert failed" });
    });
});



router.put('/:id',(req,res)=>{
    const { error } = validatedevice(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message); // 400 = Bad Request
    }
    var id = req.params.id;
    var values = req.body;
    var query = "UPDATE device_info SET ? WHERE id = ? ";

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

    var query = "UPDATE device_info SET delete_flag='Y' WHERE id = ? ";

    mysql.query(query,[id]).then(result=>{
        return res.json({ success: "Data deleted" });
    }).catch(error=>{
        console.log("error",error);
        return res.status(500).json("error",error);
    });
});


function validatedevice(device) {
    const schema = Joi.object({
        devicename: Joi.string().max(100).required(),
        mac_address: Joi.string() .pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/) .required(),
        device_type: Joi.string().max(30).required(),
        make: Joi.string().max(50).required(),
        model: Joi.string().max(50).required(),
        os: Joi.string().max(50).optional(),
        serial_number: Joi.string().max(100).optional(),
        status: Joi.string().valid('up', 'down').required(),
        organization_serial_no: Joi.string().optional(),
        // snmp_enabled: Joi.string().valid('0', '1').required(),
        snmp_version: Joi.string().required(),
        snmp_community: Joi.string().max(50),
        // .when('snmp_enabled', { is: true, then: Joi.required(), otherwise: Joi.allow('').optional() }),

        sys_descr: Joi.string().required(),
        sys_name: Joi.string().max(100).required(),

        snmp_enabled: Joi.number().valid(0, 1).required(),
        is_monitored: Joi.number().valid(0, 1).required(),

        added_on: Joi.date().iso(),
        purchase_date: Joi.date().iso().required(),
        first_installation_date: Joi.date().iso().required(),
       // delete_flag: Joi.string().valid('Y', 'N')
    });

    return schema.validate(device);
}

module.exports =router;

