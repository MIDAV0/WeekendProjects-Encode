import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ethers } from 'ethers';
import { RequestTokensDto } from './dtos/requestToken.dto';
import { BurnTokenDto } from './dtos/burnToken.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('last-block')
  getLastBlock(): Promise<ethers.providers.Block> {
    return this.appService.getLastBlock();
  }

  @Get('lottery-state')
  getLotteryState() {
    return this.appService.getLotteryState();
  }

  @Get('open-bets')
  async openBets(@Query('duration') duration: string) {
    return await this.appService.openBets(duration);
  }

  @Get('purchase-tokens/')
  async purchaseTokens(@Query('amount') amount: string) {
    return await this.appService.purchaseTokens(amount);
  }

  @Get('token-balance')
  async getTokenBalance() {
    return await this.appService.getTokenBalance();
  }

  @Get('bet/')
  async bet(@Query('amount') amount: string) {
    return await this.appService.bet(amount);
  }

  @Get('close-lottery')
  async closeLottery() {
    return await this.appService.closeLottery();
  }

  @Get('display-prize/')
  async displayPrize(@Query('address') address: string) {
    return await this.appService.displayPrize(address);
  }

  @Get('claim-prize/')
  async claimPrize(@Query('amount') amount: string) {
    return await this.appService.claimPrize(amount);
  }

  @Get('owner-pool')
  async ownerPool() {
    return await this.appService.getOwnerPool();
  }

  @Get('withdraw-owner-pool')
  async withdrawOwnerPool(@Query('amount') amount: string) {
    return await this.appService.withdrawFromPool(amount);
  }

  @Post('burn-tokens')
  async burnTokens(@Body() body: BurnTokenDto) {
    return await this.appService.burnTokens(body.amount.toString());
  }
}
