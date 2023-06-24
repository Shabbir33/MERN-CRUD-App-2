if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const connectDB = require("./db/connect");
const router = require("./routes/router");
const authRouter = require("./routes/authRouter")
const cookieParser = require('cookie-parser')
const cors = require("cors");

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}));

//Routers
app.use("/", router);
app.use("/", authRouter);



const PORT = process.env.PORT || 3000;

const start = async () => {
    try{
        //connect DB
        await connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}`);
        })
    }catch(err){
        console.log(err);
    }
}

start()