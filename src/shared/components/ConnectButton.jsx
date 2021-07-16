import React, { useEffect } from 'react';
import { Button } from "react-bootstrap";
import { loadMetamask } from "../../redux/interactions";
import { useDispatch, useSelector } from 'react-redux';
import { metamaskSelector } from "../../redux/selectors";

export function ConnectButton(props) {
  const dispatch = useDispatch();
  const connect = (e) => {
    loadMetamask(dispatch);
  };

  const metamaskConnected = useSelector((state) => {
    const metamask = metamaskSelector(state);
    return metamask != null;
  }); 
  useEffect(() => {
    if (metamaskConnected) {

    }
  }, [metamaskConnected])

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
