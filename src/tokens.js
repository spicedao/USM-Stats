const { abi: USMABI } = require("./external/abi/USM.json");
const { abi: USMViewABI } = require("./external/abi/USMView.json");
const { abi: FUMABI } = require("./external/abi/FUM.json");
const { abi: OracleABI } = require("./external/abi/Oracle.json");
const { abi: DiaOracleABI } = require("./external/abi/DiaOracle.json");

const ecosystems = {
  SPICE: {
    usm: {
      name: "usm",
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
      name: "fum",
      abi: FUMABI,
      address: {
        42: "0xF48D8c02202A2D159B0Dd156d7E2E4559C038633",
      },
    },
  },
  PATACON: {
    usm: {
      name: "usm",
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
      name: "fum",
      abi: FUMABI,
      address: {
        42: "0xF48D8c02202A2D159B0Dd156d7E2E4559C038633",
      },
    },
  },
};

export default ecosystems;
export const defaultEcosystem = "SPICE";
