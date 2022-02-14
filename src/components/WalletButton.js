import React from "react";
import Web3 from "web3";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";

const WalletButton = ({ icon, walletName, connector = "" }) => {
  const context = useWeb3React();
  const {
    // connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  const handleConnect = async () => {
    console.log('click', 'metamask')
    // read-only
    // let web3 = new Web3.providers.HttpProvider(process.env.API_ENDPOINT);
    await activate(connector);
    let { provider } = await connector.activate();
    // // signer
    let web3 = new Web3(provider);
  };

  return (
    <div className="wallet-button col" onClick={(e) => handleConnect()}>
      <span>
        <img src={icon} />
      </span>
      {walletName}
    </div>
  );
};

export default WalletButton;
