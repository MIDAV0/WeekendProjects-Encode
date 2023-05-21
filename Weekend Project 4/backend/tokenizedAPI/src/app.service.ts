import { Injectable } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import * as tokenJson from "./assets/MyERC20Votes.json"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  contract: ethers.Contract;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("ALCHEMY_API_KEY")
    this.provider = ethers.getDefaultProvider('sepolia', apiKey); 
    this.contract = new Contract(this.getAddress(), tokenJson.abi, this.provider)
  }

  getHello(): string {
    return 'Hello World!';
  }

  getLastBlock(): Promise<ethers.providers.Block> {
    return this.provider.getBlock("latest")
  }

  getAddress() {
    const tokenAddress = this.configService.get<string>('TOKEN_ADDRESS');
    return tokenAddress
  }

  getTotalSupply() {
    return this.contract.totalSupply()
  }

  getBalanceOf(address: string) {
    return this.contract.balanceOf(address);
  }

  async getTransactionReceipt(hash: string) {
    const tx = await this.provider.getTransaction(hash);
    const receipt = await tx.wait();
    return receipt;
  }

  async mintTokens(address: string) {
    const pKey = this.configService.get<string>("PRIVATE_KEY")
  }

  async requestTokens(address: string, signature: string) {
    const pKey = this.configService.get<string>('PRIVATE_KEY')
    const wallet = new ethers.Wallet(pKey)
    const signer = wallet.connect(this.provider)
    return this.contract.connect(signer).mint(address, ethers.utils.parseUnits("1"))
  }
}
