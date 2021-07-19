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
  allowanceSelector,
} from "./redux/selectors";
import { Card, Table } from "react-bootstrap";
import { decimalPlaces, stringMul } from "./utils";
import { ethToFumBuilder, fumToEthBuilder, buyFumBuilder, sellFumBuilder } from "./blockchainInteractions";
import ecosystems from "./ecosystems";
import BlockchainWriteButtons from "./BlockchainWriteButtons";

const FUMCard = ({
  dispatch,
  ethToFum,
  fumToEth,
  buy,
  sell,
  ecosystem,
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
  allowance,
  allowanceLoaded,
}) => {
  return (
    <Card>
      <Card.Header as="h5">
        {fum.name}
        <BlockchainWriteButtons
          ecosystem={ecosystem}
          metamaskSigner={metamaskSigner}
          buyConvertFunction={ethToFum(dispatch)}
          sellConvertFunction={fumToEth(dispatch)}
          buy={buy(dispatch)}
          sell={sell(dispatch)}
          connect={connect}
          allowance={allowance}
          allowanceLoaded={allowanceLoaded}
          collateralUnit="Tether"
          metamaskConnected={metamaskConnected}
          buttonLabel={fum.name}
          coinUnit={fum.name}
          buyLabel="Fund"
          sellLabel="Defund"
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
              <td>Fund Price</td>
              <td>Ξ {decimalPlaces(fumBuyPrice, 5)}</td>
              <td>$ {decimalPlaces(fumBuyPriceUSD)}</td>
            </tr>
            <tr>
              <td>Defund Price</td>
              <td>Ξ {decimalPlaces(fumSellPrice, 5)}</td>
              <td>$ {decimalPlaces(fumSellPriceUSD)}</td>
            </tr>
            <tr>
              <td>Total Supply</td>
              <td>-</td>
              <td>{decimalPlaces(fumSupply, 5)}</td>
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
  const allowance = allowanceSelector(state);
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
    ethToFum: ethToFumBuilder(provider, metamaskSigner, ecosystem),
    fumToEth: fumToEthBuilder(provider, metamaskSigner, ecosystem),
    buy: buyFumBuilder(provider, metamaskSigner, ecosystem),
    sell: sellFumBuilder(provider, metamaskSigner, ecosystem),
    allowance,
    allowanceLoaded: allowance !== null,
  };
}

export default connect(mapStateToProps)(FUMCard);
