import React, { useState } from "react";
import { Button } from "react-bootstrap";

const BlockchainWriteButtons = ({ metamaskConnected, buy, sell, connect, buttonLabel, buyLabel, sellLabel }) => {
  const [amount, setAmount] = useState(0);
  if (metamaskConnected) {
    return (
      <>
        <Button
          onClick={() => sell(amount)}
          variant="warning"
          size="sm"
          className="float-right ml-1"
        >
          {sellLabel} ({buttonLabel})
        </Button>
        <Button
          onClick={() => buy(amount)}
          variant="success"
          size="sm"
          className="float-right ml-1"
        >
          {buyLabel} (ETH)
        </Button>
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
    );
  } else {
    return (
      <Button
        onClick={connect}
        variant="success"
        size="sm"
        className="float-right ml-1"
      >
        Connect
      </Button>
    );
  }
};
export default BlockchainWriteButtons;
