---
sidebar_position: 2
---

# Membership

The rep3Token is an ERC contract, whose each token is of a certain `type`. 

By default, `type 0` type of token is the parent badge or the membership badge. There can be 255 more types of tokens that communities can create. These can be customised as per their exact requirements. 

Other types of tokens could be the contribution badges (that already exist), participation badges, appreciation badges, etc.

### Features

- **Soul / Identity:** Membership tokens or badges are the "souls" or the "identities" of members in a community. All the other badges that members receive are associated to the membership badges as its children (i.e. the membership badge is the "parent" of all other types of badges). 

- **Minting:** To give the end user full control over what gets minted to their address and what doesn't, minting is a two step process. The first step is the creation of a voucher (when the community admin "approves" a badge). The second step is when members "claim their badges" against these outstanding vouchers (this triggers the mint process).

- **Levels and Categories:** All tokens have 32 data slots of 8 bits (or 1 byte) each. For membership badges, the first two data slots are reserved for `membership level` and `category`. These can be updated by the approver. For all other badges, all 32 slots are empty (i.e. they can be customised to the community's requirements). 

:::caution Caution
Two memberships of the same level and the same category can be associted with one address.
:::

:::danger Inactive Membership
For membership badges, `level 0` denotes inactive membership. When the level of a membership badge is 0, all other associated badges are restricted.
:::

- **Soul Transfer:** to enable key rotation by users, we have allowed conditional transferring of the parent or membership badge i.e. the parent or membership badge can be transferred to a new address via the `soulTransfer` function. Such a transfer would also moves all other badges associated with the parent or membership badge. This can be triggered by the owner of the membership badge with a `transferVoucher` signed by the approver of the community. Transfer of all other badge types is prohibited.