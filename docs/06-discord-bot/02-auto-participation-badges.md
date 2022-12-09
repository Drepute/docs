---
sidebar_position: 2
---

# Auto Participation Badges

There is a widespread culture of marking attendance in community calls or events using POAPs or other NFTs. In our conversations with several small and large communities, we learnt that the distribution of these POAPs / NFTs is a tedious task. 

Not only do admins have to create a new "drop" for each event, they also have to track the participants and the duration they stayed in the event. Despite all this effort though, communities can only use such tokens for trivial events since managing secret codes or drop links is not fully secure.

Sensing a need for a simpler and a more robust solution, we created the automated participation badges feature in our Discord bot. 

Put simply, you just need to use the `/start` command and the bot tracks the active attendees in a specified voice channel, and automatically gives them participation badges at the end of the event.

Here's how it's done:

#### 1. Enable participation badges.
:::caution
(This step assumes that you have [onboarded your community](https://docs.rep3.gg/memberships/setting-up-memberships) and [setup membership badges](https://docs.rep3.gg/memberships/approving-memberships#1-setup-membership-badges) on the rep3 platform.)
:::

Login to the rep3 platform as an approver, and enable the participation badges by selecting the `Enable Badges` button. This will start the process to invite the rep3 Discord bot in your server. You may not need to connect your Discord if [badge autoclaim](https://docs.rep3.gg/discord-bot/badge-autoclaim/) was enabled before.

![](../img/26.gif)

#### 2. Define roles that can run the bot commands.
Before we start tracking calls and events in voice channels, we need to define who all can run the bot commands. It's a good idea to limit this permission to moderators or admins.

When toggle says `Manual Mint`, members that receive participation badges must manually go and claim their participation badges. When toggled to `Direct Mint`, members' participation badges get directly minted to their membership badge (they do not need to manually claim them).

![](../img/27.gif)

#### 3. And that's it!
Congratulations! You have successfully setup automated participation badges. Now run the `/start` command in your server and automatically track attendees and give them participation badges. 

:::caution Note
Members must hold a membership badge to receive participation badges. Kindly ensure that you [setup membership badges](https://docs.rep3.gg/memberships/approving-memberships#1-setup-membership-badges) on the rep3 platform before running rep3 bot commands in your server.)

<!-- Now let's walkthrough a test run of this feature.

#### 4. Run the `/start` slash command.
Run the `/start` command by typing and entering this in a text channel. The command will ask you for the arguments of the following parameters: 
1. Title: 
2. Duration: 
3. % Call to be Attended: -->