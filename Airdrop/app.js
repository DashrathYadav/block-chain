// 'use strict'
const express = require("express");
const bodyParser=require("body-parser")
const solana = require("@solana/web3.js");
const ejs=require('ejs')
const PORT = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
// app.set('views',__dirname+'/views');

app.get('/', (req, res) => {

    console.log(typeof (req), typeof (res))
    // res.send("You are on home page");
    res.render('index');
})

const airdrop = function (key) {
    
    // const wallet=solana.Keypair.generate();
    // console.log(wallet.secretKey)
    const connect = new solana.Connection(solana.clusterApiUrl("devnet"));
    // console.log((connect))
    // publicKey = new solana.PublicKey("94h7gQNH5NnbaYGacbFXJbj7HFB9JTB4rV5mYVdQuXFR")
    publicKey = new solana.PublicKey(key)
    secretKey = [
        179, 237, 99, 45, 68, 194, 167, 94, 95, 117,
        192, 3, 223, 194, 200, 198, 176, 187, 175, 207,
        21, 57, 27, 229, 202, 234, 139, 229, 193, 103,
        198, 88, 119, 207, 152, 160, 70, 175, 100, 239,
        83, 20, 201, 228, 210, 228, 74, 176, 111, 110,
        149, 121, 102, 163, 148, 208, 79, 211, 208, 65,
        242, 60, 229, 12
    ]
    console.log(publicKey);
    console.log(secretKey);

    const blc = async function () {
        const balance = await connect.getBalance(publicKey);

        connect.requestAirdrop(publicKey, 1e9)
        console.log("Drop succesful")
        console.log("Balance is ", balance)
    }

    blc();
}


app.post('/airdrop', (req, res) => {
    // app.render('index');
    const key= req.body.publicKey;
    console.log(key);
    res.send("Airdrop is on the way")

    airdrop(key);

});


app.listen(PORT, () => {
    console.log("server started at port 3000")
});




/*
// 

*/
