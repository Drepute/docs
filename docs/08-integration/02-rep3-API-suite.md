---
sidebar_position: 2
---

# rep3 API Suite

rep3 API suite is for projects / ecosystems who would like to use rep3 protocol and rep3 infrastructure from within the tool. The API suite is in alpha, we are more than happy to assist you if you face any issues. Reach out to us on [discord](https://discord.gg/xK2WXUv3VG)

### Requirements
To obtain API Key checkout the previous [writeup](https://docs.rep3.gg/integration/retrieving-your-API-key)

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
- Authorization: Bearer <api_key>

*example*

`GET https://api.rep3.gg/public/community/join`

reponse `200 OK`

```json

{
    "link": "https://app.rep3.gg/contributor/invite/yourCOMMUNITYname/7a9e74d3b..."
}
```

----

**=> `community/contract_address`**

*Description*: Get the ERC721 contract address for the community and community badges

*Method*: `GET`

*headers*: 
- Content-Type: application/json
- Authorization: Bearer <api_key>


*example*

`GET https://api.rep3.gg/public/community/contract_address`

response `200 OK`

```json
{
    "contract_address": "0xeB6664A8a6..."
}
```
----
----

**Badge Endpoints**

These endpoints are triggered in the context of users and badge, including getting all the badges for a user, memberships etc

**=> `badge/mint`**

*Description*: Mint a badge on an address. **This endpoint is only enabled for direct minting of custom badges. We are actively working on APIs for minting membership badges and will be live very soon**

*Method*: `POST`

*headers*: 
- Content-Type: application/json
- Authorization: Bearer <api_key>

*request body*:
- badge_type: <badge_type> | number
- receiver_address: <eoa_address> | optional if receiver_member_id is provided
- receiver_member_id: <membership_token_id> | optional if receiver_address is provided
- badge_url: <badge_url> | metadata url for the badge
*example*

`POST https://api.rep3.gg/public/badge/mint`

```json
{
    "badge_type": 0,
    "receiver_address": "0xfhdjksfh...",
    "receiver_member_id": 123,
    "badge_url": "ipfs://...."
}
```
----

**=> `badge/<token_id>`**

*Description*: Get the token details in a community contract. 
**This API is a wrapper over rep3 subgraph and latency directly proportional to the subgraph.**

*Method*: `GET`

*headers*: 
- Content-Type: application/json
- Authorization: Bearer <api_key>

*url params*:
- token_id: <token_id>

*example*

`GET https://api.rep3.gg/public/badge/0`

response `200 OK`

```json
{
    "error": null,
    "result": {
        "membershipNFTs": [
            {
                "id": "0x17912135...",  // transaction hash
                "tokenID": "0", 
                "contractAddress": {
                    "id": "0xhdjskhfjksdf...", 
                    "txHash": "0x4adb3bbffc6ebeaeca436b8539.." // contract creation transaction hash
                    }, 
                "claimer": "0x9c3f3314736...", // eoa address
                "metadataUri": "http://arweave.net/VhekbnDujyRCha0ubqDCSSD...", 
                "level": "1", 
                "category": "1"
            }
        ]
    }
}
```

>Note: Response is an array as there can be multiple entries of the same `tokenID` if the token is upgraded or downgraded. Keep an eye on `level` and `category`. This is true for the subsequent API calls as well.

----


**=> `badge/user`**

*Description*: Get the token details in a community contract

*Method*: `GET`

*headers*: 
- Content-Type: application/json
- Authorization: Bearer <api_key>

*request params*:
- address: <eoa_address> | optional if community_uuid and member_token_id is provided
- member_token_id: <token_id> | optional if address is provided
- type: <badge_type> | optinal | filters badges of a certain type

*example*

`GET https://api.rep3.gg/public/badge/user?address=0xhfjdks...fdsf`

get all badges of a user in the community

```json
{
    "error": null,
    "result": {
        "membershipNFTs": [
            {
                "id": "0x17912135...",  // transaction hash
                "tokenID": "0", 
                "contractAddress": {
                    "id": "0xhdjskhfjksdf...", 
                    "txHash": "0x4adb3bbffc6ebeaeca436b8539.." // contract creation transaction hash
                    }, 
                "claimer": "0x9c3f3314736...", // eoa address
                "metadataUri": "http://arweave.net/VhekbnDujyRCha0ubqDCSSD...", 
                "level": "1", 
                "category": "1"
            }
        ],
        "associationBadges": [
            {
                "id": "0x3b539c24d13b0fb1c4680ce3777d9cae6e49...", 
                "tokenID": "3", 
                "claimer": "0x9c3f331473602e818e92cd16...", 
                "metadatUri": "http://arweave.net/cb1dEH7-fmB72594LBmG_mvrf...", 
                "type": 1, 
                "membershipId": "0", 
                "contractAddress": {
                    "id": "0x74ddc7f3a11ba9...", 
                    "txHash": "0x5669e96bbfd8816..."
                }
            }
        ]
    }
}
```


`GET https://api.rep3.gg/public/badge/user?member_token_id=34`

get all badges of a user in the community

```json
 {
    "error": null,
    "result": {
        "membershipNFTs": [
            {
                "id": "0x17912135...",  // transaction hash
                "tokenID": "0", 
                "contractAddress": {
                    "id": "0xhdjskhfjksdf...", 
                    "txHash": "0x4adb3bbffc6ebeaeca436b8539.." // contract creation transaction hash
                    }, 
                "claimer": "0x9c3f3314736...", // eoa address
                "metadataUri": "http://arweave.net/VhekbnDujyRCha0ubqDCSSD...", 
                "level": "1", 
                "category": "1"
            }
        ],
        "associationBadges": [
            {
                "id": "0x3b539c24d13b0fb1c4680ce3777d9cae6e49...", 
                "tokenID": "3", 
                "claimer": "0x9c3f331473602e818e92cd16...", 
                "metadatUri": "http://arweave.net/cb1dEH7-fmB72594LBmG_mvrf...", 
                "type": 1, 
                "membershipId": "0", 
                "contractAddress": {
                    "id": "0x74ddc7f3a11ba9...", 
                    "txHash": "0x5669e96bbfd8816..."
                }
            }
        ]
    }
}
```

`GET https://api.rep3.gg/public/badge/user?address=0xhfjdks...&type=0`

get only membership NFTs of a user in a community. Use type=3/4/5 for other types of badges

```json
 {
    "error": null,
    "result": {
        "membershipNFTs": [
            {
                "id": "0x17912135...",  // transaction hash
                "tokenID": "0", 
                "contractAddress": {
                    "id": "0xhdjskhfjksdf...", 
                    "txHash": "0x4adb3bbffc6ebeaeca436b8539.." // contract creation transaction hash
                    }, 
                "claimer": "0x9c3f3314736...", // eoa address
                "metadataUri": "http://arweave.net/VhekbnDujyRCha0ubqDCSSD...", 
                "level": "1", 
                "category": "1"
            }
        ]
    }
}

```



