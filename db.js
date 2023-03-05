import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
const conn = () => {
   mongoose
      .connect(process.env.DB_URI, {
         dbName: 'lenslight_',
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      .then(() => {
         console.log('Connected to the DB succesfully');
      })
      .catch((err) => {
         console.log(`DB connection err: ${err}`);
      });
};

export default conn;
