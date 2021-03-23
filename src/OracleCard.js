import { Component } from "react";
import { connect } from "react-redux";
import {
  cachedPriceSelector,
  latestPriceSelector,
  rawSYNTHPriceSelector,
  rawETHPriceSelector,
  coingeckoETHPriceSelector,
  coingeckoSYNTHPriceSelector,
  coingeckoPriceSelector,
} from "./redux/selectors";
import { Card, Table } from "react-bootstrap";
import { decimalPlaces, oracleHighlight } from "./utils";

class OracleCard extends Component {
  render() {
    const {
      coingeckoETHPrice,
      coingeckoSYNTHPrice,
      coingeckoPrice,
      cachedPrice,
      latestPrice,
      rawETHPrice,
      rawSYNTHPrice
    } = this.props;

    return (
      <Card>
        <Card.Header as="h5">Oracle Performance</Card.Header>
        <Card.Body>
          <Table striped hover size="sm">
            <tbody>
              <tr>
                <th colSpan={2}>Off Chain Reference (not used)</th>
              </tr>
              <tr>
                <td>Coingecko - ETH</td>
                <td>$ {decimalPlaces(coingeckoETHPrice)}</td>
              </tr>
              <tr>
                <td>Coingecko - SYNTH</td>
                <td>$ {decimalPlaces(coingeckoSYNTHPrice)}</td>
              </tr>
              <tr>
                <td>Coingecko - expected price from oracle</td>
                <td>$ {decimalPlaces(coingeckoPrice)}</td>
              </tr>
              <tr>
                <th colSpan={2}>USMFUM ETH Price</th>
              </tr>
              <tr
                className="text-dark"
                style={{
                  backgroundColor: oracleHighlight(coingeckoPrice, cachedPrice),
                }}
              >
                <td>Price cached in the contract</td>
                <td>$ {decimalPlaces(cachedPrice)}</td>
              </tr>
              <tr
                className="text-dark"
                style={{
                  backgroundColor: oracleHighlight(coingeckoPrice, latestPrice),
                }}
              >
                <td>Price straight from the oracle</td>
                <td>$ {decimalPlaces(latestPrice)}</td>
              </tr>
              <tr>
                <th colSpan={2}>Raw prices from DIA oracle</th>
              </tr>
              <tr
                className="text-dark"
                style={{
                  backgroundColor: oracleHighlight(coingeckoETHPrice, rawETHPrice),
                }}
              >
                <td>oracle ETH price</td>
                <td>$ {decimalPlaces(rawETHPrice)}</td>
              </tr>
              <tr
                className="text-dark"
                style={{
                  backgroundColor: oracleHighlight(coingeckoSYNTHPrice, rawSYNTHPrice),
                }}
              >
                <td>oracle SYNTH price</td>
                <td>$ {decimalPlaces(rawSYNTHPrice)}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    coingeckoETHPrice: coingeckoETHPriceSelector(state),
    coingeckoSYNTHPrice: coingeckoSYNTHPriceSelector(state),
    coingeckoPrice: coingeckoPriceSelector(state),
    cachedPrice: cachedPriceSelector(state),
    latestPrice: latestPriceSelector(state),
    rawETHPrice: rawETHPriceSelector(state),
    rawSYNTHPrice: rawSYNTHPriceSelector(state),
  };
}

export default connect(mapStateToProps)(OracleCard);
