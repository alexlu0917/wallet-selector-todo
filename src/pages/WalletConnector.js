import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import Spinner from "react-bootstrap/Spinner";

import { connectorsData } from "../utils/connector";
// import { useEagerConnect, useInactiveListener } from "../utils/hooks";

import bagIcon from "../assets/icon/bag_icon.png";
import WalletButton from "../components/WalletButton";

const WalletConnector = () => {
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  const [currentConnector, setCurrentConnector] = useState();

  useEffect(() => {
    if (currentConnector && currentConnector === connector) {
      setCurrentConnector(undefined);
    }
  }, [connector, currentConnector]);

  // const triedEager = useEagerConnect();

  // useInactiveListener(!triedEager || !!currentConnector);

  const [provider, setProvider] = useState();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleConnect = async (selectedConnector, name) => {
    setLoading(true);

    // if (connector && connector === selectedConnector) {
    //   console.log(active, "acitve");
    //   if (active) {
    //     alert("next page");
    //     setLoading(false);
    //   }
    // }
    // if (!selectedConnector) return;

    try {
      await activate(selectedConnector);
      let { provider } = await selectedConnector.activate();
      setProvider(provider);
      setName(name);
      setCurrentConnector(selectedConnector);
      // let web3 = new Web3(provider);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.code === -32002) {
        alert("Please check your Wallet. Need to connect your wallet.");
      }
      if (error instanceof NoEthereumProviderError) {
        return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
      } else if (error instanceof UnsupportedChainIdError) {
        return "You're connected to an unsupported network.";
      } else if (
        error instanceof UserRejectedRequestErrorInjected ||
        error instanceof UserRejectedRequestErrorFrame
      ) {
        return "Please authorize this website to access your Ethereum account.";
      } else {
        return "An unknown error occurred. Check the console for more details.";
      }
    }
  };

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error ) {
      const handleChainChanged = chainId => {
        setLoading(false);
        console.log("chainChanged", chainId);
        activate(currentConnector);
      };

      const handleAccountsChanged = accounts => {
        setLoading(false);
        console.log("accountsChanged", accounts);
        if (accounts.length > 0) {
          activate(currentConnector);
        }
      };

      const handleNetworkChanged = networkId => {
        setLoading(false);
        console.log("networkChanged", networkId);
        activate(currentConnector);
      };

      const handleConnectorChanged = () => {
        setLoading(false);
        console.log("Web3ReactUpdate", name);
        activate(currentConnector);
      };

      // ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      // ethereum.on("networkChanged", handleNetworkChanged);
      ethereum.on("Web3ReactUpdate", handleConnectorChanged);

      return () => {
        if (ethereum.removeListener) {
          // ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          // ethereum.removeListener("networkChanged", handleNetworkChanged);
          ethereum.removeListener("Web3ReactUpdate", handleConnectorChanged);
        }
      };
    }
  }, [active, error, activate]);

  return (
    <div className="main-container">
      <div className="wallet-connector main-card">
        {!loading && (
          <>
            <div>
              <div className="select-wallet">
                <span>
                  <img src={bagIcon} />
                </span>
                <h2>Select a Wallet</h2>
              </div>
            </div>
            <div className="pt-20 w-100">
              <h3>Please Select a wallet to connect to this dapp:</h3>
              <div className="wallet-container w-100 d-flex flex-wrap">
                {Object.values(connectorsData).map((item, index) => (
                  <WalletButton
                    icon={item.icon}
                    walletName={item.name}
                    key={index}
                    connector={item.connector}
                    handleConnect={handleConnect}
                  />
                ))}
              </div>
            </div>
            <div className="pt-20 d-flex justify-content-center">
              <button className="btn rounded-border">Show More</button>
            </div>
          </>
        )}
        {loading && (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status"></Spinner>
            <span className="m-3">Connecting {name ? name : ""}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletConnector;
