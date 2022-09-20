---
sidebar_position: 3
---

# Badges

As mentioned before, the rep3 protocol lets a community have 256 types of badges (with one membership badge and 255 other custom badges). All non-membership badges are bound to the membership badge.

Some common types of non-membership badges are contribution badges, appreciation badges, partnership badges, etc.

### Features

- **Minting:** Approvers can generate an EIP712 voucher which will trigger the mint process once claimed by the member.

- **On-Chain Data:** Badges can have 32 slots of 8 bits (or 1 byte) each to store data on-chain. These could be customised by the community. For example, contribution badges can use one slot to store the number of hours spent on one task.

- **Transfer:** Non-membership badges cannot be transferred. However, if required, all the badges together can be transferred using the `soulTransfer` function.