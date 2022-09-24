import axios from 'axios';

const apiKey = process.env.REACT_APP_NFTSTORAGE;

export async function uploadImgToNftStorage(file) {
    const formData = new FormData();
    formData.append("file", file, "file.jpeg");

    return axios.post("https://api.nft.storage/upload", formData, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'image/jpeg'
        }
    });
}