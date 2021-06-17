import { ethers } from "ethers"
import { setCollateral, setDebtRatio, setEthBuffer, setFUMPrice, setUSMPrice } from "../actions"

export const loadCollateralData = async (dispatch, usmViewContract, usmContract) => {
  getCollateral(dispatch, usmContract)
  getDebtRatio(dispatch, usmViewContract)
  getEthBuffer(dispatch, usmViewContract)
  getUSMPrice(dispatch, usmViewContract)
  getFUMPrice(dispatch, usmViewContract)
}

export const getCollateral = async (dispatch, usmContract) => {
  const collateral = await usmContract.ethPool()
  const formattedCollateral = ethers.utils.formatEther(collateral)
  dispatch(setCollateral(formattedCollateral))
}

export const getDebtRatio = async (dispatch, usmViewContract) => {
  const ratio = await usmViewContract.debtRatio()
  const formattedRatio = ethers.utils.formatEther(ratio)
  dispatch(setDebtRatio(formattedRatio))
}

export const getEthBuffer = async (dispatch, usmViewContract) => {
  const ethBuffer = await usmViewContract.ethBuffer(0)
  const formattedBuffer = ethers.utils.formatEther(ethBuffer)
  dispatch(setEthBuffer(formattedBuffer))
}

export const getUSMPrice = async (dispatch, usmViewContract) => {
  const buyPrice = await usmViewContract.usmPrice(0)
  const formattedBuyPrice = ethers.utils.formatEther(buyPrice)
  const sellPrice = await usmViewContract.usmPrice(1)
  const formattedSellPrice = ethers.utils.formatEther(sellPrice)
  dispatch(setUSMPrice(formattedBuyPrice, formattedSellPrice))
}

export const getFUMPrice = async (dispatch, usmViewContract) => {
  const buyPrice = await usmViewContract.fumPrice(0)
  const formattedBuyPrice = ethers.utils.formatEther(buyPrice)
  const sellPrice = await usmViewContract.fumPrice(1)
  const formattedSellPrice = ethers.utils.formatEther(sellPrice)
  dispatch(setFUMPrice(formattedBuyPrice, formattedSellPrice))
}
