//
const { abi: USMABI } = require("./external/abi/USMDia.json");
const { abi: USMViewABI } = require("./external/abi/USMView.json");
const { abi: FUMABI } = require("./external/abi/FUM.json");
const { abi: OracleABI } = require("./external/abi/DiaOracleAdapter.json");
const { abi: DiaOracleABI } = require("./external/abi/DiaOracle.json");
const { abi: MockABI } = require("./external/abi/MockToken.json");


const ecosystems = {
  SIMULATE_BTC: {
    usm: {
      name: "BTC",
      abi: USMABI,
      address: {
        42: "0x04B2E6e36F6E22A7859B603E2fD455039c2DD993",
      },
    },
    usmview: {
      name: "USMView",
      abi: USMViewABI,
      address: {
        42: "0x6dC747Bd08634AEd348d5DcCB71527Cd163a1eA2",
      },
    },
    oracle: {
      name: "oracle",
      abi: OracleABI,
      address: {
        42: "0xb7a0fAABA2E120d1FFb57a086AcFF783e71CaBf8",
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
        42: "0xe9E62325B98f65316754209Dd442319d52B118C9",
      },
    },
    mockToken: {
      name: "Mock token",
      abi: MockABI,
      address: {
        42: "0xb451c6835515f8a08ecc4cbc5C5dcb238A48f7B4",
      },
    },
  },
};

export default ecosystems;
export const defaultEcosystem = "SIMULATE_BTC";
