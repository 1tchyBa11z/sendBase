require('dotenv').config();

const Web3 = require('web3');

const providerUrl = process.env.INFURA

const privateKey = process.env.PRIVATE_KEY

// Replace with your Ethereum node provider URL
console.log(providerUrl);
const web3 = new Web3(providerUrl);


// Replace with your wallet private key and the destination wallet address
const fromAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;
const toAddress = '0xe4edb277e41dc89ab076a1f049f4a3efa700bce8'; // Arb-> Opt bridge address

// Amount of Ether to send (in Wei)
const amountInWei = web3.utils.toWei('0.0112', 'ether');

// Create a transaction object
const transactionObject = {
    from: fromAddress,
    to: toAddress,
    value: amountInWei,
    gas: 327000, // gas limit
    gasPrice: web3.utils.toWei('0.1', 'gwei'), // gas price in gwei
};

// Sign the transaction
const signTransaction = async () => {
    try {
        const signedTransaction = await web3.eth.accounts.signTransaction(
            transactionObject,
            privateKey
        );

        return signedTransaction.rawTransaction;
    } catch (error) {
        console.error('Error signing transaction:', error);
    }
};

// Send the signed transaction
const sendTransaction = async () => {
    try {
        const signedTransaction = await signTransaction();
        const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction);

        console.log('Transaction Hash:', transactionReceipt.transactionHash);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
};

// Execute the transaction
sendTransaction();

