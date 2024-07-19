
require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./nodels/user.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt= require("jsonwebtoken");
const {authenticateToken} = require("./utilities");

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get("/",(req, res)=> {
    res.json({data: "hello"});
});

//create account
app.post("/creat-account", async (req, res) =>{
    const {fullname, email, password} = req.body;

    if (!fullname){
        return res
        .status(400)
        .json({message: "fullname is required"});
    }
    if (!email){
        return res
        .status(400)
        .json({message: "email is required"});
    }
    if (!password){
        return res
        .status(400)
        .json({message: "password is required"});
    }
    const user = await User.findOne({email: email});
    if (isuser){
        return res.json({
            error:true,
            message: "user already exists",
        });
    }
    const User = new User({
        fullname,
        email,
        password,
    });
    await User.save();

    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "36000m",
    });
    
    return res.json({
        error: false,
        user,
        accessToken,
        message: "user created successfully",
    });
});



app.listen(8000);

module.exports = app;