import { ethers } from "ethers"
import ecosystems from './ecosystems';
import {curry} from 'lodash';
import { metamaskError } from "./redux/actions"
import { decimalPlaces, wtoe } from "./utils";

export const getNetwork = async() => ({chainId: '42'});

const callFunctionOnUsm = (functionName, provider, signer, ecosystem, dispatch) => async (amount) => {
  const weiAmount = ethers.utils.parseEther(amount)
  console.log(`attempting to ${functionName} on usm in ${ecosystem} for ${amount}`)
  const address = await signer.getAddress()
  const network = await getNetwork()
  const contractInfo = ecosystems[ecosystem].usm;
  const abi = contractInfo.abi
  const contractAddress = contractInfo.address[network.chainId]
  const contract = new ethers.Contract(contractAddress, abi, signer)

  let args;
  if(['mint','fund'].includes(functionName)){
    args = [address, 0, {value: weiAmount}]
  } else if (['burn', 'defund'].includes(functionName) ){
    args = [address, address, weiAmount, 0]
  } else {
    throw new Error('invalid method')
  }
  
  return contract[functionName](...args)
      .then(() => console.log(`${functionName} on ${ecosystem} usm of ${amount} succesfull`))
      .catch((error) => dispatch(metamaskError(error)))
}

export const exchangeCalculationFunction = (functionName, provider, signer, ecosystem, dispatch) => async (amount) => {
  const weiAmount = ethers.utils.parseEther(amount)

  const network = await getNetwork()
  const contractInfoView = ecosystems[ecosystem].usmview;
  const abiView = contractInfoView.abi
  const contractAddressView = contractInfoView.address[network.chainId]
  const contractView = new ethers.Contract(contractAddressView, abiView, signer)

  let args;
  if(functionName.toLowerCase().includes('usm')){
    args = [weiAmount.toString(), 0]
  } else if (functionName.toLowerCase().includes('fum')){
    args = [weiAmount.toString()]
  } else {
    throw new Error('invalid method')
  }

  let usm;
  try {
    usm = await contractView[functionName](...args)
  } catch(error) {
    return -1;
  }
  
  const usmOverWad = wtoe(usm);
  const usmOverWadWithDecimals = decimalPlaces(usmOverWad, 7);
  return usmOverWadWithDecimals;
}

export const ethToUsmBuilder = curry(exchangeCalculationFunction)('ethToUsm')

export const usmToEthBuilder = curry(exchangeCalculationFunction)('usmToEth')

export const ethToFumBuilder = curry(exchangeCalculationFunction)('ethToFum')

export const fumToEthBuilder = curry(exchangeCalculationFunction)('fumToEth')

export const buyUsmBuilder = curry(callFunctionOnUsm)('mint')

export const sellUsmBuilder = curry(callFunctionOnUsm)('burn')

export const buyFumBuilder = curry(callFunctionOnUsm)('fund')

export const sellFumBuilder = curry(callFunctionOnUsm)('defund')
