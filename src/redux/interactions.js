import { ethers } from "ethers"
import ecosystems from "../tokens"
import { fumLoaded, metamaskError, metamaskLoaded, networkLoaded, usmLoaded, usmViewLoaded, rawOracleLoaded } from "./actions"
import { loadCollateralData } from "./interactions/cdp"
import { loadERC20Data } from "./interactions/erc20"
import { loadOracleData } from "./interactions/oracles"

const getNetwork = async() => ({chainId: '42'})

export const loadNetwork = async (dispatch, ecosystemName) => {
  const provider = new ethers.providers.JsonRpcProvider("https://kovan.infura.io/v3/1be1f8b7b85a47e4949bc1057660a81d")
  dispatch(networkLoaded(provider))
  const ecosystem = ecosystems[ecosystemName];
  const usmContract = await loadUSM(dispatch, provider, ecosystem)
  const rawOracleContract = await loadRawOracle(dispatch, provider, ecosystem)
  loadOracleData(dispatch, usmContract, rawOracleContract, ecosystem)
  loadUSMView(dispatch, provider, usmContract, ecosystem)
  loadFUM(dispatch, provider, ecosystem)
}

const loadRawOracle = async (dispatch, provider, ecosystem) => {
  const network = await getNetwork()
  const abi = ecosystem.diaOracle.abi
  const address = ecosystem.diaOracle.address[network.chainId]
  const rawOracleContract = new ethers.Contract(address, abi, provider)
  dispatch(rawOracleLoaded(rawOracleContract))
  return rawOracleContract
}

const loadUSM = async (dispatch, provider, ecosystem) => {
  const network = await getNetwork()
  const abi = ecosystem.usm.abi
  const address = ecosystem.usm.address[network.chainId]
  const usmContract = new ethers.Contract(address, abi, provider)
  dispatch(usmLoaded(usmContract))
  loadERC20Data(dispatch, ecosystem.usm, usmContract)
  return usmContract
}

const loadUSMView = async (dispatch, provider, usmContract, ecosystem) => {
  const network = await getNetwork()
  const abi = ecosystem.usmview.abi
  const address = ecosystem.usmview.address[network.chainId]
  const usmViewContract = new ethers.Contract(address, abi, provider)
  dispatch(usmViewLoaded(usmViewContract))
  loadCollateralData(dispatch, usmViewContract, usmContract)
}

const loadFUM = async (dispatch, provider, ecosystem) => {
  const network = await getNetwork()
  const abi = ecosystem.fum.abi
  const address = ecosystem.fum.address[network.chainId]
  const fumContract = new ethers.Contract(address, abi, provider)
  dispatch(fumLoaded(fumContract))
  loadERC20Data(dispatch, ecosystem.fum, fumContract)
}

export const loadMetamask = async (dispatch) => {
  try {
    await window.ethereum.enable()
    const provider = await new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner()
    const network = await getNetwork()

    if (network.chainId != 42) {
      throw new Error("Must be on kovan. Please alter Metamask network and refresh the page.")
    }

    //load USM with Metamask
    //const usmAbi = usm.abi
    //const usmAddress = usm.address[network.chainId]
    //const usmContract = new ethers.Contract(usmAddress, usmAbi, signer)
    ////load FUM with Metamask
    //const fumAbi = fum.abi
    //const fumAddress = fum.address[network.chainId]
    //const fumContract = new ethers.Contract(fumAddress, fumAbi, signer)
    // dispatch(metamaskLoaded(provider, signer, usmContract, fumContract))
    dispatch(metamaskLoaded(provider, signer, {}, {}))
  }
  catch (e) {
    dispatch(metamaskError(e))
    return (false, false)
  }
}

export const buyUSM = async (dispatch, usm, signer, amount) => {
  const weiAmount = ethers.utils.parseEther(amount)
  const address = await signer.getAddress()
  usm.mint(address, 0, {value: weiAmount})
    .then(() => console.log("minting USM"))
    .catch((error) => dispatch(metamaskError(error)))
}

export const sellUSM = async (dispatch, usm, signer, amount) => {
  const weiAmount = ethers.utils.parseEther(amount)
  const address = await signer.getAddress()
  usm.burn(address, address, weiAmount, 0)
    .then(() => console.log("burning USM"))
    .catch((error) => dispatch(metamaskError(error)))
}

export const buyFUM = async (dispatch, usm, signer, amount) => {
  console.log(usm, signer, amount)
  const weiAmount = ethers.utils.parseEther(amount)
  const address = await signer.getAddress()
  usm.fund(address, 0, {value: weiAmount})
    .then(() => console.log("minting FUM"))
    .catch((error) => dispatch(metamaskError(error)))
}

export const sellFUM = async (dispatch, usm, signer, amount) => {
  const weiAmount = ethers.utils.parseEther(amount)
  const address = await signer.getAddress()
  usm.defund(address, address, weiAmount, 0)
    .then(() => console.log("burning FUM"))
    .catch((error) => dispatch(metamaskError(error)))
}
