const mysql=require("../mysql");
const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
//const Joi = require('joi');

router.get('/', (req, res) => {
    // var id = req.params.id;
    var query = "SELECT * FROM locations";
    //var query = "";
    mysql.execute(query).then((result)=>{
        console.log(result);
        return res.json(result[0]);
    }).catch((error)=>{
        console.log("error",error);
        return res.status(404).send("Device Information Not Found");
    });
});


router.post('/', (req, res) => {
    // const { error } = validatedevice(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message); // 400 = Bad Request
    // }

    const values = req.body;
    const query = "INSERT INTO locations SET ?";

    mysql.query(query,[values]).then(result=>{
        console.log("result",result);
        return res.json({id: result[0].insertId});
    }).catch(error=>{
        console.log("error",error);
        return res.status(500).json("error",error);
    });
});


router.put('/:id',(req,res)=>{   
    // const { error } = validatedevice(req.body);// Object Destructor 

    // if (error) {
    //     res.status(404).send(error.details[0].message);
    // }
    var id = req.params.id;
    var values = req.body;
    var query = "UPDATE locations SET ? WHERE id = ? ";

    mysql.query(query,[values,id]).then(result=>{
        return res.json({ success: "Data" });
    }).catch(error=>{
        console.log("error",error);
        return res.status(500).json("error",error);
    });
});


router.delete('/:id',(req,res)=>{
    var id = req.params.id;

    var query = "UPDATE locations SET delete_flag='Y' WHERE id = ? ";
    mysql.query(query,[id]).then(result=>{
        return res.json({ success: "Data deleted" });
    }).catch(error=>{
        console.log("error",error);
        return res.status(500).json("error",error);
    });
});

module.exports = router;