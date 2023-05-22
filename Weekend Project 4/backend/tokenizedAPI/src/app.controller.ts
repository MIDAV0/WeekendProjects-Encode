import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ethers } from 'ethers';
import { RequestTokensDto } from './dtos/requestToken.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('last-block')
  getLastBlock(): Promise<ethers.providers.Block> {
    return this.appService.getLastBlock();
  }

  @Get('tokenContract-address')
  getTokenAddress(): string {
    return this.appService.getTokenAddress();
  }

  @Get('ballotContract-address')
  getBallotAddress(): string {
    return this.appService.getBallotAddress();
  }

  @Get('total-supply')
  getTotalSupply(): BigInteger {
    return this.appService.getTotalSupply();
  }

  @Get('addressTokenBalance/')
  async getAddressTokenBalance(@Query('address') address: string) {
    return await this.appService.getAddressTokenBalance(address);
  }

  @Get('addressVotingPower/')
  async getAddressVotingPower(@Query('address') address: string) {
    return await this.appService.getAddressVotingPower(address);
  }

  @Get('transaction-receipt/')
  async getTransactionReceipt(@Query('hash') hash: string) {
    return await this.appService.getTransactionReceipt(hash);
  }

  @Post('request-tokens')
  async requestTokens(@Body() body: RequestTokensDto) {
    return await this.appService.requestTokens(body.address, body.signature, body.amount)
  }
}
