import React from "react";
import "./App.scss";
import { connect } from "react-redux";
import { loadNetwork } from "./redux/interactions";
import {
  ecosystemSelector,
  metamaskErrorSelector,
  networkProviderSelector,
} from "./redux/selectors";
import { Col, Container, Row, Alert, Form } from "react-bootstrap";
import HealthCard from "./HealthCard";
import OracleCard from "./OracleCard";
import USMCard from "./USMCard";
import FUMCard from "./FUMCard";
import { clearMetamaskError, ecosystemChanged } from "./redux/actions";
import ecosystems from './tokens'

const App = ({ dispatch, networkProvider, metamaskError, ecosystem }) => {
  if (!networkProvider) {
    loadNetwork(dispatch, ecosystem);
  }

  const onEcosystemChanged = ({target: { value }}) => {
    dispatch(ecosystemChanged(value))
    loadNetwork(dispatch, ecosystem)
  }

  if (metamaskError) {
    alert(metamaskError.toString());
    dispatch(clearMetamaskError());
  }

  return (
    <div className="App">
      <Container>
        <Alert variant="info">
          This is a test of a USM fork using DIA oracles to synthetize SPICE, WBTC and USDC,
          and it only works on kovan.
        </Alert>
        <Row>
          <Col sm="12">
            <Form>
              <Form.Group>
                <Form.Label>Select synthetic ecosystem</Form.Label>
                <Form.Control
                  as="select"
                  value={ecosystem}
                  onChange={onEcosystemChanged}
                >
                  {Object.keys(ecosystems).map(key => (<option>{key}</option>))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="6">
            <HealthCard />
          </Col>
          <Col sm="12" md="6">
            <OracleCard />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="6">
            <USMCard />
          </Col>
          <Col sm="12" md="6">
            <FUMCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    networkProvider: networkProviderSelector(state),
    metamaskError: metamaskErrorSelector(state),
    ecosystem: ecosystemSelector(state)
  };
}

export default connect(mapStateToProps)(App);
