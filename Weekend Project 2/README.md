# Weekend Project 2


## Commands

`yarn install` - install dependencies

`yarn hardhat compile` - compile contracts


## Scripts

1. deployBallot.ts - deploy ballot contract
```
yarn ts-node --files .\scripts\deployBallot.ts Proposal1 Proposal2 Proposal3
```
Deployed contract at address 0xb2750f3e973Fe82A5B0Ff9de8996B6dE288f20df 

TXN: 0x25f156eb51b73abd12b7365051d54db5e642ca94f71c26dc4fc95ed8b8a02ff3

2. giveVotingRights.ts - give voting rights to accounts
```
yarn ts-node --files .\scripts\giveVotingRights.ts walletAddress contractAddress
```
Gave voting rights to 0x39638D5dF0478a9E7f23fF5BD631C8729EDE8022

TXN: 0x8420d70bbd0dbc3c6a0fb14b0b0eede47024eea54b376b68f532456740fd7c84

3. castVotes.ts - cast votes
```
yarn ts-node --files .\scripts\castVotes.ts proposalNumber contractAddress
```
Voted for proposal 2

TXN: 0xed8bb39c3a8bd832b9c87b65e977b872afa7fc32d1bb7d8e001f0d5673bddfb3

Vote failed because account did not have voting rights

TXN: 0x8b1fedb6518000030cc5692890135bb8a0fc140eaa0ba1e46e9b2c03b7ddd58c


4. delegateVotes.ts - delegate votes
```
yarn ts-node --files .\scripts\castVotes.ts delegateAddress contractAddress
```
Test TXNs:


5. winningProposal.ts - get winning proposal
```
yarn ts-node --files .\scripts\castVotes.ts contractAddress
```
Sucessfully returns winning proposal name

**Reports**

- Voted for proposal #1 via script.
  TX HASH: 0xd9c88fa1fc84ee7102693acc3577656dc6b91269972eaba69d8a5c3eb4dbd40a
  Discord ID: 0xbb#4050 
  


