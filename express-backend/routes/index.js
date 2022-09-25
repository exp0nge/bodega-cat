var express = require('express');
var router = express.Router();
const Filestorage = require('@skalenetwork/filestorage.js');
const Web3 = require('web3');
const multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const SKALE_PRIVATE_KEY = process.env.SKALE_PRIVATE_KEY;

const SKALE_FS_URL = "https://eth-online.skalenodes.com/v1/hackathon-content-live-vega";



async function uploadToSkale(file) {
  //create web3 connection
  const web3Provider = new Web3.providers.HttpProvider(
    SKALE_FS_URL
  );
  let web3 = new Web3(web3Provider);

  //get filestorage instance
  let filestorage = new Filestorage(web3, true);

  //provide your account & private key
  //note this must include the 0x prefix
  let privateKey = '0x' + SKALE_PRIVATE_KEY;
  let account = "0xfC14704455EbC26d71180AB04EF3B60Cb2ACCF4a";
  console.log('file', file.size);

  return filestorage.uploadFile(
    account,
    Date.now() + "-" + file.originalname,
    file.buffer,
    privateKey
  );
}

router.post('/skale/upload', upload.single("file"), async function (req, res, next) {
  const response = await uploadToSkale(req.file);
  console.log(response);
  res.json({ "path": response });
});

module.exports = router;
