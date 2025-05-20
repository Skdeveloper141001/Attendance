
const express = require('express'); //Load express moudule which returns a function express
const route = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
//var mysql = require('../loginmysql');
const mysql=require('../mysql')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
var config = require('config');


route.get('/',  (req, res) => {
        var query = "SELECT * FROM user";
    
         mysql.execute(query).then(result=>{
             console.log("user",result[0]);
             return res.json(result[0]);
         }).catch(error=>{
             console.log("user",error);
             return res.status(404).send("data not found");
         })
    });
    

route.post('/',  (req, res) => {

    const { error } = validateUser(req.body);
    if (error) {

        return res.status(404).send(error.details[0].message);

    }
    var username = req.body.username;
    var password = req.body.password;

    var query = "SELECT * FROM user WHERE username = ? ";

    

         mysql.execute(query, [username]).then( async (result)=>{
        console.log("password",result[0][0].password);
        var role=result[0][0].role;
        let passwordKey = '08t16e502526fesanfjh8nasd2';
        let passwordDncyt = CryptoJS.AES.decrypt(password, passwordKey).toString(CryptoJS.enc.Utf8);
        //let passwordDncyt = "pankaj"
        console.log('Decrpyt Pwd', passwordDncyt);


        const validPassword = await bcrypt.compare(passwordDncyt, result[0][0].password);
        //const validPassword = passwordDncyt=== result[0][0].password;
        if (!validPassword) {

            return res.status(400).send({
                success: 0,
                message: `Wrong credential.`
            });
        }
        else if (validPassword) {
            let response =
            {
                username: username,
                role :role
            }
            const token = jwt.sign(response, config.get('jwtPrivateKey'),
                {
                    expiresIn: '12000s' // expires in 24 hours; expiresIn: '60s' expires in 24 hours
                });
            return res.json
                ({
                    token: token, success: 1, username: username, role :role,
                    message: 'Login Success'
                });
        }
        else {
            return res.json
                ({
                    success: 0,
                    message: `Wrong credential.`
                });
        }

    }).
    catch (err=>{
        console.log('errr',err);
        return res.status(404).json(err);
    }) 


});


function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }).unknown(true);
    return schema.validate(user);

}



module.exports = route;