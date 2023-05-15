import { ethers } from "hardhat";
import { MyERC20Votes__factory } from "../typechain-types";
import * as dotenv from "dotenv"
dotenv.config()

// yarn ts-node --files .\scripts\deployERC20Votes.ts

async function main() {
    console.log("Testing")
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

    console.log("Deploying ERC20Votes contract")
    //const ballotFactory = await ethers.getContractFactory("Ballot")
    const MyERC20VotesFactory = new MyERC20Votes__factory(signer)

    const MyERC20VotesContract = await MyERC20VotesFactory.deploy()
    const deployTx = await MyERC20VotesContract.deployTransaction.wait()
    console.log(`The ballot contract was deployed at address ${MyERC20VotesContract.address} at block ${deployTx.blockNumber}`)
}

main().catch((error) => {
    console.log(error)
    process.exitCode = 1
})