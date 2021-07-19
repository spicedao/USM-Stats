import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { erc20ContractSelector, addressSelector, usmContractAddressSelector } from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { maximumApprove } from '../../utils';

export function ApproveButton(props) {
  const dispatch = useDispatch();
  const erc20Contract = useSelector(erc20ContractSelector);
  const usmContractAddress = useSelector(usmContractAddressSelector);
  const address = useSelector((state) => addressSelector(state));

  const [approve, setApprove] = useState(false);
  const onApprove = () => {
    setApprove(true);
  };

  useEffect(() => {
    if (approve) {
      const request = async () => {
        try {
          console.log(usmContractAddress);
          const result = await erc20Contract.approve(usmContractAddress, maximumApprove);
          console.log(result);
        } catch (e) {
          alert(e.message);
          setApprove(false);
        }
      };
      request();
    }
  }, [approve, address, erc20Contract]);

  return (
    <Button
      onClick={onApprove}
      variant="success"
      size="sm"
      className="float-right ml-1"
    >
      Approve
    </Button>
  );
}
