import axios from "axios";
import { toast } from "react-toastify";

const IPFS_API_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const PINATA_API_KEY = "bdfad1e118c2c6318e97";
const PINATA_SECRET_API_KEY = "9d9d46a0ae8d9c42743f549e485038be5a6c1011099a8d6a36f7e11a6223e4cb";

export const uploadToIPFS = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(IPFS_API_URL, formData, {
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.IpfsHash;
};

export const registerAssetOnBlockchain = async (ipfsHash, timestamp) => {
  if (!ipfsHash || !timestamp) {
    toast.error(`Please provide valid IPFS Hash and Timestamp`)
    return;
  }

  try {
    const response = await axios.post("http://localhost:4242/register-asset", {
      ipfsHash: ipfsHash,
      timestamp: timestamp,
    },{headers: {
      'Content-Type': 'application/json', // Ensure the correct content type
    }});
    return response;
  } catch (error) {

    console.error(`Error registering asset on blockchain: ${error}`);
    return error;
  }
};
export const verifyAssetOnBlockchain = async (ipfsHash) => {
  if (!ipfsHash) {
    toast.error(`Please provide valid IPFS Hash`)
    return;
  }
  try {
    const res = await axios.get(`http://localhost:4242/verify-asset/${ipfsHash}`);
    return res
  } catch (error) {
    console.error("Error registering asset on blockchain:", error);
    return error;
  }
};
