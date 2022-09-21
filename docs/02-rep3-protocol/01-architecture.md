---
sidebar_position: 1
---

# Architecture

### Contracts
The rep3 protocol has six contracts.

**1. rep3 Proxy:**
The rep3 proxy contract points to an upgradeable beacon with an implementation contract address. This is deployed for every community.

**2. rep3 Implementation Singleton:**
The Implementation Singleton is an ERC721 contract with modifications for parent (membership) badges and child (contributions, participation or any other) badges.

**3. Manager:**
The Manager is the Factory contract for rep3Token proxies.

**4. Router:**
The Router is the forwarder contract that forwards requests to proxies (via ERC2771).

**5. Relayer:**
The rep3 hub uses Biconomy's relayers for gas-less transactions.

**6. Upgradable Beacon:**
For more information, see the Beacon proxy API [here](https://docs.openzeppelin.com/contracts/3.x/api/proxy#beacon).

**7. Token:**
The rep3 token contract has the following details: 

- **type *(uint8)*:** The 8 bits (or 1 byte) of this variable stores the types of badges a community has. The first badge type is the parent or membership badge by default. Communities can have 255 types of custom badges. 

- **data *(uint256)*:** The 256 bits of this variable are divided into 32 slots of 8 bits (or 1 byte) each. For the parent or membership badges, the first and second slots are `membership level` and `category` by default. The other 30 slots can store custom fields. For child badges, all 32 slots can store custom fields. Each custom field can range from `0` to `255`.

- **ownerTokenId *(uint256)*:** This contains the mapping of all child badges (i.e. `type !=0`) to the membership token.

- **owner *(address)*:** This contains the ERC721 mapping of token ID to the owner's address.

- **tokenUri *(string)*:** Arweave hash of the metadata file location.

### Storage
The rep3 protocol uses [Arweave](https://www.arweave.org/) to store the metadata associated with tokens. 

### Contract Addresses
*Manager:* `0xDA6F4387C344f1312439E05E9f9580882abA6958`

*Router:* `0xB9Acf5287881160e8CE66b53b507F6350d7a7b1B`

*rep3 Implementation Singleton:* `0xAF61177D94941299140ac94497aDEf3ee28CB774`

*upgradeableBeacon:* `0x083842b3F6739948D26C152C137929E0D3a906b9`
