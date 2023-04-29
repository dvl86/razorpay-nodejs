const express = require("express");
const app = express();
var cors = require("cors")
const port = 3000;

app.use(express.json());
app.use(cors());
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) =>{
    res.sendFile('index.html', {root: path.join(__dirname, './public')})
});

app.post("/payment", async (req, res) =>{
  let {amount} = req.body;

    var instance = new Razorpay({key_id: 'rzp_test_poUdDfm2skEGWW', key_secret: '7mBGLRFmXWeCq3mV3K5kNTih'});
    let order = await instance.orders.create({
        amount:amount * 100,
        currency:"INR",
        receipt:"receipt#1",

    });
 res.status(200).json({
    success:true,
    order,
    amount
 });
});

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});