import React, { useState } from "react";
import { OperationButton } from './shared/components/OperationButton';
import { ConnectButton } from './shared/components/ConnectButton';

const BlockchainWriteButtons = ({
  allowanceProcessEnded,
  metamaskConnected,
  buyConvertFunction,
  sellConvertFunction,
  buy,
  sell,
  buttonLabel,
  coinUnit,
  buyLabel,
  sellLabel
}) => {
  const [amount, setAmount] = useState(0);

  return (
    <>
      {allowanceProcessEnded ?
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
      <ConnectButton />
      }
    </>
  )
};

export default BlockchainWriteButtons;
