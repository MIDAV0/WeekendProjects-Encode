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

  @Get('contract-address')
  getAddress(): string {
    return this.appService.getAddress();
  }

  @Get('total-supply')
  getTotalSupply(): BigInteger {
    return this.appService.getTotalSupply();
  }

  @Get('balance/:address') 
  getBalanceOf(@Param('address') address: string) {
    return this.appService.getBalanceOf(address);
  }

  @Get('tramsaction-receipt/')
  async getTransactionReceipt(@Query('hash') hash: string) {
    return await this.appService.getTransactionReceipt(hash);
  }

  @Post('request-tokens')
  async requestTokens(@Body() body: RequestTokensDto) {
    return await this.appService.requestTokens(body.address, body.signature)
  }
}
