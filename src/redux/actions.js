import { rawETH, rawSYNTH, coingecko, coingeckoETH, cachedInContract, coingeckoSYNTH, latestFromContract } from "../oracles";
const usm = 'usm'
const fum ='fum'

export function metamaskLoaded(metamask, signer) {
  return {
    type: 'METAMASK_LOADED',
    metamask,
    signer
  }
}

export function ecosystemChanged(ecosystem) {
  return {
    type: 'ECOSYSTEM_CHANGED',
    ecosystem
  }
}

export function metamaskError(error) {
  return {
    type: 'METAMASK_ERROR',
    error
  }
}

export function clearMetamaskError() {
  return {
    type: 'CLEAR_METAMASK_ERROR'
  }
}

export function networkLoaded(provider){
  return {
    type: 'NETWORK_LOADED',
    provider
  }
}

export function setLatestOraclePrice(source, price) {
  switch (source) {
    case coingecko:
      return {
        type: 'ORACLE_PRICE_COINGECKO',
        price
      }
    case coingeckoETH:
      return {
        type: 'ORACLE_PRICE_ETH_COINGECKO',
        price
      }
    case coingeckoSYNTH:
      return {
        type: 'ORACLE_PRICE_SYNTH_COINGECKO',
        price
      }
    case cachedInContract:
      return {
        type: 'ORACLE_PRICE_CACHED',
        price
      }
    case latestFromContract:
      return {
        type: 'ORACLE_PRICE_LATEST',
        price
      }
    case rawETH:
      return {
        type: 'ORACLE_PRICE_RAW_ETH',
        price
      }
    case rawSYNTH:
      return {
        type: 'ORACLE_PRICE_RAW_SYNTH',
        price
      }
    default:
      break;
  }
}

export function setCollateral(collateral) {
  return {
    type: 'USM_COLLATERAL',
    collateral
  }
}

export function setDebtRatio(debtRatio) {
  return {
    type: 'USM_DEBT_RATIO',
    debtRatio
  }
}

export function setEthBuffer(ethBuffer) {
  return {
    type: 'USM_ETH_BUFFER',
    ethBuffer
  }
}

export function setUSMPrice(buyPrice, sellPrice) {
  return {
    type: 'USM_PRICE',
    buyPrice,
    sellPrice
  }
}

export function setFUMPrice(buyPrice, sellPrice) {
  return {
    type: 'FUM_PRICE',
    buyPrice,
    sellPrice
  }
}

export function setTotalSupply(tokenName, supply) {
  switch (tokenName) {
    case usm:
      return {
        type: 'USM_TOTAL_SUPPLY',
        supply
      }
    case fum:
      return {
        type: 'FUM_TOTAL_SUPPLY',
        supply
      }
    default:
      break;
  }
}
