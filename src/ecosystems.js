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
        42: "0xe57498ECAeAeBF993d9b887bbe75DEaE8fB8CFa1",
      },
    },
    usmview: {
      name: "USMView",
      abi: USMViewABI,
      address: {
        42: "0x56E175976379f92329a1D6e8950adfE02f9d06d6",
      },
    },
    oracle: {
      name: "oracle",
      abi: OracleABI,
      address: {
        42: "0xFFC7F646644B90a3fba3E6a90334F346DA4D5c19",
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
        42: "0xE472CC21ae28ceFdb2bFA00f549771E99d89f4a1",
      },
    },
  },
};

export default ecosystems;
export const defaultEcosystem = "SIMULATE_BTC";
