import { Component } from 'react';
import { connect } from 'react-redux';
import { coingeckoETHPriceSelector, usmCollateralSelector, usmDebtRatioSelector, usmEthBufferSelector } from './redux/selectors';
import { Button, Card, Table } from 'react-bootstrap';
import { debtRatioHighlight, decimalPlaces, toPercentage } from './utils';

class HealthCard extends Component {
  render () {

    const {usmCollateral, usmCollateralUSD, usmDebtRatio, usmEthBuffer, usmEthBufferUSD} = this.props;

    return (
      <Card>
        <Card.Header as="h5">
          Protocol Health
        </Card.Header>
        <Card.Body>
          <Table striped hover size="sm">
            <tbody>
              <tr>
                <td>Total Collateral</td>
                <td>Ξ {decimalPlaces(usmCollateral)}</td>
                <td>$ {decimalPlaces(usmCollateralUSD)}</td>
              </tr>
              <tr>
                <td>Buffer</td>
                <td>Ξ {decimalPlaces(usmEthBuffer)}</td>
                <td>$ {decimalPlaces(usmEthBufferUSD)}</td>
              </tr>
              <tr className="text-dark" style={{backgroundColor: debtRatioHighlight(usmDebtRatio)}}>
                <td>Debt Ratio</td>
                <td></td>
                <td>{toPercentage(usmDebtRatio)} %</td>
              </tr>                  
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  const coingeckoETHPrice = coingeckoETHPriceSelector(state)
  const usmCollateral = usmCollateralSelector(state)
  const usmCollateralUSD = usmCollateral * coingeckoETHPrice
  const usmEthBuffer = usmEthBufferSelector(state)
  const usmEthBufferUSD = usmEthBuffer * coingeckoETHPrice
  return {
    coingeckoETHPrice,
    usmCollateral,
    usmCollateralUSD,
    usmEthBuffer,
    usmEthBufferUSD,
    usmDebtRatio: usmDebtRatioSelector(state),
  }
}

export default connect(mapStateToProps)(HealthCard);

