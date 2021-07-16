import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const BlockchainWriteButtons = ({ metamaskConnected, buyConvertFunction, sellConvertFunction, buy, sell, connect, buttonLabel, coinUnit, buyLabel, sellLabel }) => {
  const [amount, setAmount] = useState(0);
  
  if (metamaskConnected) {
    return (
      <>
        
        <Button
          onClick={async () => confirmAlert(await popupOptions(sellConvertFunction, amount, "ETH", sell))}
          variant="warning"
          size="sm"
          className="float-right ml-1"
        >
          {sellLabel} ({buttonLabel})
        </Button>
        <Button
          onClick={async () => confirmAlert(await popupOptions(buyConvertFunction, amount, coinUnit, buy))}
          //onClick={() => buy(amount)}
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

const popupOptions = async (convertFunction, amount, coinUnit, callback) => {
  const amountConverted = await convertFunction(amount);
  var timerId = null;
  return {
    customUI: ({ onClose }) => {
      timerId = setTimeout(() => {
        onClose();
        clearTimeout(timerId);
      }, 10000);
      return (
        <>
          { amountConverted != -1 ? 
          <>
            <div className='text-dark'>
              <h1>You would receive { amountConverted + coinUnit }</h1>
              <p>Do you want to proceed?</p>
              <Button
                onClick={() => {
                  callback(amount);
                  onClose();
                  clearTimeout(timerId);
                }}
              >
                Yes
              </Button>
              <Button 
                onClick={() => {
                  onClose();
                  clearTimeout(timerId);
                }
              } >No</Button>
            </div>
          </>
        :
          <>
            <div className='text-dark'>
              <h1>Error</h1>
              <p>This operation with this amount would put the contract underwater</p>
              <Button 
                onClick={() => {
                  onClose();
                  clearTimeout(timerId);
                }
              } >Ok</Button>
            </div>
          </>
        }
        </>
        
      );
    }
  }
};

export default BlockchainWriteButtons;
