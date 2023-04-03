---
sidebar_position: 3
---

# SDK (v1.5)

Digital communities have been around for [decades](https://twitter.com/rep3gg/status/1630518917197357056), and blockchains and blockchain-based applications have only expanded their possibilities. Communities increasingly use these applications today to transfer value, create art, denote membership, and more.

As a result, running a digital community takes a lot of work. There are many moving parts, and the operational work can sometimes overshadow everything else. At rep3, we set out to address this, and built a protocol that simplifies workflows and incentivizes participation in a way that scales with your community.

The rep3 SDK is a convenient way for developers to include rep3's core functionality in their products or tools. This tutorial walks you through our SDK by creating a sample community management tool using React.

Let's begin!

## Prerequisites
To successfully follow this tutorial, you must have Node.js `v16.14.0` or higher. We recommend installing Node using either [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm). You must also have the MetaMask browser extension in your browser to follow this tutorial.

A familiarity with [React.js](https://reactjs.org/docs/getting-started.html) (a web application framework) and [Ethers.js](https://docs.ethers.org/v5/getting-started/) (an Ethereum web client library) is a big plus, as these are extensively referenced below.

## Tutorial Flow

### Creating a Community 
Each community that uses the rep3 protocol has a contract that manages badges' creation, distribution, and movement. To deploy this contract, we need the community's name and token symbol (to fulfill ERC721 specifications). So, we need to create a way for the user to input this information and then deploy their community's contract. 

(You can read more about the deploy function of the rep3 protocol [here](https://github.com/Drepute/rep3-sdk#-register-a-new-community-on-rep3-deploy-a-new-erc-721-contract).)

NOTE: Make sure you have some [testnet $MATIC](https://faucet.polygon.technology/) to deploy the contract successfully!

### Creating Badge Vouchers
After deploying your community, you should distribute membership badges to your community members. Since rep3 badges are consent-preserving, you cannot directly mint a badge to a member's address. They must claim their badge first to trigger the minting process.

All badges are claimed against their specific voucher. To create a badge voucher, you need the contract address (of the community), the level and category (of the badge they will receive), and the tokenURI (which is an IPFS or Arweave link to the asset that will be used on the badge).

(You can read more about the voucher creation function of the rep3 protocol [here](https://github.com/Drepute/rep3-sdk#1-approve-membership-badge).)

NOTE: The rep3 protocol supports many badge assets like `.png`, `.mp4`, `.jpeg`, `.gif`, etc.

### Claiming Badges
After membership badge vouchers are created, members will have the option to claim or reject the badge. Those interested in claiming the badge can call the membership badge claiming function.

This function takes the contract address, signed voucher, and the claimer address index (in the signed voucher) as its parameters.

(You can read more about the membership badge claiming function of the rep3 protocol [here](https://github.com/Drepute/rep3-sdk#2-claim-membership).)

## Getting Started

### 1. Setting up our project
To start, we need to create a new React.js app. 

To do so, open your terminal and run the following commands:

```jsx
npx create-react-app community-tool
cd community-tool
yarn start
```

We must install the dependencies using a package manager like `npm`, `yarn`, or `pnpm`. 

A key dependency of our project is the [Ethers.js](https://docs.ethers.org/v5/getting-started/) library which lets applications interact with EVM-compatible blockchains.

Change into a new directory and run the following commands:

```jsx
yarn add ethers
```

### 2. Building our frontend
The first order of action is defining a layout. At the least, we need a connect wallet screen (that handles interactions with the browser wallet) and a community dashboard screen (where users interact with the rep3 protocol and its getter functions).

To build our connect wallet screen, open `App.js` and paste the following code:

```jsx
import "./App.css";
import ConnectWallet from "./pages/ConnectWallet";
import { useState } from "react";
import CommunityDashboardScreen from "./pages/CommunityDashboardScreen";
import {
  getCommunityFromTxHash,
  getMembershipFromContract,
  initializeSDK,
} from "./pages/utils/Rep3SDKFunctions";
import { ethers } from "ethers";

function App() {
  const [loggedUser, setLoggedUser] = useState(false);
  const [community, setCommunity] = useState([]);
  const [membership, setMembership] = useState([]);

  const onConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log(accounts);
        setLoggedUser(accounts);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await initializeSDK(provider.getSigner(), window.ethereum);

        console.log("here initialized started !!");
        const res = await getCommunityFromTxHash(
          "0x04021dc68222d85dee9183bf430c591ee52039f5d16eed49facf998d20a60d2b"
        );
        console.log(res.data.daos);
        setCommunity(res.data.daos);
        const members = await getMembershipFromContract(res.data.daos[0].id);
        console.log(members.data.membershipNFTs);
        setMembership(members.data.membershipNFTs);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="App">
      {loggedUser ? (
        <CommunityDashboardScreen
          membership={membership}
          community={community}
          address={loggedUser}
        />
      ) : (
        <ConnectWallet
          onConnectBtnPress={async () => await onConnectWallet()}
        />
      )}
    </div>
  );
}

export default App;
```

To build our community dashboard screen, open `page/ConnectWallet/index.js` and paste the following code:

```jsx
import React from "react";
import styles from "./styles"
const ConnectWallet = ({ onConnectBtnPress }) => {
  const pageHeader = () => (
    <div
      style={styles.dashboard}
    >
      <div
        style={styles.header}
      >
        Community3
      </div>
      <div
        style={styles.twitter}
      >
        twiiter
      </div>
    </div>
  );

  return (
    <div
      style={styles.header}
    >
      {/* left side content of the connect wallet screen */}
      <div
        style={styles.page}
      >
        {pageHeader()}
        <div
          style={styles.gm}
        >
          gm!
        </div>
        <div
          style={styles.description}
        >
          Welcome to this tutorial. Today we will create a sample web app using the rep3 SDK.
        </div>
      </div>
      <div
        style={styles.btn}
      >
        <div
          style={styles.started}
        >
          Get Started
        </div>
        <div
          style={styles.btn}
          onClick={async () => await onConnectBtnPress()}
        >
          <div
            style={styles.connect}
          >
            Connect wallet
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
```

### 3. Adding the SDK functions
Run the following command in the directory that stores dependencies.

```jsx
yarn add @rep3/rep3-sdk
```

Next, open `utils/Rep3SDKFunctions.js`, and paste the following code:

```jsx
import Rep3, { Getters } from "@rep3/rep3-sdk";

const configObject = {
  testnet: {
    chainId: 80001,
    contractAddressConfig: {
      manager: "0xf00eAbb380752fed6414f3C12e3D8F976C7D024d",
      beacon: "0xDcc7133abBA15B8f4Bf155A372C17744E0941f28",
      router: "0x1C6D20042bfc8474051Aba9FB4Ff85880089A669",
    },
  },
  mainnet: {
    chainId: 137,
    contractAddressConfig: {
      manager: "0xDA6F4387C344f1312439E05E9f9580882abA6958",
      beacon: "0x083842b3F6739948D26C152C137929E0D3a906b9",
      router: "0xB9Acf5287881160e8CE66b53b507F6350d7a7b1B",
    },
  },
};

let rep3;
const rep3Getter = new Getters(
  "https://api.thegraph.com/subgraphs/name/eth-jashan/rep3-mumbai"
);
export const initializeSDK = async (signer, provider) => {
  rep3 = new Rep3(
    signer,
    provider,
    configObject.testnet.chainId,
    configObject.testnet.contractAddressConfig
  );

  return await rep3.createInstance();
};

export const deployNewCommunity = async (
  name,
  symbol,
  approversList,
  successCallback
) => {
  console.log(name, symbol, approversList);
  rep3.deploy(
    name,
    symbol,
    approversList,
    (x) => console.log("Transaction added to block", x),
    (x) => successCallback(x)
  );
};

export const createMembershipVoucher = async (
  address,
  levels,
  categories,
  to,
  tokenUri
) => {
  try {
    const res = await rep3.createMembershipVoucher(
      address,
      levels,
      categories,
      to,
      tokenUri
    );
    console.log(JSON.stringify(res));
    return JSON.stringify(res);
  } catch (error) {
    throw error;
  }
};

export const claimMembershipVoucher = async (
  contractAddress,
  voucher,
  approvedAddressIndex,
  signType = "signTypedDatav2.0",
  gas,
  gasLimit,
  transactionHashCallback,
  callbackFunction
) => {
  console.log(contractAddress, voucher, approvedAddressIndex);
  try {
    await rep3.claimMembership(
      contractAddress,
      eval(voucher),
      approvedAddressIndex,
      signType,
      gas,
      gasLimit,
      transactionHashCallback,
      callbackFunction
    );
  } catch (error) {
    throw error;
  }
};

export const upgradeMembership = async (
  contractAddress,
  tokenId,
  level,
  category,
  metaDataHash,
  gas,
  gasLimit,
  transactionHashCallback,
  callbackFunction
) => {
  await rep3.upgradeMembership(
    contractAddress,
    tokenId,
    level,
    category,
    metaDataHash,
    gas,
    gasLimit,
    transactionHashCallback,
    callbackFunction
  );
};

export const getCommunityFromTxHash = async (txHash) => {
  return await rep3Getter.getForCustomQuery(
    `query($txHash: String) {
    daos(where:{txHash:$txHash}){
      id
      txHash
      name
      symbol
      totalSupply
    }
  }`,
    { txHash }
  );
};

export const getMembershipFromContract = async (contractAddress) => {
  return await rep3Getter.getForCustomQuery(
    `query($contractAddress:String ) {
      membershipNFTs(where:{contractAddress:$contractAddress}){
        id
        metadataUri
        level
        category
        claimer
        contractAddress{
          id
          txHash
          name
          symbol
        }
        tokenID
      }
    }`,
    { contractAddress }
  );
};
```

Finally, open `pages/CommunityDashboardScreen/index.js` and paste the following code:

```jsx
import React, { useState } from "react";
import {
  claimMembershipVoucher,
  createMembershipVoucher,
  deployNewCommunity,
} from "../utils/Rep3SDKFunctions.js";
import { Button, List, Typography } from "antd";

const { Paragraph, Title } = Typography;

const CommunityDashboardScreen = ({ address, community, membership }) => {
  const [route, setRoute] = useState("create");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [level, setLevel] = useState();
  const [tokenUri, setTokenUri] = useState();
  const [to, setTo] = useState();
  const [approverIndex, setApproverIndex] = useState(0);
  const [voucher, setVoucher] = useState();
  const [members, setMembers] = useState(membership || []);

  console.log("membersss", members, membership);

  const routerHeader = () => (
    <div
      style={styles.router}
    >
      <div
        style={styles.voucher}
        onClick={() => setRoute("create")}
      >
        Create Members Voucher
      </div>
      <div
        style={styles.joined}
        onClick={() => setRoute("claim")}
      >
        Joined Members
      </div>
    </div>
  );

  const dashboardHeader = () => (
    <div
      style={styles.div}
    >
      <div
        style={styles.dambo}
      >
        TestDAO
      </div>
      <div
        style={styles.address}
      >
        {address}
      </div>
    </div>
  );

  const daoDeployOverlay = () => (
    <div
      style={styles.overLay}
    >
      <div
        style={styles.heading}
      >
        Let's deploy a community first
      </div>
      <input
        onChange={(e) => setName(e.target.value)}
        placeholder= "Community Name"
        style={{ marginTop: 20, height: 40, width: "70%"}}
      />
      <input
        placeholder= "Community Symbol"
        onChange={(e) => setSymbol(e.target.value)}
        style={{ margin: 20, height: 40, width: "70%"}}
      />
      <input
        placeholder= "Approvers"
        disabled
        value={address}
        style={{ marginBottom: 20, height: 40, width: "70%"}}
      />
      <div
        style={style.btn}
      >
        <div
          onClick={async () =>
            deployNewCommunity(
              name,
              symbol,
              address,
              (x) => console.log(x),
              (x) => console.log(x)
            )
          }
          style={style.heading}
        >
          Deploy a new community
        </div>
      </div>
    </div>
  );

  const createVoucher = () => (
    <div style={{ width: "70%" }}>
      <div
        style={style.community}
      >
        Let's approve a member for community
      </div>
      <input
        placeholder= "Community Level"
        value={community[0]?.id}
        disabled
        style={{ marginTop: 20, height: 40, width: "70%"}}
      />
      <input
        onChange={(e) => setLevel(e.target.value)}
        placeholder= "Community Level"
        value={level}
        style={{ marginTop: 20, height: 40, width: "70%"}}
      />
      <input
        placeholder= "Member Address"
        onChange={(e) => setTo(e.target.value)}
        style={{ margin: 20, height: 40, width: "70%"}}
        value={to}
      />
      <input
        placeholder= "Token Uri"
        value={tokenUri}
        onChange={(e) => setTokenUri(e.target.value)}
        style={{ marginBottom: 20, height: 40, width: "70%"}}
      />
      <div
        style={style.membershipVoucher}
      >
        <div
          onClick={async () => {
            const res = await createMembershipVoucher(
              community[0]?.id,
              [level],
              [0],
              [to],
              `${tokenUri},`
            );
            setVoucher(res);
          }}
          style={style.helperText}
        >
          Create membership voucher
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Title level={3}>Copy voucher to claim membership</Title>
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: true,
            symbol: "more",
          }}
        >
          {voucher}
        </Paragraph>
      </div>
    </div>
  );

  const claimVoucher = () => (
    <div style={{ width: "70%" }}>
      <div
        style={styles.claimTitle}
      >
        Let's claim a voucher for membership
      </div>
      <input
        placeholder= "Community Level"
        value={community[0]?.id}
        disabled
        style={{ marginTop: 20, height: 40, width: "70%"}}
      />
      <input
        onChange={(e) => setLevel(e.target.value)}
        placeholder= "Voucher Object"
        value={voucher}
        style={{ marginTop: 20, height: 40, width: "70%"}}
      />
      <input
        placeholder= "Approver Index"
        onChange={(e) => setApproverIndex(e.target.value)}
        style={{ margin: 20, height: 40, width: "70%"}}
        value={approverIndex}
      />

      <div
        style={styles.claimBtn}
      >
        <div
          onClick={async () => {
            await claimMembershipVoucher(
              community[0]?.id,
              voucher,
              approverIndex,
              "signTypedDatav2.0",
              1e7,
              1e7,
              (x) => console.log(x),
              (x) => console.log(x)
            );
          }}
          style={styles.claimTitle}
        >
          Claim membership voucher
        </div>
      </div>

      <div
        style={style.felx}
      >
        <Title level={3}>Copy voucher to claim membership</Title>
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: true,
            symbol: "more",
          }}
        >
          {voucher}
        </Paragraph>
      </div>
    </div>
  );

  const memeberList = () => (
    <List
      header={<div>List of Members</div>}
      footer={<div>{membership.length} members</div>}
      bordered
      dataSource={membership}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text mark>{item.claimer}</Typography.Text>
          <Button
            style={{ background: "#734BFF", marginLeft: "16px" }}
            type= "primary"
          >
            Update Membership
          </Button>
        </List.Item>
      )}
    />
  );

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {community.length === 0 && daoDeployOverlay()}
      {dashboardHeader()}
      {routerHeader()}
      {route === "claim"? claimVoucher() : createVoucher()}
      {route === "claim" && memeberList()}
    </div>
  );
};

export default CommunityDashboardScreen;
```

NOTE: The callback functions are only called when the package is initiated with Biconomy. This enables gasless, network-agnostic transactions. If you would like to implement this in your project, please come and say hi in our [Discord server](http://discord.gg/xK2WXUv3VG). We will be more than happy to help!

## Conclusion
In this tutorial, we covered a portion of rep3's functionality: deploying your community on the blockchain and distributing membership badges to your members. These are the building blocks of the rep3 protocol, and we also use this SDK in our web application.

You can view the final source code of this project [here](https://github.com/Drepute/rep3-sdk-example).

For design inspiration (or to see what is possible), feel free to create your test community and play around with it [on the rep3 app](https://app.rep3.gg/). Lastly, do follow us on [Twitter](https://twitter.com/rep3gg/) for more updates, and as always, you are more than welcome in our [Discord server](http://discord.gg/xK2WXUv3VG) anytime!