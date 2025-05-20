const express = require('express'); //Load express moudule which returns a function express
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql = require('../mysql');
const bcrypt=require("bcryptjs");

const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const { error } = await validateSignup(req.body);
    if (error) {
    return res.status(404).send(error.details[0].message);
    }

    var username = req.body.username;
    var password = req.body.password;
    const checkUserQuery = `SELECT * FROM user WHERE username = ?`;
    const [existingUsers] = await mysql.execute(checkUserQuery, [username]);

    if (existingUsers.length > 0) {
        return res.status(409).json("Username already exists. Please choose another.");
    }
   // var email = req.body.email;
    password = await bcrypt.hash(`${password}`, salt);
    var query = `INSERT INTO user(username,password) 
    values(?,?)`;


     mysql.execute(query,[username,password]).then((result)=>{
       return res.status(201).json({id: result[0].insertId });
    }).catch((error)=>{
        console.log('error',error);
        return   res.status(404).json(error);
    });
});

//     try {

//         let data = await mysql.exec(query,values);
//         res.json({
//             id: data.insertId

//         });
//     } catch (err) {

//         return res.status(404).json(err);
//     }

// });


function validateSignup(signup) {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(8).max(30).required(),
        password: Joi.string().min(8) 
                 .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
                 .required(),
        //email: Joi.string().min(3).required()
    }).unknown(true);
    return schema.validate(signup);
}



module.exports = router;