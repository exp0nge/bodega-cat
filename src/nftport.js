import axios from 'axios';

// const url = "http://localhost:3001/nftport";
const url = "https://bodega-cat-backend.azurewebsites.net/nftport";

export async function mintUsingNftPort(file, nftDescription) {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", JSON.stringify(nftDescription));
    return await axios.post(url + "/mint", formData);
}