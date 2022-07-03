---
sidebar_position: 1
---

# 📐 Architecture

### Contracts
#### rep3 Proxy

Proxy contract deployed for every community which points to a upgradeable beacon with implementation contract address

#### Implementation singleton

Implementation ERC721 contract with modifications for membership and other tokens

#### Manager

Factory contract for rep3Token Proxies

#### Router

Forwarder contract for forwarding requests to proxies via ERC2771 forwarder

#### Relayer

rep3 hub uses Biconomy relayers for gas-less transactions

### Token

Token has the following details associated

**type (uint8)**

type | 0 | 1 | 2 | 3 | .. | .. 
--- | --- | --- | --- |--- |--- |--- 
Details | Membership | Contribution | Participation | Appreciation | .. | .. 

**data (uint256)**

Data is divided into 32 slots of uint8, for membership token first slot is level and second is category by default

slot | 0 | 1 | .. | .. 
--- | --- | --- |--- |--- 
Details | Level | Category | .. | .. 

**ownerTokenId (uint256)**

Owner token id the mapping of token (type !=0, i.e. not membership token) to the membership token

**owner (address)**

Owner is ERC721 mapping of token id to address


**tokenUri (string)**

Arweave hash of the metadata file location


### Storage

Protocol uses Arweave for storing metadata associated with tokens





