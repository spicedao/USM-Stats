import { ethers } from "ethers"
import { coingecko, coingeckoETH, coingeckoSYNTH, median } from "../../oracles"
import { setLatestOraclePrice } from "../actions"
import axios from 'axios'

export const loadOracleData = async (dispatch, contract) => {
  const ethprice = await getCoingeckoETHPrice(dispatch)
  const synthprice = await getCoingeckoSYNTHPrice(dispatch)
  dispatch(setLatestOraclePrice(coingecko, ethprice/synthprice))
  getMedianPrice(dispatch, contract)
}

export const getCoingeckoETHPrice = (dispatch) => axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
  .then(function (response) {
    const price = response.data.ethereum.usd
    dispatch(setLatestOraclePrice(coingeckoETH, price))
    return price
  })
  .catch(function (error) {
    console.log(error);
  })


export const getCoingeckoSYNTHPrice = (dispatch) => axios.get('https://api.coingecko.com/api/v3/simple/price?ids=spice-finance&vs_currencies=usd')
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


export const getMedianPrice = async (dispatch, contract) => {
  // TODO: show latest price update time, perhaps?
  const price = (await contract.latestPrice())[0]
  const formattedPrice = ethers.utils.formatEther(price)
  // TODO: should call both the method in the oracle and in the contract
  dispatch(setLatestOraclePrice(median, formattedPrice))
}
