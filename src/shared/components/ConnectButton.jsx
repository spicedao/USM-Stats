import React, { useEffect } from 'react';
import { Button } from "react-bootstrap";
import { loadMetamask } from "../../redux/interactions";
import { useDispatch, useSelector } from 'react-redux';
import { metamaskSelector } from "../../redux/selectors";
import { getNetwork } from "../../blockchainInteractions";
import ecosystems from '../../ecosystems';

export function ConnectButton(props) {
  const dispatch = useDispatch();
  const connect = (e) => {
    loadMetamask(dispatch);
  };

  const metamaskConnected = useSelector((state) => {
    const metamask = metamaskSelector(state);
    return metamask != null;
  }); 

  const setAllowance = useSelector((state) => {

  })

  useEffect(() => {
    if (metamaskConnected) { 
      const network = getNetwork()
      const erc20ContractInfo = ecosystems[ecosystem].usmview;
      const erc20abi = erc20ContractInfo.abi
      const erc20ContractAddress = erc20ContractInfo.address[network.chainId]
      const erc20Contract = new ethers.Contract(erc20ContractInfo, erc20abi, signer)
      try {
        const usm = await erc20Contract.allowance(signer, erc20ContractAddress);
      } catch(error) {
        dispatch(metamaskError(error));
      }
    
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
