# Weekend Project 2


## Commands

`yarn install` - install dependencies

`yarn hardhat compile` - compile contracts


## Scripts

1. deployERC20Votes.ts - deploy token contract
```
yarn ts-node --files .\scripts\deployERC20Votes.ts
```
Deployed contract at address 0x575B3aC7FfF4dd85c88c1283f35aE3787f544823 

TXN: 0x6a839f0408a7a73fdcadb26136a75a0fc97db058a2ed3d7a2c7856b8e51b4553

2. selfDelegateVotes.ts - give voting rights to yourself
```
yarn ts-node --files .\scripts\delegateVotes.ts contractAddress amount
```
Minted 10 tokens to 0x65315D8c187178bfFfA37C400f0C8842e0724D24
TXN: 0x08dadfea022e3101a1a8e35109e9898fea4dab7925c79004f8298c06edb81fe6

Self delegated 10 votes to 0x65315D8c187178bfFfA37C400f0C8842e0724D24
TXN: 0xe744299bc3599e3599c6d44b40f8733403fc47dd18d8e3b0b09de83f052610a7

3. delegateToAddress.ts - transfer votes to specific address
```
yarn ts-node --files .\scripts\delegateToAddress.ts contractAddress amount address
```
Trasnfered 10 votes to 0x993AFeeaD710065aa20EDb6407a4F35a8bB67E77
TXN: 0xca1225703e009dd96cf1b4e83e720bc893d57b57537eda0e1c8ff4a6f33c2d93


4. deployTokenizedBallot.ts - deploy ballot contract
```
yarn ts-node --files .\scripts\deployTokenizedBallot.ts contractAddress proposals
```
Contract deplloyed at address 0x261c12867FaAd9d55080788eB208Ceda3F37a4e3
TXN: 0x3e9d56cbce5bda5956272c9d96a9619c85d133c8d7e4aee1270e983dd31755e0


5. voteForProposal.ts - vote for proposal
```
yarn ts-node --files .\scripts\voteForProposal.ts contractAddress amount proposalId
``` 
Voted for proposal 1 with 1 vote
TXN:

5. winningProposal.ts - get winning proposal
```
yarn ts-node --files .\scripts\castVotes.ts contractAddress
```
Sucessfully returns winning proposal name
