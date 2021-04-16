import React from "react";
import { connect } from "react-redux";
import {
  coingeckoETHPriceSelector,
  networkProviderSelector,
  ecosystemSelector,
  fumBuyPriceSelector,
  fumSellPriceSelector,
  fumSupplySelector,
  metamaskSelector,
  metamaskSignerSelector,
} from "./redux/selectors";
import { Card, Table } from "react-bootstrap";
import { decimalPlaces, stringMul } from "./utils";
import { loadMetamask } from "./redux/interactions";
import { buyFumBuilder, sellFumBuilder } from "./blockchainInteractions";
import ecosystems from "./ecosystems";
import BlockchainWriteButtons from "./BlockchainWriteButtons";

const FUMCard = ({
  dispatch,
  buy,
  sell,
  fumMarketCap,
  fumMarketCapUSD,
  fumSupply,
  fumBuyPrice,
  fumBuyPriceUSD,
  fumSellPrice,
  fumSellPriceUSD,
  fum,
  metamaskSigner,
  metamaskConnected,
  metamaskUSM,
  ecosystem,
}) => {
  const connect = (e) => {
    loadMetamask(dispatch);
  };

  return (
    <Card>
      <Card.Header as="h5">
        {fum.name}
        <BlockchainWriteButtons
          {...{ buy: buy(dispatch), sell: sell(dispatch), connect, metamaskConnected }}
        />
      </Card.Header>
      <Card.Body>
        <Table striped hover size="sm">
          <tbody>
            <tr>
              <td>Market Cap</td>
              <td>Ξ {decimalPlaces(fumMarketCap)}</td>
              <td>$ {decimalPlaces(fumMarketCapUSD)}</td>
            </tr>
            <tr>
              <td>Mint Price</td>
              <td>Ξ {decimalPlaces(fumBuyPrice, 5)}</td>
              <td>$ {decimalPlaces(fumBuyPriceUSD)}</td>
            </tr>
            <tr>
              <td>Burn Price</td>
              <td>Ξ {decimalPlaces(fumSellPrice, 5)}</td>
              <td>$ {decimalPlaces(fumSellPriceUSD)}</td>
            </tr>
            <tr>
              <td>Total Supply</td>
              <td>-</td>
              <td>{decimalPlaces(fumSupply)}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

function mapStateToProps(state) {
  const coingeckoETHPrice = coingeckoETHPriceSelector(state);

  const fumSupply = fumSupplySelector(state);
  const fumBuyPrice = fumBuyPriceSelector(state);
  const fumSellPrice = fumSellPriceSelector(state);
  const fumMarketCap = fumSupply * fumBuyPrice;

  const fumBuyPriceUSD = stringMul(fumBuyPrice, coingeckoETHPrice);
  const fumSellPriceUSD = stringMul(fumSellPrice, coingeckoETHPrice);
  const fumMarketCapUSD = stringMul(fumMarketCap, coingeckoETHPrice);

  const metamask = metamaskSelector(state);
  const ecosystem = ecosystemSelector(state);
  const metamaskConnected = metamask != null;
  const metamaskSigner = metamaskSignerSelector(state);
  const fum = ecosystems[ecosystem].fum;
  const provider = networkProviderSelector(state);
  return {
    ecosystem,
    fum,
    fumMarketCap,
    fumMarketCapUSD,
    fumSupply,
    fumBuyPrice,
    fumBuyPriceUSD,
    fumSellPrice,
    fumSellPriceUSD,
    metamaskConnected,
    metamaskSigner,
    buy: buyFumBuilder(provider, metamaskSigner, ecosystem),
    sell: sellFumBuilder(provider, metamaskSigner, ecosystem),
  };
}

export default connect(mapStateToProps)(FUMCard);
