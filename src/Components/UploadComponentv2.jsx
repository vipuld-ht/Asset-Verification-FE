import React, { useState } from "react";
import { registerAssetOnBlockchain, uploadToIPFS } from "../services/blockchainService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

const UploadComponentV2 = () => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadToIPFSHandler = async () => {
    setIpfsHash('');
    setTimestamp('');
    setLoading(true);
    try {
      const ipfsHashResponse = await uploadToIPFS(file);
      setIpfsHash(ipfsHashResponse);
      setTimestamp(new Date().toISOString());
      toast.success("Asset Successfully Uploaded to Pinata IPFS");
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      toast.error("Error uploading file to IPFS:", error.details);
    } finally {
      setLoading(false);
    }
  };

  const registerAsset = async () => {
    registerAssetOnBlockchain(ipfsHash, timestamp);
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
        Upload and Register Asset
      </h2>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Select File</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        onClick={uploadToIPFSHandler}
        disabled={!file || loading}
        className={`w-full px-4 py-2 rounded-lg font-medium text-white ${
          !file || loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Uploading..." : "Upload to IPFS"}
      </button>
      <div className="mt-6">
        {ipfsHash && (
          <div className = "flex flex-column">
            <p className="text-green-600 font-medium">Hash: {ipfsHash}</p>
            <div className="">
            <button 
              onClick={() => navigator.clipboard.writeText(ipfsHash)}
              className="flex h-10 p-4 hover:p-3 items-center justify-center rounded-full text-gray-800"
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
            </div>
          </div>
        )}
        {timestamp && (
          <p className="text-gray-600 font-medium">Timestamp: {timestamp}</p>
        )}
      </div>
      {ipfsHash && (
      <button
          onClick={registerAsset}
          disabled={!ipfsHash}
          className="mt-4 w-full px-4 py-2 rounded-lg font-medium text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-400"
        >
          Register Asset on Blockchain
        </button>
      )}
    </div>
  );
};

export default UploadComponentV2;
