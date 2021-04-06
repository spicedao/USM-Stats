import React from "react";
import { connect } from "react-redux";
import {
  coingeckoETHPriceSelector,
  coingeckoSYNTHPriceSelector,
  metamaskSelector,
  ecosystemSelector,
  networkProviderSelector,
  usmInputAmountSelector,
  metamaskSignerSelector,
  usmBurnsSelector,
  usmBuyPriceSelector,
  usmMintsSelector,
  usmSellPriceSelector,
  usmSupplySelector,
} from "./redux/selectors";
import { Card, Table } from "react-bootstrap";
import { decimalPlaces, stringMul, usmPriceHighlight } from "./utils";
import { loadMetamask } from "./redux/interactions";
import { buyUsmBuilder, sellUsmBuilder } from "./blockchainInteractions";
import ecosystems from "./tokens";
import BlockchainWriteButtons from "./BlockchainWriteButtons";

const USMCard = ({
  dispatch,
  usm,
  provider,
  ecosystem,
  usmSupply,
  usmMints,
  usmBurns,
  usmMarketCap,
  usmMarketCapUSD,
  usmBuyPrice,
  usmBuyPriceUSD,
  usmSellPrice,
  usmSellPriceUSD,
  metamaskSigner,
  metamaskConnected,
  inputAmount,
  coingeckoSYNTHPrice,
}) => {
  const connect = (e) => {
    loadMetamask(dispatch);
  };

  const buy = buyUsmBuilder(dispatch, provider, metamaskSigner, ecosystem);

  const sell = sellUsmBuilder(dispatch, provider, metamaskSigner, ecosystem);

  return (
    <Card>
      <Card.Header as="h5">
        <span>{usm.name}</span>
        <BlockchainWriteButtons
          {...{ buy, sell, connect, metamaskConnected }}
        />
      </Card.Header>
      <Card.Body>
        <Table striped hover size="sm">
          <tbody>
            <tr>
              <td>Market Cap</td>
              <td>Ξ {decimalPlaces(usmMarketCap)}</td>
              <td>$ {decimalPlaces(usmMarketCapUSD)}</td>
            </tr>
            <tr
              className="text-dark"
              style={{
                backgroundColor: usmPriceHighlight(
                  usmBuyPriceUSD,
                  coingeckoSYNTHPrice
                ),
              }}
            >
              <td>Mint Price</td>
              <td>Ξ {decimalPlaces(usmBuyPrice, 5)}</td>
              <td>$ {decimalPlaces(usmBuyPriceUSD)}</td>
            </tr>
            <tr
              className="text-dark"
              style={{
                backgroundColor: usmPriceHighlight(
                  usmSellPriceUSD,
                  coingeckoSYNTHPrice
                ),
              }}
            >
              <td>Burn Price</td>
              <td>Ξ {decimalPlaces(usmSellPrice, 5)}</td>
              <td>$ {decimalPlaces(usmSellPriceUSD)}</td>
            </tr>
            <tr>
              <td>Total Supply</td>
              <td>-</td>
              <td>{decimalPlaces(usmSupply)}</td>
            </tr>
            <tr>
              <td>No. of Mints</td>
              <td>-</td>
              <td>{usmMints}</td>
            </tr>
            <tr>
              <td>No. of Burns</td>
              <td>-</td>
              <td>{usmBurns}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

function mapStateToProps(state) {
  const coingeckoSYNTHPrice = coingeckoSYNTHPriceSelector(state);
  const coingeckoETHPrice = coingeckoETHPriceSelector(state);

  const usmSupply = usmSupplySelector(state);
  const usmBuyPrice = usmBuyPriceSelector(state);
  const usmSellPrice = usmSellPriceSelector(state);
  const usmMarketCap = usmSupply * usmBuyPrice;
  const usmBuyPriceUSD = stringMul(usmBuyPrice, coingeckoETHPrice);
  const usmSellPriceUSD = stringMul(usmSellPrice, coingeckoETHPrice);
  const usmMarketCapUSD = stringMul(usmMarketCap, coingeckoETHPrice);

  const metamask = metamaskSelector(state);
  const metamaskConnected = metamask != null;
  const ecosystem = ecosystemSelector(state);
  const provider = networkProviderSelector(state);
  const usm = ecosystems[ecosystem].usm;
  return {
    inputAmount: usmInputAmountSelector(state),
    usm,
    provider,
    ecosystem,
    usmMarketCap,
    usmMarketCapUSD,
    usmSupply,
    usmMints: usmMintsSelector(state),
    usmBurns: usmBurnsSelector(state),
    usmBuyPrice,
    usmBuyPriceUSD,
    usmSellPrice,
    usmSellPriceUSD,
    metamaskConnected,
    coingeckoSYNTHPrice,
    metamaskSigner: metamaskSignerSelector(state),
  };
}

export default connect(mapStateToProps)(USMCard);
