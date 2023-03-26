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

    console.log(publicKey);
    // console.log(secretKey);

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
