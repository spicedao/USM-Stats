import { Component } from "react";
import { connect } from "react-redux";
import {
  medianPriceSelector,
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
      medianPrice,
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
                  backgroundColor: oracleHighlight(coingeckoETHPrice, medianPrice),
                }}
              >
                <td>Medianized Oracle</td>
                <td>$ {decimalPlaces(medianPrice)}</td>
              </tr>
              <tr>
                <th colSpan={2}>Median Sources</th>
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
    medianPrice: medianPriceSelector(state),
  };
}

export default connect(mapStateToProps)(OracleCard);
