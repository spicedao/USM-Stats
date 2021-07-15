import React, { useState } from "react";
import { OperationButton } from './shared/components/OperationButton';
import { Button } from "react-bootstrap";

const BlockchainWriteButtons = ({ metamaskConnected, buyConvertFunction, sellConvertFunction, buy, sell, connect, buttonLabel, coinUnit, buyLabel, sellLabel }) => {
  const [amount, setAmount] = useState(0);

  return (
    <>
      {metamaskConnected ?
      <>
        <OperationButton
          convertFunction={sellConvertFunction}
          amount={amount}
          coinUnit="ETH"
          operationCallback={sell}
          variant="warning"
          label={`${sellLabel} (${buttonLabel})`}
        />
        <OperationButton
          convertFunction={buyConvertFunction}
          amount={amount}
          coinUnit={coinUnit}
          operationCallback={buy}
          variant="success"
          label={`${buyLabel} (ETH)`}
        />
        <input
          style={{ width: 100 }}
          onChange={({ target: { value } }) => setAmount(value)}
          value={amount}
          placeholder="Amount"
          type="number"
          size="sm"
          className="form-control float-right ml-1"
        ></input>
      </>
      :
      <Button
        onClick={connect}
        variant="success"
        size="sm"
        className="float-right ml-1"
      >
        Connect
      </Button>
      }
    </>
  )
};

export default BlockchainWriteButtons;
