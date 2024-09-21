const { ethers } = require("ethers");
const Contract = require("../models/Contract");

// Store contract information
exports.storeContract = async (req, res) => {
  const {
    chainId,
    contractAddress,
    contractFunctions,
    ccipEnabled,
    functionName,
    smartAccountEnabled,
    abi,
  } = req.body;

  console.log(req.body, "req.body", functionName);
  console.log(JSON.parse(req.body.abi), "req.body.abi");

  try {
    const newContract = new Contract({
      chainId,
      contractAddress,
      contractFunctions,
      ccipEnabled,
      functionName,
      smartAccountEnabled,
      abi : JSON.parse(req.body.abi),
    });

    console.log(newContract, "newContract");

    newContract.save((error, savedContract) => {
      if (error) {
        console.error("Error during contract saving:", error.message || error);
        res.status(500).json({ error: "Error storing contract" });
      } else if (savedContract) {
        res
          .status(201)
          .json({
            message: "Contract stored successfully",
            id: 'AGX' + savedContract._id,
          });
      } else {
        res
          .status(500)
          .json({ error: "Failed to save contract, no response returned." });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error.message || error);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};

// Get transaction data
exports.getTransactionData = async (req, res) => {
  const { id, functionName, args = [], signerAddress } = req.body;

  try {
    const contract = await Contract.findById(id);
    if (!contract) return res.status(404).json({ error: "Contract not found" });

    const abi = contract.abi;
    const contractInterface = new ethers.Interface(abi);
    const encodedData = contractInterface.encodeFunctionData(
      functionName,
      args
    );

    // Prepare transaction data
    const txData = {
      to: contract.contractAddress,
      data: encodedData,
      from: signerAddress,
    };

    res.status(200).json({ txData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error generating transaction data" });
  }
};
