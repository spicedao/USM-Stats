const { abi: USMABI } = require("./external/abi/USM.json");
const { abi: USMViewABI } = require("./external/abi/USMView.json");
const { abi: FUMABI } = require("./external/abi/FUM.json");
const { abi: OracleABI } = require("./external/abi/Oracle.json");
const { abi: DiaOracleABI } = require("./external/abi/DiaOracle.json");

const ecosystems = {
  SPICE: {
    usm: {
      name: "SPICE synth",
      abi: USMABI,
      address: {
        42: "0xa9bBf88eccFBB2be0dca7DeDee9D68C38DFAbE75",
      },
    },
    usmview: {
      name: "USMView",
      abi: USMViewABI,
      address: {
        42: "0x4D90474F581B0411Ad213eC0ec09166d4FcdfD78",
      },
    },
    oracle: {
      name: "oracle",
      abi: OracleABI,
      address: {
        42: "0x2Eba759603729b61Fb57B14F9C9f2e678c09C00c",
      },
    },
    diaOracle: {
      name: "diaOracle",
      abi: DiaOracleABI,
      address: {
        42: "0x637c1b5d57b5b0d40b1868b8cc2034525f5f61cf",
      },
    },
    fum: {
      name: "SPICE funder",
      abi: FUMABI,
      address: {
        42: "0xF48D8c02202A2D159B0Dd156d7E2E4559C038633",
      },
    },
  },
  WBTC: {
    usm: {
      name: "WBTC synth",
      abi: USMABI,
      address: {
        42: "0x89a1da2EF2A1d925860aBEfABaD9606Dd1254cB7",
      },
    },
    usmview: {
      name: "USMView",
      abi: USMViewABI,
      address: {
        42: "0x99CeDdAC89F5cc9DE464f5b5C71153997e679358",
      },
    },
    oracle: {
      name: "oracle",
      abi: OracleABI,
      address: {
        42: "0x486674BfE7ee81814d7C8b257c7C4fEb82F6412e",
      },
    },
    diaOracle: {
      name: "diaOracle",
      abi: DiaOracleABI,
      address: {
        42: "0x637c1b5d57b5b0d40b1868b8cc2034525f5f61cf",
      },
    },
    fum: {
      name: "WBTC funder",
      abi: FUMABI,
      address: {
        42: "0x7E9F45CCeC05b85417Edd989C911B1c5F605098f",
      },
    },
  },
  USDC: {
    usm: {
      name: "USDC synth",
      abi: USMABI,
      address: {
        42: "0xe7A14bFE55b4497B7Fb1f7A180aF9876B9f4181a",
      },
    },
    usmview: {
      name: "USMView",
      abi: USMViewABI,
      address: {
        42: "0xc8fA76D249D4482d48Ce94B08285743871401b69",
      },
    },
    oracle: {
      name: "oracle",
      abi: OracleABI,
      address: {
        42: "0x4b1407d18C0EA0FE07670AF299A10CAF2C25B472",
      },
    },
    diaOracle: {
      name: "diaOracle",
      abi: DiaOracleABI,
      address: {
        42: "0x637c1b5d57b5b0d40b1868b8cc2034525f5f61cf",
      },
    },
    fum: {
      name: "USDC funder",
      abi: FUMABI,
      address: {
        42: "0x8B4122D7E308fAEe02890efD591213542ee6B8eb",
      },
    },
  },
};

export default ecosystems;
export const defaultEcosystem = "SPICE";
