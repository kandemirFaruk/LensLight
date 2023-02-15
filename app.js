import express from 'express';

const app = express();
const port = 5000;

app.get("/",(req,res)=>{
    res.send("İNDEX SAYFASI")
})

app.listen(port, () => {
   console.log(`Application running on port: ${port}`);
});
