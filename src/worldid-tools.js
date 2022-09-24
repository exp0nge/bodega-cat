import axios from 'axios';

const url = 'https://developer.worldcoin.org/api/v1/verify';

export async function verifyWorldId(signal, verificationProof) {
    await axios.post(url, {
        "action_id": "wid_staging_c93f74d81132cf2b94e54f2851159583",
        "signal": signal,
        "proof": verificationProof.proof,
        "nullifier_hash": verificationProof.nullifier_hash,
        "merkle_root": verificationProof.merkle_root
    });
}