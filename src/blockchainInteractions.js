import { ethers } from "ethers"
import ecosystems from './ecosystems';
import {curry} from 'lodash';
import { metamaskError } from "./redux/actions"
export const getNetwork = async() => ({chainId: '42'})

const callFunctionOnUsm = (functionName, provider, signer, ecosystem, dispatch) => async (amount) => {
  const weiAmount = ethers.utils.parseEther(amount)
  console.log(`attempting to ${functionName} on usm in ${ecosystem} for ${amount}`)
  const address = await signer.getAddress()
  const contractInfo = ecosystems[ecosystem].usm;
  const abi = contractInfo.abi
  const network = await getNetwork()
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
      .catch((error) => dispatch(metamaskError(JSON.stringify(error.message))))
}


export const buyUsmBuilder = curry(callFunctionOnUsm)('mint')

export const sellUsmBuilder = curry(callFunctionOnUsm)('burn')

export const buyFumBuilder = curry(callFunctionOnUsm)('fund')

export const sellFumBuilder = curry(callFunctionOnUsm)('defund')
