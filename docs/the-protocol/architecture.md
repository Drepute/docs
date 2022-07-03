---
sidebar_position: 1
---

# Architecture

# Contracts
### rep3 Proxy

Proxy contract deployed for every community which points to a upgradeable beacon with implementation contract address

### Implementation singleton

Implementation ERC721 contract with modifications for membership and other tokens

### Manager

Factory contract for rep3Token Proxies

### Router

Forwarder contract for forwarding requests to proxies via ERC2771 forwarder

### Relayer

rep3 hub uses Biconomy relayers for gas-less transactions


# Storage

Protocol uses Arweave for storing metadata associated with tokens


# Token


