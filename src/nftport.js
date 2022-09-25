import axios from 'axios';

const apiKey = process.env.REACT_APP_NFTPORT_KEY;
const url = 'https://api.nftport.xyz/v0/mints/easy/files?';

export const MINT_ADDRESS = "0x2028879b223444A417D239616fE060a15aef46A9";

export async function mintUsingNftPort(file, nftDescription) {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    const updatedUrl = url + new URLSearchParams({
        name: "Bodega Cat " + nftDescription.id.toString(),
        description: nftDescription.description,
        mint_to_address: MINT_ADDRESS,
        chain: "rinkeby"
    });

    return await axios.post(updatedUrl, formData, {
        headers: {
            "Authorization": apiKey,
        }
    });
}