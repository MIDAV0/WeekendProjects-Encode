import { Injectable } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import lotteryJson from './contracts/Lottery.json';
import lotteryTokenJson from './contracts/LotteryToken.json';

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

  getLotteryAddress() {
    const lotteryAddress = this.configService.get<string>('LOTTERY_ADDRESS');
    return lotteryAddress
  }

  getTokenAddress() {
    const tokenAddress = this.configService.get<string>('TOKEN_ADDRESS');
    return tokenAddress
  }


  // check lottery state
  getLotteryState() {
    const state = this.lotteryContract.betsOpen()
    const closingDate = this.lotteryContract.betsClosingTime()
    return {
      state,
      closingDate: new Date(closingDate.toNumber() * 1000)
    }
  }

  // open bets
  async openBets(duration: string) {
      const currentBlock = this.provider.getBlock("latest");
      return this.lotteryContract.connect(this.signer).openBets(currentBlock.timestamp + Number(duration));
    }

  // purchase tokens
  async purchaseTokens(amount: string) {
    const tokenRatio = await this.lotteryContract.tokenRatio()
    return this.lotteryContract.connect(this.signer).purchaseTokens({
      value: ethers.utils.parseEther(amount).div(tokenRatio),
    })
  }

  // display token balance
  async getTokenBalance(address) {
    const balance = await this.lotteryTokenContract.balanceOf(address)
                                                          .then((balanceBN) => balanceBN)
    return ethers.utils.formatEther(balance);
  }

  // bet (number of times)
  async bet(numberOfTimes: string) {
    return this.lotteryTokenContract
      .connect(this.signer)
      .approve(this.getLotteryAddress(), ethers.constants.MaxUint256)
      .then((token) => {
        return this.lotteryContract.connect(this.signer).betMany(numberOfTimes) 
      })
  }
  // close lottery
  async closeLottery() {
    return this.lotteryContract.connect(this.signer).closeLottery()
  }

  // display prize
  async displayPrize(address: string) {
    const prize = await this.lotteryContract.prize(address)
    return ethers.utils.formatEther(prize);
  }

  // claim prize (amount)
  claimPrize(amount: string) {
    return this.lotteryContract.connect(this.signer).prizeWithdraw(ethers.utils.parseEther(amount))
  }

  // display owner pool
  async getOwnerPool() {
    const pool = await this.lotteryContract.ownerPool()
    return ethers.utils.formatEther(pool);
  }

  // withdraw tokens from pool (amount)
  withdrawFromPool(amount: string) {
    return this.lotteryContract.connect(this.signer).ownerWithdraw(ethers.utils.parseEther(amount))
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
