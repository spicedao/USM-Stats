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
        42: "0x790A0e77EF04ccEc4c79E10cbf5e8810F756C017",
      },
    },
    usmview: {
      name: "USMView",
      abi: USMViewABI,
      address: {
        42: "0xbE74702a7d4587C7c631B3CC30e787EBA263c0A2",
      },
    },
    oracle: {
      name: "oracle",
      abi: OracleABI,
      address: {
        42: "0xf933d3C7aB0839d90EE32A743feBAAb90D69Dc7b",
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
        42: "0x3C824F2aa457e1d9a2be54e5DD62058A08e06aB7",
      },
    },
  },
};

export default ecosystems;
export const defaultEcosystem = "SIMULATE_BTC";
