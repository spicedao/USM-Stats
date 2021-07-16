import {get} from 'lodash';
import {createSelector} from 'reselect';

//APP
const networkProvider = state => get(state, 'app.provider', null);
export const networkProviderSelector = createSelector(networkProvider, w => w);

const allowance = state => get(state, 'app.allowance', null);
export const allowanceSelector = createSelector(allowance, w => w);

const metamask = state => get(state, 'app.metamask', null);
export const metamaskSelector = createSelector(metamask, w => w);

const metamaskSigner = state => get(state, 'app.metamaskSigner', null);
export const metamaskSignerSelector = createSelector(metamaskSigner, w => w);

const metamaskError = state => get(state, 'app.metamaskError', null);
export const metamaskErrorSelector = createSelector(metamaskError, w => w);

const ecosystem = state => get(state, 'app.ecosystem', null);
export const ecosystemSelector = createSelector(ecosystem, w => w);

//USM
const usmSupply = state => get(state, `${state.app.ecosystem}.usm.supply`, 0);
export const usmSupplySelector = createSelector(usmSupply, w => w);

const usmCollateral = state => get(state, `${state.app.ecosystem}.usm.collateral`, 0);
export const usmCollateralSelector = createSelector(usmCollateral, w => w);

const usmDebtRatio = state => get(state, `${state.app.ecosystem}.usm.debtRatio`, 0);
export const usmDebtRatioSelector = createSelector(usmDebtRatio, w => w);

const usmEthBuffer = state => get(state, `${state.app.ecosystem}.usm.ethBuffer`, 0);
export const usmEthBufferSelector = createSelector(usmEthBuffer, w => w);

const usmBuyPrice = state => get(state, `${state.app.ecosystem}.usm.buyPrice`, 0);
export const usmBuyPriceSelector = createSelector(usmBuyPrice, w => w);

const usmSellPrice = state => get(state, `${state.app.ecosystem}.usm.sellPrice`, 0);
export const usmSellPriceSelector = createSelector(usmSellPrice, w => w);

//FUM
const fumSupply = state => get(state, `${state.app.ecosystem}.fum.supply`, 0);
export const fumSupplySelector = createSelector(fumSupply, w => w);

const fumBuyPrice = state => get(state, `${state.app.ecosystem}.fum.buyPrice`, 0);
export const fumBuyPriceSelector = createSelector(fumBuyPrice, w => w);

const fumSellPrice = state => get(state, `${state.app.ecosystem}.fum.sellPrice`, 0);
export const fumSellPriceSelector = createSelector(fumSellPrice, w => w);

//ORACLE
const coingeckoPrice = state => get(state, `${state.app.ecosystem}.oracle.coingeckoPrice`, 0);
export const coingeckoPriceSelector = createSelector(coingeckoPrice, w => w);

const coingeckoETHPrice = state => get(state, `${state.app.ecosystem}.oracle.coingeckoETHPrice`, 0);
export const coingeckoETHPriceSelector = createSelector(coingeckoETHPrice, w => w);

const coingeckoSYNTHPrice = state => get(state, `${state.app.ecosystem}.oracle.coingeckoSYNTHPrice`, 0);
export const coingeckoSYNTHPriceSelector = createSelector(coingeckoSYNTHPrice, w => w);

const cachedPrice = state => get(state, `${state.app.ecosystem}.oracle.cachedPrice`, 0);
export const cachedPriceSelector = createSelector(cachedPrice, w => w);

const latestPrice = state => get(state, `${state.app.ecosystem}.oracle.latestPrice`, 0);
export const latestPriceSelector = createSelector(latestPrice, w => w);

const rawETHPrice = state => get(state, `${state.app.ecosystem}.oracle.rawEthPrice`, 0);
export const rawETHPriceSelector = createSelector(rawETHPrice, w => w);

const rawSYNTHPrice = state => get(state, `${state.app.ecosystem}.oracle.rawSynthPrice`, 0);
export const rawSYNTHPriceSelector = createSelector(rawSYNTHPrice, w => w);
