'use strict'
const solana = require("@solana/web3.js")
const connection = new solana.Connection(solana.clusterApiUrl('devnet'));
// balance check
// console.log(typeof(solana.LAMPORTS_PER_SOL))


const balance=async function(public_key)
{
    const bal=await connection.getBalance(public_key)
    console.log(bal);
    return bal;

}



//airdrop
const airdrop=async function(public_key,amount)
{
    console.log(`Dropping Airprod with ${amount} sol`)

    await connection.requestAirdrop(public_key,solana.LAMPORTS_PER_SOL);
     console.log('Air Drop successfull')
     
}

const transact= async function ()
{
    const secretekey=[
        179, 237, 99, 45, 68, 194, 167, 94, 95, 117,
        192, 3, 223, 194, 200, 198, 176, 187, 175, 207,
        21, 57, 27, 229, 202, 234, 139, 229, 193, 103,
        198, 88, 119, 207, 152, 160, 70, 175, 100, 239,
        83, 20, 201, 228, 210, 228, 74, 176, 111, 110,
        149, 121, 102, 163, 148, 208, 79, 211, 208, 65,
        242, 60, 229, 12
    ]
    const wallet= solana.Keypair.fromSecretKey(Uint8Array.from(secretekey))
    let pubkey="8jQH7kg2R3sZewPBtJqJ5mv5exAA4foeqVH8bUnBUVN6"
    pubkey=new solana.PublicKey(pubkey);
   
   
    //balace check and amount count
    // await airdrop(wallet.publicKey,2);
    console.log("Balance of sender wallet is");
    let sender_bal=await balance(wallet.publicKey)
    sender_bal=parseInt(Number(sender_bal/2))
    console.log("Balance of reciver wallet is");
    await balance(pubkey)


    let  transaction= new solana.Transaction()
    transaction.add(
        solana.SystemProgram.transfer({
            fromPubkey:wallet.publicKey,
            toPubkey:pubkey,
            lamports:sender_bal

        })
    )


   
    setTimeout(async ()=>{
         const signature=await solana.sendAndConfirmTransaction(connection,transaction,[wallet]);
         console.log("transaction successfull");
         console.log(signature);
         setTimeout(async()=>{

         console.log("Balance of sender wallet after transaction",await balance(wallet.publicKey))
         console.log("Balance of reciver wallet after transaction",await balance(pubkey))
         },5000);     
    },2000)

}

transact()