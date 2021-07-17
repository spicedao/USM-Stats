import React from "react";
import { connect } from "react-redux";
import {
  coingeckoETHPriceSelector,
  coingeckoSYNTHPriceSelector,
  metamaskSelector,
  ecosystemSelector,
  networkProviderSelector,
  metamaskSignerSelector,
  usmBuyPriceSelector,
  usmSellPriceSelector,
  usmSupplySelector,
  allowanceSelector,
} from "./redux/selectors";
import { Card, Table } from "react-bootstrap";
import { decimalPlaces, stringMul, usmPriceHighlight } from "./utils";
import { ethToUsmBuilder, usmToEthBuilder, buyUsmBuilder, sellUsmBuilder } from "./blockchainInteractions";
import ecosystems from "./ecosystems";
import BlockchainWriteButtons from "./BlockchainWriteButtons";


const USMCard = ({
  dispatch,
  usm,
  ethToUsm,
  usmToEth,
  buy,
  sell,
  ecosystem,
  usmSupply,
  usmMarketCap,
  usmMarketCapUSD,
  usmBuyPrice,
  usmBuyPriceUSD,
  usmSellPrice,
  usmSellPriceUSD,
  metamaskSigner,
  metamaskConnected,
  coingeckoSYNTHPrice,
  allowance,
  allowanceLoaded,
}) => {
  return (
    <Card>
      <Card.Header as="h5">
        <span>{usm.name} synth</span>
        <BlockchainWriteButtons
          ecosystem={ecosystem}
          metamaskSigner={metamaskSigner}
          buyConvertFunction={ethToUsm(dispatch)}
          sellConvertFunction={usmToEth(dispatch)}
          buy={buy(dispatch)}
          sell={sell(dispatch)}
          allowance={allowance}
          allowanceLoaded={allowanceLoaded}
          metamaskConnected={metamaskConnected}
          buttonLabel={usm.name}
          coinUnit={usm.name + " synth"}
          buyLabel="Mint"
          sellLabel="Burn"
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
              <td>{decimalPlaces(usmSupply, 5)}</td>
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
  const metamaskSigner = metamaskSignerSelector(state);
  const allowance = allowanceSelector(state);
  return {
    usm,
    ecosystem,
    usmMarketCap,
    usmMarketCapUSD,
    usmSupply,
    usmBuyPrice,
    usmBuyPriceUSD,
    usmSellPrice,
    usmSellPriceUSD,
    metamaskConnected,
    coingeckoSYNTHPrice,
    ethToUsm: ethToUsmBuilder(provider, metamaskSigner, ecosystem),
    usmToEth: usmToEthBuilder(provider, metamaskSigner, ecosystem),
    buy: buyUsmBuilder(provider, metamaskSigner, ecosystem),
    sell : sellUsmBuilder(provider, metamaskSigner, ecosystem),
    metamaskSigner,
    allowance,
    allowanceLoaded: allowance !== null,
  };
}

export default connect(mapStateToProps)(USMCard);
