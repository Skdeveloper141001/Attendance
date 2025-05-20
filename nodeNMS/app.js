const express=require('express');
const path = require('path');

const Joi=require('joi');
const config= require('config');
const signup=require("./router/signup");
const dGroup = require('./router/deviceGroup');
const dGroupMap = require('./router/deviceGroupMap');
const device_info=require('./router/device_info');
const location = require('./router/locations');
const dLocation = require('./router/deviceLocation');
const user = require('./router/user');
const ip_subnets = require('./router/ip_subnets');
const ip_address = require('./router/ip_address');
const NetInterface = require('./router/DeviceNetInterface');
const device_connections = require('./router/deviceConnections');
const devicetype = require('./router/devicetype');
const floor = require('./router/floor');
const rooms = require('./router/rooms');
const cors =require('cors');
const logger=require('./middleware/logger');

var svgCaptcha=require('svg-captcha');

const app =express();

app.use(express.json());
app.use(cors());


if(!config.get('jwtPrivateKey')){
    process.exit(1);
}

app.use(logger);
app.use(function(req,res,next)
{
    console.log("Authentication")
    next();

})

app.get('/api/captcha',function(req,res)
{
    var captcha=svgCaptcha.create({ignoreChars:"lI0o"});
    res.json(captcha)
});



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/device',device_info);
app.use('/api/dGroup', dGroup);
app.use('/api/dGroupmap', dGroupMap);
app.use('/api/dNetinterface', NetInterface);
app.use('/api/locations', location);
app.use('/api/user', user);
app.use('/api/floors', floor);
app.use('/api/rooms', rooms);
app.use('/api/ipsubnets', ip_subnets);
app.use('/api/deviceConnection', device_connections);
app.use('/api/ipaddress', ip_address);
app.use('/api/dLocation', dLocation);
app.use('/api/devicetype', devicetype);
app.use('/api/signup', signup);


const port=5000;
app.listen(port,()=>{
    console.log(`listeing on port ${port}`)
    
})