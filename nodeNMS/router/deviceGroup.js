const mysql=require("../mysql");
const multer=require("multer")
const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
//const Joi = require('joi');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,`uploads/icon`);
    },
    filename:(req,file,cb) =>{
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix+file.originalname);
    }
  });
  
  const upload=multer({storage});



router.get('/', (req, res) => {
    var query = "SELECT * FROM device_group where delete_flag='N'";
    mysql.execute(query).then((result)=>{
        console.log(result);
        return res.json(result[0]);
    }).catch((error)=>{
        console.log(error);
        return res.status(500).send("Device Group Not Found");
    });
});

router.get('/:id',(req,res)=>{
   
    var query="SELECT * from device_group WHERE id=?";
    var id=req.params.id;
    mysql.query(query,[id]).then((result)=>{
        console.log(result[0].length);
        return res.json(result[0]);
    }).catch((error)=>{
        console.log("error",error);
        return res.status(404).send("Device Group Not Found");
    });
});

router.post('/', upload.single('icon'), (req, res) => {
    // const { error } = validatedevice(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message); // 400 = Bad Request
    // }
    let icon="uploads/icon"+req.file.filename
    console.log("icon",icon)
    const values = req.body;
    const query = `INSERT INTO device_group set ?,icon="${icon}"`;

    // const values = req.body;
    // const query = "INSERT INTO device_group SET ?";
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
    var query = "UPDATE device_group SET ? WHERE id = ? ";

    mysql.query(query,[values,id]).then(result=>{
        return res.json({ success: "Data" });
    }).catch(error=>{
        console.log("error",error);
        return res.status(500).json("error",error);
    });
});

router.delete('/:id',(req,res)=>{
    var id = req.params.id;

    var query = "UPDATE device_group SET delete_flag='Y' WHERE id = ? ";
    mysql.query(query,[id]).then(result=>{
        return res.json({ success: "Data deleted" });
    }).catch(error=>{
        console.log("error",error);
        return res.status(500).json("error",error);
    });
});


module.exports = router;