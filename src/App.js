import React, { useEffect } from "react";
import "./App.scss";
import { connect } from "react-redux";
import { loadNetwork } from "./redux/interactions";
import {
  ecosystemSelector,
  networkProviderSelector,
  metamaskSignerSelector,
  metamaskSelector,
} from "./redux/selectors";
import { Col, Container, Row, Alert, Form } from "react-bootstrap";
import HealthCard from "./HealthCard";
import OracleCard from "./OracleCard";
import USMCard from "./USMCard";
import FUMCard from "./FUMCard";
import {
  ecosystemChanged,
  allowanceLoaded,
} from "./redux/actions";
import { getNetwork } from "./blockchainInteractions";
import ecosystems from './ecosystems';
import { ethers } from 'ethers';

const App = ({
  dispatch,
  networkProvider,
  metamaskSigner,
  metamaskConnected,
  ecosystem
}) => {
  if (!networkProvider) {
    loadNetwork(dispatch, ecosystem);
  }

  const onEcosystemChanged = ({target: { value }}) => {
    dispatch(ecosystemChanged(value))
    loadNetwork(dispatch, value)
  }

  useEffect(() => {
    if (metamaskConnected) {
      const request = async () => {
        const network = await getNetwork();
        const erc20ContractInfo = ecosystems[ecosystem].usm;
        const erc20abi = erc20ContractInfo.abi;
        const erc20ContractAddress = erc20ContractInfo.address[network.chainId];
        try {
          const erc20Contract = new ethers.Contract(
            erc20ContractAddress,
            erc20abi,
            metamaskSigner
          );
          const addresses = await window.ethereum.request({
            method: 'eth_accounts'
          });
          const address = addresses[0];
          const allowance = await erc20Contract.allowance(
            address, // 0x0a4f3e05e9f4c84a3891fb349c5fe463b65b9df7
            erc20ContractAddress // 0x790A0e77EF04ccEc4c79E10cbf5e8810F756C017
          );
          console.log(allowance)
          dispatch(allowanceLoaded(allowance, erc20Contract, address));
        } catch(error) {
          console.log(error);
        }
      };
      request();
    }
  }, [
    metamaskConnected,
    metamaskSigner,
    ecosystem,
    dispatch
  ]);

  return (
    <div className="App">
      <Container>
        <Alert variant="info">
          This is a test of a USM fork using DIA oracles to synthetize any asset,
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
    ecosystem: ecosystemSelector(state),
    metamaskSigner: metamaskSignerSelector(state),
    metamaskConnected: metamaskSelector(state) !== null,
  };
}

export default connect(mapStateToProps)(App);
