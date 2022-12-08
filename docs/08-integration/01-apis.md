---
sidebar_position: 1
---

# APIs

rep3 API suite is for projects / ecosystems who would like to use rep3 protocol and rep3 infrastructure from within the tool

### Requirements
rep3 APIs apha is in development. Please reach out to us on [discord](https://discord.gg/xK2WXUv3VG) / [twitter](https://twitter.com/rep3gg) to get your API keys

### Security
APIs are secured over SSL and OAuth standard


### APIs

**Community Endpoints**

These endpoints are triggered in the context of a community, including the types of badges, details, approvers list etc

**=> `community/join`**

*Description*: Get the joining link for a community to be shared with members for a member profile and claiming the badges

*Method*: `GET`

*headers*: 
- Content-Type: application/json
- X-Authentication: <client_secret>

*request params*:
- community_uuid: <community_uuid>

*example*

`GET https://api.rep3.gg/public/community/join?community_uuid=<community_uuid>`

----

**=> `community/contract_address`**

*Description*: Get the ERC721 contract address for the community and community badges

*Method*: `GET`

*headers*: 
- Content-Type: application/json
- X-Authentication: <client_secret>

*request params*:
- community_uuid: <community_uuid>

*example*

`GET https://api.rep3.gg/public/community/contract_address?community_uuid=<community_uuid>`


----
----

**Badge Endpoints**

These endpoints are triggered in the context of users and bade, including getting all the badges for a user, memberships etc

**=> `badge/mint`**

*Description*: Mint a badge on an address

*Method*: `POST`

*headers*: 
- Content-Type: application/json
- X-Authentication: <client_secret>

*request body*:
- community_uuid: <community_uuid>
- badge_type: <badge_type> | number
- receiver_address: <eoa_address> | optional if receiver_member_id is provided
- receiver_member_id: <membership_token_id> | optional if receiver_address is provided
- badge_url: <badge_url> | metadata url for the badge
*example*

`POST https://api.rep3.gg/public/badge/mint`

```json
{
    "community_uuid": "abcdef...",
    "badge_type": 0,
    "receiver_address": "0xfhdjksfh...",
    "receiver_member_id": 123,
    "badge_url": "ipfs://...."
}
```
----

**=> `badge/<contract_address>/<token_id>`**

*Description*: Get the token details in a community contract

*Method*: `GET`

*headers*: 
- Content-Type: application/json
- X-Authentication: <client_secret>

*url params*:
- contract_address: <community_contract_address>
- token_id: <token_id>

*example*

`GET https://api.rep3.gg/public/badge/0xhdjskhfjksdf.../45`

----


**=> `badge/user`**

*Description*: Get the token details in a community contract

*Method*: `GET`

*headers*: 
- Content-Type: application/json
- X-Authentication: <client_secret>

*request params*:
- address: <eoa_address> | optional if community_uuid and member_token_id is provided
- member_token_id: <token_id> | optional if address is provided
- type: <badge_type> | optinal | filters badges of a certain type
- contract_address: <contract_address> | optional | filtersbadges for the community contract address

*example*

`GET https://api.rep3.gg/public/badge/user?address=0xhfjdks...&type=1`

`GET https://api.rep3.gg/public/badge/user?member_token_id=34&contract_address=0xfhj...`

`GET https://api.rep3.gg/public/badge/user?contract_address=0xfhj...&address=0xhfjdks...&type=1`