import { ethers } from "hardhat";
import { MyERC20Votes__factory } from "../typechain-types";
import * as dotenv from "dotenv"
dotenv.config()


// yarn ts-node --files .\scripts\getAddressVotingPower.ts contractAddress walletAddress
// Group 10 addresses
// 0x993AFeeaD710065aa20EDb6407a4F35a8bB67E77

async function main() {
    const args = process.argv.slice(2)
    const contractAddress = args[0]
    const walletAddress = args[1]
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

    const MyERC20VotesFactory = new MyERC20Votes__factory(signer)
    const contract = await MyERC20VotesFactory.attach(contractAddress) 
    
    const votingPower = await contract.connect(signer).getPastVotes(walletAddress, 3532009)

    console.log(`Address ${walletAddress} has ${votingPower} voting power`)
}

main().catch((error) => {
    console.log(error)
    process.exitCode = 1
})