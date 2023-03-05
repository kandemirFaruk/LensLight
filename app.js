import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import conn from './db.js';
import pageRoute from './routers/PageRoute.js';
import PhotoRoute from './routers/PhotoRoute.js';
import UserRoute from './routers/UserRoute.js';
import { checkUser } from './middlewares/AuthMiddleware.js';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUD_API_KEY,
   api_secret: process.env.CLOUD_API_SECRET,
});
//Connection to the DB
conn();

const app = express();
const port = process.env.port;

//ejs template ejs
app.set('view engine', 'ejs');

//Static files middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(
   methodOverride('_method', {
      methods: ['POST', 'GET'],
   })
);

//Yönlendirmeler
app.use('*', checkUser);
app.use('/', pageRoute);
app.use('/photos', PhotoRoute);
app.use('/users', UserRoute);

app.listen(port, () => {
   console.log(`Application running on port: ${port}`);
});
