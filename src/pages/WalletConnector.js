import React from "react";
import { injected, frame } from "../utils/connector";
import bagIcon from "../assets/icon/bag_icon.png";
import metamaskIcon from "../assets/icon/metamask_icon.png";
import trezerIcon from "../assets/icon/Trezer.png";
import ledgerIcon from "../assets/icon/ledger.png";
import frameIcon from "../assets/icon/frame_icon.png";
import WalletButton from '../components/WalletButton';

const WalletConnector = () => {
  return (
    <div className="main-container">
      <div className="wallet-connector main-card">
        <div>
          <div className="select-wallet">
            <span>
              <img src={bagIcon} />
            </span>
            <h2>Select a Wallet</h2>
          </div>
        </div>
        <div className="pt-20">
          <h3>Please Select a wallet to connect to this dapp:</h3>
          <div className="wallet-container">
            <div className="row">
                <WalletButton icon={metamaskIcon} walletName='MetaMask' connector={injected} />
                <WalletButton icon={frameIcon} walletName='Frame' connector={frame}/>
            </div>
            <div className="row">
                <WalletButton icon={trezerIcon} walletName='Trezer' />
                <WalletButton icon={ledgerIcon} walletName='Ledger' />
            </div>
          </div>
        </div>
        <div className="pt-20 d-flex justify-content-center">
            <button className="btn rounded-border">Show More</button>
        </div>
      </div>
    </div>
  );
};

export default WalletConnector;
