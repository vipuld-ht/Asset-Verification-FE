import React, { useState } from "react"
import VerifyComponent from "../Components/VerifyComponent";
import UploadComponentV2 from "../Components/UploadComponentv2";

const AssestVerificationDesk  = () => {

    const [account, setAccount] = useState("");

    const connectWallet = async () => {
    if (window.ethereum) {
        try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        } catch (error) {
        console.error("Error connecting to wallet:", error);
        }
    } else {
        alert("MetaMask is not installed. Please install it to use this feature.");
    }
    };

    const disconnectWallet = () => {
    setAccount(null); 
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="max-w-xl w-full">
                <div className="text-center mb-20">
                    <h1 className="text-4xl font-bold">
                        Asset Verification System
                    </h1>
                    <h4 className = "text-gray-600">
                        Blockchain Technology for Managing, Storing and Verifying Digital Assets. 
                    </h4>
                </div>  
                <div className="mb-6 flex flex-col items-center space-x-4 justify-center gap-3">
                    <button
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        onClick={connectWallet}
                    >
                        {account ? `Connected: ${account}` : "Click Here to Connect Meta  MaskWallet"}
                    </button>
                    {account && (
                        <button
                            className="px-4 py-2 bg-red-400 text-white rounded-lg shadow-md hover:bg-red-600  00 focus:outline-none focus:ring-2 focus:ring-red-300"
                        onClick={disconnectWallet}

                        >
                        Disconnect
                        </button>
                    )}
                   
                </div>
               
                {account && (
                    <>
                    <div className="gap-6 mb-6">
                        <UploadComponentV2 />
                    </div>
                    <div className="gap-6 mb-6">
                        <VerifyComponent />
                    </div>
                </>
                )}

            </div>
        </div>
    );
}


export default AssestVerificationDesk