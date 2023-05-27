import { Injectable } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import * as tokenJson from "./assets/MyERC20Votes.json"
import * as ballotJson from "./assets/TokenizedBallot.json"
import { ConfigService } from '@nestjs/config';
import { parse } from 'path';
import { get } from 'http';

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  tokenContract: ethers.Contract;
  ballotContract: ethers.Contract;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("ALCHEMY_API_KEY_HTTP")
    this.provider = new ethers.providers.JsonRpcProvider(apiKey)
    this.tokenContract = new Contract(this.getTokenAddress(), tokenJson.abi, this.provider)
    this.ballotContract = new Contract(this.getBallotAddress(), ballotJson.abi, this.provider)
  }

  getHello(): string {
    return 'Hello World!';
  }

  getLastBlock(): Promise<ethers.providers.Block> {
    return this.provider.getBlock("latest")
  }

  getTokenAddress() {
    const tokenAddress = this.configService.get<string>('TOKEN_ADDRESS');
    return tokenAddress
  }

  getBallotAddress() {
    const ballotAddress = this.configService.get<string>('BALLOT_ADDRESS');
    return ballotAddress
  }

  getTotalSupply() {
    return this.tokenContract.totalSupply()
  }

  getAddressTokenBalance(address: string) {
    return this.tokenContract.balanceOf(address);
  }

  getAddressVotingPower(address: string) {
    return this.tokenContract.getVotes(address);
  }

  async getTransactionReceipt(hash: string) {
    const tx = await this.provider.getTransaction(hash);
    const receipt = await tx.wait();
    return receipt;
  }

  async delegateVotes(delegate: string) {
    const pKey = this.configService.get<string>('PRIVATE_KEY')
    const wallet = new ethers.Wallet(pKey)
    const signer = wallet.connect(this.provider)
    return this.tokenContract.connect(signer).delegate(delegate, {gasLimit: 1000000})
  }

  async makeSnapshot() {
    const pKey = this.configService.get<string>('PRIVATE_KEY')
    const wallet = new ethers.Wallet(pKey)
    const signer = wallet.connect(this.provider)
    return this.ballotContract.connect(signer).makeSnapshot({gasLimit: 1000000})
  }

  async getSnapshotBlock() {
    return this.ballotContract.targetBlockNumber()
  }

  async getWinningProposal() {
    const pKey = this.configService.get<string>('PRIVATE_KEY')
    const wallet = new ethers.Wallet(pKey)
    const signer = wallet.connect(this.provider)
    let proposal;
    await this.ballotContract.connect(signer).winnerName()
        .then((result) => {
          proposal = {data: ethers.utils.parseBytes32String(result)}
        })
    return proposal
  }

  async getProposals() {
    const proposals = []
    const proposalsLength = await this.ballotContract.getProposalsLength()
        .then((result) => {
          return Number(result._hex)
        })

    for (let i = 0; i < proposalsLength; i++) {
      const proposal = await this.ballotContract.getProposalAtIndex(i)
        .then((result) => {
          return result
        })
      proposals.push(ethers.utils.parseBytes32String(proposal))
    }
    return proposals
  }

  async vote(proposal: number, amount: number) {
    const pKey = this.configService.get<string>('PRIVATE_KEY')
    const wallet = new ethers.Wallet(pKey)
    const signer = wallet.connect(this.provider)
    return this.ballotContract.connect(signer).vote(Number(proposal), ethers.utils.parseUnits(amount.toString()), {gasLimit: 1000000})
  }

  async requestTokens(address: string, signature: string, amount: number) {
    const pKey = this.configService.get<string>('PRIVATE_KEY')
    const wallet = new ethers.Wallet(pKey)
    const signer = wallet.connect(this.provider)
    return this.tokenContract.connect(signer).mint(address, ethers.utils.parseUnits(amount.toString()), {gasLimit: 1000000})
  }
}
