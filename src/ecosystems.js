const { abi: USMABI } = require("./external/abi/USMDia.json");
const { abi: USMViewABI } = require("./external/abi/USMView.json");
const { abi: FUMABI } = require("./external/abi/FUM.json");
const { abi: OracleABI } = require("./external/abi/DiaOracleAdapter.json");
const { abi: DiaOracleABI } = require("./external/abi/DiaOracle.json");


const ecosystems = {
  SIMULATE_BTC: {
    usm: {
      name: "BTC",
      abi: USMABI,
      address: {
        42: "0xc0Fe2111Ac4f3bDDA377624C0d343FFEa217266c",
      },
    },
    usmview: {
      name: "USMView",
      abi: USMViewABI,
      address: {
        42: "0x2EE78ee62c889E6aA05417cE2756548742bbc7FE",
      },
    },
    oracle: {
      name: "oracle",
      abi: OracleABI,
      address: {
        42: "0xf21B470127Cf791553442B3Fef0d7eFeB7284fe0",
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
        42: "0x6fd232561D9fC6d360A161be7b76acf6d51Aa64F",
      },
    },
  },
};

export default ecosystems;
export const defaultEcosystem = "SIMULATE_BTC";
