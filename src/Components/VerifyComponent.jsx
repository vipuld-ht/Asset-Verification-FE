import React, { useState } from "react";
import { verifyAssetOnBlockchain } from "../services/blockchainService";

const VerifyComponent = () => {
  const [ipfsHash, setIpfsHash] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      const isRegistered = await verifyAssetOnBlockchain(ipfsHash);
      setMessage(
        isRegistered
          ? "Asset is registered on the blockchain.":
        "Asset not found on the blockchain."
      );
    } catch (error) {
      setMessage(`Error verifying asset: ${error.message}`);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Verify Digital Asset</h2>
      <input
        type="text"
        placeholder="Enter IPFS Hash"
        value={ipfsHash}
        onChange={(e) => setIpfsHash(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full"
      />
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
        onClick={handleVerify}
      >
        Verify
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default VerifyComponent;
