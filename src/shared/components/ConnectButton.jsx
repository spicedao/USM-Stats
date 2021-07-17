import React from 'react';
import { Button } from "react-bootstrap";
import { loadMetamask } from "../../redux/interactions";
import { useDispatch } from 'react-redux';

export function ConnectButton(props) {
  const dispatch = useDispatch();
  const connect = () => {
    loadMetamask(dispatch);
  };

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
