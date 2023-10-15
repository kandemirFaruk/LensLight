import mongoose from "mongoose";

const conn = () => {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: "lenslight",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to mongodb successfuly!");
    })
    .catch((err) => {
      console.log(`DB connection err: ${err}`);
    });
};

export default conn;
