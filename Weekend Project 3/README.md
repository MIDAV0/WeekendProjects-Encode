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
  


