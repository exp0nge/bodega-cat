var express = require('express');
var router = express.Router();
const Filestorage = require('@skalenetwork/filestorage.js');
const Web3 = require('web3');
const multer = require('multer');
const tableLand = require('./tableland-tools');
const nftport = require('./nftport');
const nftstorage = require('./nftstorage-tools');

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
  return res.json({ "path": response });
});

router.post('/tableland/put', async function (req, res, next) {
  const response = await tableLand.put(req.body.k);
  return res.json({ "response": response });
});

router.post('/tableland/get', async function (req, res, next) {
  const response = await tableLand.get(req.body.id);
  return res.json({ "row": response });
});

router.get('/tableland/getAll', async function (req, res, next) {
  const response = await tableLand.getAll();
  return res.json({ "rows": response });
});

router.post('/nftport/mint', upload.single("file"), async function (req, res, next) {
  console.log("nftport mint", req.body);
  const response = await nftport.mintUsingNftPort(req.file, JSON.parse(req.body.description));
  return res.json(response.data);
});

router.post('/nftstorage/upload', upload.single("file"), async function (req, res, next) {
  const response = await nftstorage.uploadImgToNftStorage(req.file);
  return res.json(response.data);
});



module.exports = router;
