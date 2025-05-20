const express = require("express");
const Joi = require("joi");
const mysql = require("../mysql");


const router = express.Router();


// route.get("/devicetype", (req, res) => {
//     var query = "SELECT * from device_type";
//     mysql.exec(query, [], function (err, result) {
//         if (err) return res.status(404).json(err);
//         if (result.length === 0) return res.status(404).send("Details not found");
//         return res.json(result);
//     });
// });

router.get('/',(req,res)=>{
    var query="SELECT * from device_type";
    //var id=req.params.id;

    mysql.execute(query).then(result=>{
        console.log("device Information",result[0]);
        return res.json(result[0]);
    }).catch(error=>{
        console.log("device Information",error);
        return res.status(404).send("data not found");
    })
});


module.exports = router;