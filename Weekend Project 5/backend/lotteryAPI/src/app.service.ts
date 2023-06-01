import { Injectable } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import * as lotteryJson from './assets/Lottery.json';
import * as lotteryTokenJson from './assets/LotteryToken.json';
import { parse } from 'path';
import { get } from 'http';

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  lotteryTokenContract: ethers.Contract;
  lotteryContract: ethers.Contract;
  signer: ethers.Signer;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("ALCHEMY_API_KEY_HTTP")
    this.provider = new ethers.providers.JsonRpcProvider(apiKey)
    this.lotteryTokenContract = new Contract(this.getTokenAddress(), lotteryTokenJson.abi, this.provider) 
    this.lotteryContract = new Contract(this.getLotteryAddress(), lotteryJson.abi, this.provider)
    const pKey = this.configService.get<string>('PRIVATE_KEY')
    const wallet = new ethers.Wallet(pKey)
    this.signer = wallet.connect(this.provider)
  }

  getLastBlock(): Promise<ethers.providers.Block> {
    return this.provider.getBlock("latest")
  }

  getLotteryAddress(): string {
    const lotteryAddress = this.configService.get<string>('LOTTERY_ADDRESS');
    return lotteryAddress
  }

  getTokenAddress(): string {
    const tokenAddress = this.configService.get<string>('TOKEN_ADDRESS');
    return tokenAddress
  }


  // check lottery state
  async getLotteryState() {
    const state = await this.lotteryContract.betsOpen()
    const closingDate = await this.lotteryContract.betsClosingTime()
    return {
      state,
      closingDate: new Date(closingDate * 1000),
    }
  }

  // open bets
  async openBets(duration: string) {
      const currentBlock = this.provider.getBlock("latest");
      return this.lotteryContract.connect(this.signer).openBets((await currentBlock).timestamp + Number(duration));
  }

  // purchase tokens
  async purchaseTokens(amount: string) {
    const tokenRatio = await this.lotteryContract.purchaseRatio()
    const data = this.lotteryContract.connect(this.signer).purchaseTokens({
      value: ethers.utils.parseEther(amount).div(tokenRatio),
    }).then((tx) => tx).catch((err) => err)
    return data
  }

  // display token balance
  async getTokenBalance() {
    const value = await this.lotteryTokenContract.balanceOf(this.signer.getAddress())
                                                          .then((balance) => ethers.utils.formatEther(balance))
    return {
      value,
    }
  }

  // bet (number of times)
  async bet(numberOfTimes: string) {
    return this.lotteryTokenContract
      .connect(this.signer)
      .approve(this.getLotteryAddress(), ethers.constants.MaxUint256)
      .then((token) => {
        this.lotteryContract.connect(this.signer).betMany(numberOfTimes).then((tx) => tx).catch((err) => err)
      })
  }

  // close lottery
  async closeLottery() {
    return await this.lotteryContract.connect(this.signer).closeLottery().then((tx) => tx).catch((err) => err)
  }

  // display prize
  async displayPrize(address: string) {
    const value =  await this.lotteryContract.prize(address).then((prize) => ethers.utils.formatEther(prize)).catch((err) => err)
    return {
      value,
    }
  }

  // claim prize (amount)
  async claimPrize(amount: string) {
    return this.lotteryContract.connect(this.signer).prizeWithdraw(ethers.utils.parseEther(amount)).then((tx) => tx).catch((err) => err)
  }

  // display owner pool
  async getOwnerPool() {
    const value = await this.lotteryContract.ownerPool().then((pool) => ethers.utils.formatEther(pool)).catch((err) => err)
    return {
      value,
    }
  }

  // withdraw tokens from pool (amount)
  withdrawFromPool(amount: string) {
    return this.lotteryContract.connect(this.signer).ownerWithdraw(ethers.utils.parseEther(amount)).then((tx) => tx).catch((err) => err)
  }

  // burn tokens (amount)
  burnTokens(amount: string) {
    return this.lotteryTokenContract
    .connect(this.signer)
    .approve(this.getLotteryAddress(), ethers.constants.MaxUint256)
    .then((token) => {
      return this.lotteryContract
        .connect(this.signer)
        .returnTokens(ethers.utils.parseEther(amount)) 
    })
  }
}
