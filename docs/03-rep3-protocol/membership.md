---
sidebar_position: 2
---

# 💳 Membership

rep3Token is an ERC721 contract where each token is of certain type denoted by `uint8`.

By default  **type 0** is **Membership**. Other types may or may not include Appreciation, Contribution and Participation as per the community requires. Since type is denoted by uint8, there can be maximum of 256 types of tokens for a community.


### Features

#### Soul / Identity
Membership tokens acts as souls or identities for a member in a community. All the other badges are associated with memberhship token.

#### Minting
Membership token minting is a two step process. Approver in the community generates a voucher with a ERC712 signature. This voucher is then used to claim the membership.

#### Levels and Categories
Every token has a data of type `uint256` associated with it. There are 32 **data slots** of **8 bytes** each.
By default first slot is **level** and second slot is **category** in case of a membership token.
Other slots are empty and can be used as the community requires.

:::caution Caution

Two memberhships of same level and category combination can be associted with same address.

:::


Levels and Category of a memberhship can be updated by the approver.
:::danger Inactive memberhship

Level 0 by default is for inactive memberships which restricts other badges (type != 0) to be associated with the memberhsips

:::


#### Soul Transfer
Transfer of individual tokens is prohibited by the protocol, although a membership can be transferred to a new address along with all the associated badges via `soulTransfer`.
Soul transfer can be triggered by the owner of membership with a TransferVoucher signed by the approver of the community.

This is useful in the case of wallet compromisation and rotation.
