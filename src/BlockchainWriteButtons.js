import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const BlockchainWriteButtons = ({ metamaskConnected, ethToUsm, buy, sell, connect, buttonLabel, buyLabel, sellLabel }) => {
  const [amount, setAmount] = useState(0);
  let timeoutId = null;
  
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
          onClick={async () => confirmAlert(await popupOptions(ethToUsm, amount, "usm", "You would receive ", "Do you want to proceed?", buy))}
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

const popupOptions = async (ethToUsm, amount, coinUnit, title, message, callback) => {
  const usm = await ethToUsm(amount);
  return {
    customUI: ({ onClose }) => {
      setTimeout(() => {
        onClose();
      }, 10000);
      return (
        <div className='text-dark'>
          <h1>{ title + usm + coinUnit }</h1>
          <p>Do you want to proceed?</p>
          <Button onClick={onClose} >No</Button>
          <Button
            onClick={() => {
              callback(amount);
              onClose();
            }}
          >
            Yes
          </Button>
        </div>
      );
    }
  }
};

const handleYes = (callback, amount) => {
  callback(amount);
}

export default BlockchainWriteButtons;
