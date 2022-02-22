import React from "react";
import metamaskIcon from "../assets/icon/metamask_icon.png";
import trezorIcon from "../assets/icon/Trezer.png";
import ledgerIcon from "../assets/icon/ledger.png";
import frameIcon from "../assets/icon/frame_icon.png";
import { InjectedConnector } from "@web3-react/injected-connector";
// import { NetworkConnector } from "@web3-react/network-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
// import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";
import { TrezorConnector } from "@web3-react/trezor-connector";
import { FrameConnector } from "@web3-react/frame-connector";
// import { FortmaticConnector } from "@web3-react/fortmatic-connector";
// import { PortisConnector } from "@web3-react/portis-connector";
// import { SquarelinkConnector } from "@web3-react/squarelink-connector";
// import { TorusConnector } from "@web3-react/torus-connector";
// import { AuthereumConnector } from "@web3-react/authereum-connector";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/c39b079d3fe54424b88c3acda6eb53c6",
  4: "https://rinkeby.infura.io/v3/c39b079d3fe54424b88c3acda6eb53c6",
  42: "https://kovan.infura.io/v3/c39b079d3fe54424b88c3acda6eb53c6"
};

export const injected = new InjectedConnector({
  // mainnet, rinkeby. kovan
  supportedChainIds: [1, 4, 42]
});

// export const network = new NetworkConnector({
//   urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
//   defaultChainId: 1,
//   pollingInterval: POLLING_INTERVAL
// });

// export const walletconnect = new WalletConnectConnector({
//   rpc: { 1: RPC_URLS[1] },
//   bridge: "https://bridge.walletconnect.org",
//   qrcode: true,
//   pollingInterval: POLLING_INTERVAL
// });

// export const walletlink = new WalletLinkConnector({
//   url: RPC_URLS[1],
//   appName: "web3-react example"
// });

export const ledger = new LedgerConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL
});

export const trezor = new TrezorConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: "dummy@abc.xyz",
  manifestAppUrl: "https://8rg3h.csb.app/"
});

export const frame = new FrameConnector({ supportedChainIds: [1] });

// export const fortmatic = new FortmaticConnector({
//   apiKey: "pk_live_F95FEECB1BE324B5",
//   chainId: 1
// });

// export const portis = new PortisConnector({
//   dAppId: "211b48db-e8cc-4b68-82ad-bf781727ea9e",
//   networks: [1, 100]
// });

// export const squarelink = new SquarelinkConnector({
//   clientId: "5f2a2233db82b06b24f9",
//   networks: [1, 100]
// });

// export const torus = new TorusConnector({ chainId: 1 });

// export const authereum = new AuthereumConnector({ chainId: 42 });

export const connectorsData = {
  metamask: {
    icon: metamaskIcon,
    connector: injected,
    name: "MetaMask",
  },
  frame: {
    icon: frameIcon,
    connector: frame,
    name: "Frame",
  },
  trezer: {
    icon: trezorIcon,
    connector: trezor,
    name: "Trezor",
  },
  ledger: {
    icon: ledgerIcon,
    connector: ledger,
    name: "Legder",
  },
};