import React from "react";

const WalletButton = ({ icon, walletName }) => {
  return (
    <div className="col">
      <span>
        <img src={icon} />
      </span>
      {walletName}
    </div>
  );
};

export default WalletButton;
