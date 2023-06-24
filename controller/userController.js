const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../models/user");

const signup = async (req, res) => {
    try{
        const {email, password} = req.body;

        const hashedPassword = bcrypt.hashSync(password, 8);

        await User.create({email, password: hashedPassword});

        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})
        if(!user) return res.sendStatus(401);

        const passwordMatch = bcrypt.compareSync(password, user.password)
        if(!passwordMatch) return res.status(401)
        
        //JWT WebToken
        const exp = Date.now() + 1000 * 60 * 60 * 24* 30;
        const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

        //Set the cookie
        res.cookie("Authorization", token, { 
            expires: new Date(exp),
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        res.sendStatus(200);   
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const logout = (req, res) => {
    try{
        res.clearCookie("Authorization")
        res.sendStatus(200);
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

const checkAuth = (req, res)=>{
    try {
        //console.log(req.user)
        res.sendStatus(200);   
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

module.exports = {signup, login, logout, checkAuth};