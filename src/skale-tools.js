import axios from 'axios';


// const SKALE_FS_URL = "http://localhost:3001/skale/upload";
const SKALE_FS_URL = "https://bodega-cat-backend.azurewebsites.net/skale/upload";


export async function uploadToSkale(file) {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(SKALE_FS_URL, formData);
}