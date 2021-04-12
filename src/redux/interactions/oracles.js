import { ethers } from "ethers"
import { coingecko, coingeckoETH, coingeckoSYNTH, cachedInContract, latestFromContract, rawETH, rawSYNTH } from "../../oracles"
import { setLatestOraclePrice } from "../actions"
import axios from 'axios'

export const loadOracleData = async (dispatch, usmContract, rawOracle) => {
  const ethprice = await getCoingeckoETHPrice(dispatch)
  const synthprice = await getCoingeckoSYNTHPrice(dispatch)
  dispatch(setLatestOraclePrice(coingecko, ethprice/synthprice))
  getPricesFromUSMContract(dispatch, usmContract)
  getPricesFromRawOracle(dispatch, rawOracle)
}

const getCoingeckoETHPrice = (dispatch) => axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
  .then(function (response) {
    const price = response.data.ethereum.usd
    dispatch(setLatestOraclePrice(coingeckoETH, price))
    return price
  })
  .catch(function (error) {
    console.log(error);
  })


const getCoingeckoSYNTHPrice = (dispatch) => axios.get('https://api.coingecko.com/api/v3/simple/price?ids=spice-finance&vs_currencies=usd')
  .then(function (response) {
    const price = response.data["spice-finance"].usd
    console.log(response.data)
    console.log(price)
    dispatch(setLatestOraclePrice(coingeckoSYNTH, price))
    return price
  })
  .catch(function (error) {
    console.log(error);
  })

const getPricesFromUSMContract = async (dispatch, usmContract) => {
  // TODO: show latest price update time, perhaps?
  const cachedPrice = (await usmContract.latestPrice())[0]
  const latestPrice = (await usmContract.latestOraclePrice())[0]
  dispatch(setLatestOraclePrice(cachedInContract, ethers.utils.formatEther(cachedPrice)))
  dispatch(setLatestOraclePrice(latestFromContract, ethers.utils.formatEther(latestPrice)))
}

const getPricesFromRawOracle = async (dispatch, rawOracleContract) => {
  const rawEth = (await rawOracleContract.getValue('ETH'))[0].toNumber()
  const rawSynth = (await rawOracleContract.getValue('SPICE'))[0].toNumber()
  dispatch(setLatestOraclePrice(rawETH, rawEth/(10**5)))
  dispatch(setLatestOraclePrice(rawSYNTH, rawSynth/(10**5)))
}
