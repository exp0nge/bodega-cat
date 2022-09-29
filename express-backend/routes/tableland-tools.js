const ethers = require("ethers");
const sdk = require("@tableland/sdk")
// Instantiate a wallet
const privateKey = process.env.REACT_APP_TBL_PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey);

const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc-mumbai.maticvigil.com'
);
const signer = wallet.connect(provider);

const name = "BodegaCat_80001_3019";

const SCHEMA_VERSION = 8;

async function initTableland() {
    console.log("tableland create starting");

    const tableland = await sdk.connect({
        chain: 'polygon-mumbai',
        signer: signer,
    });
    console.log("creating table");
    const { name } = await tableland.create(
        `id INT, cat_name TEXT, contributor_id TEXT, coordinates TEXT, picture_href TEXT, nftport_blob TEXT, cat_attributes TEXT, created_at TEXT, skale_link TEXT, mintbase_meta_id TEXT, version INT, PRIMARY KEY (id)`,
        { prefix: `BodegaCat` }
    );
    console.log("table create done!");
    console.log("tableland name", name);
}

// Helpers to insert/get the key-value pairs
async function put(k) {
    const tableland = await sdk.connect({
        chain: 'polygon-mumbai',
        signer: signer,
    });
    const sql = `INSERT INTO ${name} VALUES ('${k.id}', '${k.cat_name}', '${k.contributor_id}', '${k.coordinates}', '${k.picture_href}', '${k.nftport_blob}', '${k.cat_attributes}', '${k.created_at}', '${k.skale_link}', '${k.mintbase_meta_id}', '${k.version}' );`;
    console.log("sql", sql);
    return await tableland.write(sql);
}

async function getAll() {
    const tableland = await sdk.connect({
        chain: 'polygon-mumbai',
        signer: signer,
    });
    const value = await tableland.read(`SELECT * FROM ${name} WHERE version = ${SCHEMA_VERSION} ORDER BY created_at DESC;`)
    return await value.rows;
}


async function get(id) {
    const tableland = await sdk.connect({
        chain: 'polygon-mumbai',
        signer: signer,
    });
    const value = await tableland.read(`SELECT * FROM ${name} WHERE id = '${id}'`)
    return await value.rows[0];
}

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

async function insertAndRead() {
    const id = getRandomArbitrary(5, 10000000);
    const result = await put({
        id: id,
        cat_name: 'Appa',
        contributor_id: '1',
        coordinates: '51.505, -0.09',
        version: 1
    })
    console.log('result', result);
    const readResult = await get(id);
    console.log('read', readResult);
}

exports.getAll = getAll;
exports.get = get;
exports.put = put;