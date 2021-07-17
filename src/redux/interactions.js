import { ethers } from "ethers";
import ecosystems from "../ecosystems";
import { metamaskError, metamaskLoaded, networkLoaded } from "./actions";
import { loadCollateralData } from "./interactions/cdp";
import { loadERC20Data } from "./interactions/erc20";
import { loadOracleData } from "./interactions/oracles";
import { getNetwork } from "../blockchainInteractions";

export const loadNetwork = async (dispatch, ecosystemName) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://kovan.infura.io/v3/2f525eb4037d4ce2a63343669a45f1d0"
  );
  dispatch(networkLoaded(provider));
  const ecosystem = ecosystems[ecosystemName];
  const usmContract = await loadUSM(dispatch, provider, ecosystem);
  const rawOracleContract = await loadRawOracle(dispatch, provider, ecosystem);
  loadOracleData(dispatch, usmContract, rawOracleContract, ecosystem);
  loadUSMView(dispatch, provider, usmContract, ecosystem);
  loadFUM(dispatch, provider, ecosystem);
};

const loadRawOracle = async (dispatch, provider, ecosystem) => {
  const network = await getNetwork();
  const abi = ecosystem.diaOracle.abi;
  const address = ecosystem.diaOracle.address[network.chainId];
  const rawOracleContract = new ethers.Contract(address, abi, provider);
  return rawOracleContract;
};

const loadUSM = async (dispatch, provider, ecosystem) => {
  const network = await getNetwork();
  const abi = ecosystem.usm.abi;
  const address = ecosystem.usm.address[network.chainId];
  console.log("Address: ", address)
  const usmContract = new ethers.Contract(address, abi, provider);
  loadERC20Data(dispatch, "usm", usmContract);
  return usmContract;
};

const loadUSMView = async (dispatch, provider, usmContract, ecosystem) => {
  const network = await getNetwork();
  const abi = ecosystem.usmview.abi;
  const address = ecosystem.usmview.address[network.chainId];
  const usmViewContract = new ethers.Contract(address, abi, provider);
  loadCollateralData(dispatch, usmViewContract, usmContract);
};

const loadFUM = async (dispatch, provider, ecosystem) => {
  const network = await getNetwork();
  const abi = ecosystem.fum.abi;
  const address = ecosystem.fum.address[network.chainId];
  const fumContract = new ethers.Contract(address, abi, provider);
  loadERC20Data(dispatch, "fum", fumContract);
};

export const loadMetamask = async (dispatch) => {
  try {
    await window.ethereum.enable();
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const network = await getNetwork();
    if (network.chainId !== "42") {
      throw new Error(
        "Must be on kovan. Please alter Metamask network and refresh the page."
      );
    }
    dispatch(metamaskLoaded(provider, signer));
  } catch (e) {
    dispatch(metamaskError(e));
    return (false, false);
  }
};
