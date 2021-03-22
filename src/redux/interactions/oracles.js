import { ethers } from "ethers"
import { chainlink, coingecko, compound, median, uniswap } from "../../oracles"
import { setLatestOraclePrice } from "../actions"
import axios from 'axios'

export const loadOracleData = async (dispatch, contract) => {
  getCoingeckoPrice(dispatch)
  getMedianPrice(dispatch, contract)
}

export const getCoingeckoPrice = async (dispatch) => {
  axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    .then(function (response) {
      dispatch(setLatestOraclePrice(coingecko, response.data.ethereum.usd))
    })
    .catch(function (error) {
      console.log(error);
    })
}

export const getMedianPrice = async (dispatch, contract) => {
  const price = await contract.latestPrice()
  const formattedPrice = ethers.utils.formatEther(price)
  dispatch(setLatestOraclePrice(median, formattedPrice))
}
