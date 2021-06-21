/*const { abi: USMABI } = require("./external/abi/USM.json");
const { abi: USMViewABI } = require("./external/abi/USMView.json");
const { abi: FUMABI } = require("./external/abi/FUM.json");
const { abi: OracleABI } = require("./external/abi/Oracle.json");
const { abi: DiaOracleABI } = require("./external/abi/DiaOracle.json");*/
const { abi: USMABI } = require("./external/abi/test/USMDia.json");
const { abi: USMViewABI } = require("./external/abi/test/USMView.json");
const { abi: FUMABI } = require("./external/abi/test/FUM.json");
const { abi: OracleABI } = require("./external/abi/test/DiaOracleAdapter.json");
const { abi: DiaOracleABI } = require("./external/abi/test/DiaOracle.json");


const ecosystems = {
  SIMULATE_BTC: {
    usm: {
      name: "BTC",
      abi: USMABI,
      address: {
        42: "0x91D58FE9594dc149cb7335771fb7e1b0440A8E55",
      },
    },
    usmview: {
      name: "USMView",
      abi: USMViewABI,
      address: {
        42: "0x2aeeB1610c2F1cf3d477B946Ed015Bd196C400Ac",
      },
    },
    oracle: {
      name: "oracle",
      abi: OracleABI,
      address: {
        42: "0x0af596567a9b07018F258A669633237A54067f2c",
      },
    },
    diaOracle: {
      name: "diaOracle",
      abi: DiaOracleABI,
      address: {
        42: "0xb73db1A6a85219742fbd0fC7cc275c62209aA660",
      },
    },
    fum: {
      name: "BTC funder",
      abi: FUMABI,
      address: {
        42: "0x457354225f6292E05d23976eB7BB053a0E9C3389",
      },
    },
  },
};

export default ecosystems;
export const defaultEcosystem = "SIMULATE_BTC";
