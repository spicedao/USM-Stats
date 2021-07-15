import React, {
  useState,
  useEffect,
} from 'react';
import { Button as BootstrapButton } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export function OperationButton(props) {
  const {
    variant,
    label,
  } = props;

  const [triggeredConfirmAlert, setTriggeredConfirmAlert] = useState(false);
  const onConfirmAlert = () => {
    setTriggeredConfirmAlert(true);
  }
  useEffect(() => {
    if (triggeredConfirmAlert) {
      const request = async () => {
        confirmAlert(
          await popupOptions(
            props.convertFunction,
            props.amount,
            props.coinUnit,
            props.operationCallback
          )
        );
        setTriggeredConfirmAlert(false);
      };
      request();
    }
  }, [triggeredConfirmAlert, props]);

  return (
    <BootstrapButton
      onClick={onConfirmAlert}
      variant={variant}
      size="sm"
      className="float-right ml-1"
    >
      {label}
    </BootstrapButton>
  );
}

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
        <div className='text-dark'>
          <h1>You would receive { amountConverted + coinUnit }</h1>
          <p>Do you want to proceed?</p>
          <BootstrapButton
            onClick={() => {
              callback(amount);
              onClose();
              clearTimeout(timerId);
            }}
          >
            Yes
          </BootstrapButton>
          <BootstrapButton 
            onClick={() => {
              onClose();
              clearTimeout(timerId);
            }
          } >No</BootstrapButton>
        </div>
      );
    }
  }
};