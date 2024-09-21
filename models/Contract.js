const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  chainId: String,
  contractAddress: String,
  contractFunctions: [String],
  ccipEnabled: Boolean,
  functionName: String,
  smartAccountEnabled: Boolean,
  abi: Array,
});

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;
