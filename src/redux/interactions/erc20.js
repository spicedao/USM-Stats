import { ethers } from "ethers"
import { setBurns, setMints, setTotalSupply } from "../actions"

export const loadERC20Data = async (dispatch, tokenName, tokenContract) => {
  getTotalSupply(dispatch, tokenName, tokenContract)
  getTotalMints(dispatch, tokenName, tokenContract)
  getTotalBurns(dispatch, tokenName, tokenContract)
}

const getTotalSupply = async (dispatch, tokenName, erc20Contract) => {
  const supply = await erc20Contract.totalSupply()
  const formattedSupply = ethers.utils.formatEther(supply)
  dispatch(setTotalSupply(tokenName, formattedSupply))
}

const getTotalMints = async (dispatch, tokenName, erc20Contract) => {
  const mintFilter = erc20Contract.filters.Transfer(ethers.constants.AddressZero, null)
  const mints = await erc20Contract.queryFilter(mintFilter, 0)
  dispatch(setMints(tokenName, mints.length))
}

const getTotalBurns = async (dispatch, tokenName, erc20Contract) => {
  const burnFilter = erc20Contract.filters.Transfer(null, ethers.constants.AddressZero)
  const burns = await erc20Contract.queryFilter(burnFilter, 0)
  dispatch(setBurns(tokenName, burns.length))
}
