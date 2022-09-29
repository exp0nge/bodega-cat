import axios from 'axios';

export const SCHEMA_VERSION = 8;

// const url = "http://localhost:3001/tableland";
const url = "https://bodega-cat-backend.azurewebsites.net/tableland";

// Helpers to insert/get the key-value pairs
export async function put(k) {
    const resp = await axios.post(url + "/put", { "k": k })
    return resp.data.response;
}

export async function getAll() {
    const resp = await axios.get(url + "/getAll");
    return resp.data.rows;
}

export async function get(id) {
    const resp = await axios.post(url + "/get", { "id": id });
    return resp.data.row;
}

export function formattedDataFromRow(nftData) {
    return {
        id: nftData[0],
        cat_name: nftData[1],
        contributor_id: nftData[2],
        coordinates: nftData[3],
        picture_href: nftData[4],
        nftport_blob: nftData[5],
        cat_attributes: nftData[6],
        created_at: nftData[7],
        skale_link: nftData[8],
        metadataId: nftData[9]
    };
};