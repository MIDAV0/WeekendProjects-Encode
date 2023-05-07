# Weekend Project 2


## Commands

`yarn install` - install dependencies

`yarn hardhat compile` - compile contracts


## Scripts

1. deployBallot.ts - deploy ballot contract
```
yarn ts-node --files .\scripts\deployBallot.ts Proposal1 Proposal2 Proposal3
```
Test TXNs:

2. giveVotingRights.ts - give voting rights to accounts
```
yarn ts-node --files .\scripts\giveVotingRights.ts walletAddress contractAddress
```
Test TXNs:

3. castVotes.ts - cast votes
```
yarn ts-node --files .\scripts\castVotes.ts proposalNumber contractAddress
```
Test TXNs:


4. delegateVotes.ts - delegate votes
```
yarn ts-node --files .\scripts\castVotes.ts delegateAddress contractAddress
```
Test TXNs:


5. winningProposal.ts - get winning proposal
```
yarn ts-node --files .\scripts\castVotes.ts contractAddress
```
Test TXNs:


