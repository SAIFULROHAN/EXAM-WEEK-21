import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from 'hpp';
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import {DATABASE,MAX_JSON_SIZE,PORT,REQUEST_NUMBER,REQUEST_TIME,URL_ENCODE,WEB_CACHE} from "./app/config/config.js";
import router from "./routes/api.js";

const app = express();

// App Use Default Middleware
app.use(cors());
//app.use(hpp());
app.use(express.json({limit:MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(cookieParser());
app.use(fileUpload())
app.use(helmet());
//app.use(bodyParser())


//App Use Limiter
const limiter = rateLimit({windowMs:REQUEST_TIME,max:REQUEST_NUMBER})
app.use(limiter)


// Cache
app.set('etag',WEB_CACHE)

// Database Connect
mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
    console.log("MongoDB Connected");
}).catch(()=>{
    console.log("MongoDB Not Connected");
})

app.use("/api",router)

app.listen(PORT,()=>{
    console.log("Server running on port",PORT);
})

