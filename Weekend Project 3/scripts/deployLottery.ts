import { ethers } from "hardhat";
import { LotteryToken__factory, Lottery__factory } from "../typechain-types";
import * as dotenv from "dotenv"
dotenv.config()

// yarn ts-node --files .\scripts\deployTokenizedBallot.ts

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
    console.log(`Using wallet address ${wallet.address}`)

    const provider = new ethers.providers.JsonRpcProvider(
        process.env.ALCHEMY_HTTPS_API_KEY
    )
    const lastBlock = await provider.getBlock("latest")
    console.log(`The last block is ${lastBlock.number}`)

    const signer = wallet.connect(provider)
    const balance = await signer.getBalance()
    console.log(`Balance is ${balance} WEI`)

    console.log("---------")

    console.log("Deploying Lottery token contract")
    const LotteryFactory = new Lottery__factory(signer)

    const BET_PRICE = 1
    const BET_FEE = 0.2

    const contract = await LotteryFactory.deploy(
        "Lottery Token",
        "LOT",
        1,
        ethers.utils.parseEther(BET_PRICE.toFixed(18)),
        ethers.utils.parseEther(BET_FEE.toFixed(18))
    )
    const deployTx = await contract.deployTransaction.wait()
    console.log(`The ballot contract was deployed at address ${contract.address} at block ${deployTx.blockNumber}, at TXN: ${deployTx.transactionHash}`)

    console.log("---------")
    const LotteryTokenFactory = await contract.paymentToken()
    console.log(`The token address is ${LotteryTokenFactory}}`)

}


main().catch((error) => {
    console.log(error)
    process.exitCode = 1
})