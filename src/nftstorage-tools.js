import axios from 'axios';

// const url = "http://localhost:3001/nftstorage";
const url = "https://bodega-cat-backend.azurewebsites.net/nftstorage";

export async function uploadImgToNftStorage(file) {
    const formData = new FormData();
    formData.append("file", file, "file.jpeg");

    return axios.post(url + "/upload", formData);

}