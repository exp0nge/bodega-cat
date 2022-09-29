const axios = require('axios');
const FormData = require('form-data');

const apiKey = process.env.REACT_APP_NFTSTORAGE;

async function uploadImgToNftStorage(file) {
    console.log("uploadImgToNftStorage processing file", file.size);
    const formData = new FormData();
    formData.append("file", file.buffer, { filename: "file.jpeg" });

    return axios.post("https://api.nft.storage/upload", formData, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            ...formData.getHeaders()
            // 'Content-Type': 'image/jpeg'
        }
    });
}

exports.uploadImgToNftStorage = uploadImgToNftStorage;