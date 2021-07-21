import React, { useState } from "react";
import { OperationButton } from './shared/components/OperationButton';
import { ConnectButton } from './shared/components/ConnectButton';
import { ApproveButton } from './shared/components/ApproveButton';

const BlockchainWriteButtons = ({
  ecosystem,
  allowance,
  allowanceLoaded,
  metamaskSigner,
  metamaskConnected,
  buyConvertFunction,
  sellConvertFunction,
  buy,
  sell,
  buttonLabel,
  coinUnit,
  buyLabel,
  sellLabel,
  collateralUnit,
}) => {
  const [amount, setAmount] = useState(0);
  
  return (
    <>
      {allowanceLoaded && allowance.toString() !== "0" &&
      <>
        <OperationButton
          convertFunction={sellConvertFunction}
          amount={amount}
          coinUnit={collateralUnit}
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
          label={`${buyLabel} (${collateralUnit})`}
        />
        <input
          style={{ width: 100 }}
          onChange={({ target: { value } }) => setAmount(value)}
          value={amount}
          placeholder="Amount"
          type="number"
          size="sm"
          className="form-control float-right ml-1"
        />
      </>
      }

      {allowanceLoaded && allowance.toString() === "0" && 
        <ApproveButton />
      }

      {!allowanceLoaded &&
        <ConnectButton />
      }
    </>
  )
};

export default BlockchainWriteButtons;
