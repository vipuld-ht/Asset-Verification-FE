import React, { useState } from "react";

const WalletConnectButton = () => {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to wallet:", error.message);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  const disconnectWallet = () => {
    setAccount(null); 
  };
  
  return (
    <div className="mb-6 flex items-center space-x-4">
      <button
        className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
        onClick={connectWallet}
      >
        {account ? `Connected: ${account}` : "Connect Wallet"}
      </button>
      {account && (
        <a
          href="#"
          onClick={disconnectWallet}
          className="text-red-500 font-medium hover:underline"
        >
          Disconnect
        </a>
      )}
    </div>
  );
};

export default WalletConnectButton;
