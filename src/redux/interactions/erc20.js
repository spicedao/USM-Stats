import { ethers } from "ethers"
import { setTotalSupply } from "../actions"

export const loadERC20Data = async (dispatch, tokenName, tokenContract) => {
  getTotalSupply(dispatch, tokenName, tokenContract)
}

const getTotalSupply = async (dispatch, tokenName, erc20Contract) => {
  const supply = await erc20Contract.totalSupply()
  const formattedSupply = ethers.utils.formatEther(supply)
  dispatch(setTotalSupply(tokenName, formattedSupply))
}
