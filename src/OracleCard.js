import { Component } from "react";
import { connect } from "react-redux";
import {
  cachedPriceSelector,
  latestPriceSelector,
  rawSYNTHPriceSelector,
  rawETHPriceSelector,
  ecosystemSelector,
  coingeckoETHPriceSelector,
  coingeckoSYNTHPriceSelector,
  coingeckoPriceSelector,
} from "./redux/selectors";
import { Card, Table } from "react-bootstrap";
import { decimalPlaces, oracleHighlight } from "./utils";
import ecosystems from "./ecosystems";

class OracleCard extends Component {
  render() {
    const {
      coingeckoETHPrice,
      coingeckoSYNTHPrice,
      coingeckoPrice,
      cachedPrice,
      synthName,
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
                <td>Coingecko - Tether</td>
                <td>$ {decimalPlaces(coingeckoETHPrice)}</td>
              </tr>
              <tr>
                <td>Coingecko - {synthName}</td>
                <td>$ {decimalPlaces(coingeckoSYNTHPrice)}</td>
              </tr>
              <tr>
                <td>Coingecko - expected price from oracle</td>
                <td>Ξ {decimalPlaces(coingeckoPrice)}</td>
              </tr>
              <tr>
                <th colSpan={2}>{synthName} Tether Price</th>
              </tr>
              <tr
                className="text-dark"
                style={{
                  backgroundColor: oracleHighlight(coingeckoPrice, cachedPrice),
                }}
              >
                <td>Price cached in the contract</td>
                <td>Ξ {decimalPlaces(cachedPrice)}</td>
              </tr>
              <tr
                className="text-dark"
                style={{
                  backgroundColor: oracleHighlight(coingeckoPrice, latestPrice),
                }}
              >
                <td>Price straight from the oracle</td>
                <td>Ξ {decimalPlaces(latestPrice)}</td>
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
                <td>oracle Tether price</td>
                <td>$ {decimalPlaces(rawETHPrice)}</td>
              </tr>
              <tr
                className="text-dark"
                style={{
                  backgroundColor: oracleHighlight(coingeckoSYNTHPrice, rawSYNTHPrice),
                }}
              >
                <td>oracle {synthName} price</td>
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
  const ecosystem =ecosystems[ecosystemSelector(state)]
  return {
    coingeckoETHPrice: coingeckoETHPriceSelector(state),
    coingeckoSYNTHPrice: coingeckoSYNTHPriceSelector(state),
    coingeckoPrice: coingeckoPriceSelector(state),
    synthName: ecosystem && ecosystem.usm && ecosystem.usm.name,
    cachedPrice: cachedPriceSelector(state),
    latestPrice: latestPriceSelector(state),
    rawETHPrice: rawETHPriceSelector(state),
    rawSYNTHPrice: rawSYNTHPriceSelector(state),
  };
}

export default connect(mapStateToProps)(OracleCard);
