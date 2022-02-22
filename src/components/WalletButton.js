import React from "react";

const WalletButton = ({ icon, walletName, handleConnect, connector = "" }) => {

  return (
    <div className="wallet-button col-md-6" onClick={(e) => handleConnect(connector, walletName)}>
      <span>
        <img src={icon} />
      </span>
      {walletName}
    </div>
  );
};

export default WalletButton;
