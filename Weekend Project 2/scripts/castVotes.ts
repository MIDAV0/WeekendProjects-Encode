import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv"
import { sign } from "crypto";
dotenv.config()


// yarn ts-node --files .\scripts\castVotes.ts proposalNumber contractAddress
// Contract address: 0xb2750f3e973fe82a5b0ff9de8996b6de288f20df

async function main() {
    const args = process.argv.slice(2)
    const proposalNumber = args[0]
    const contractAddress = args[1]
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

    const ballotFactory = new Ballot__factory(signer)
    const ballotContract = await ballotFactory.attach(contractAddress) 
    
    console.log(`Voting for proposal ${proposalNumber}`)
    const tx = await ballotContract.connect(signer).vote(Number(proposalNumber))
    await tx.wait()
    console.log(`Voted for proposal ${proposalNumber} at transaction ${tx.hash}`)
}

main().catch((error) => {
    console.log(error)
    process.exitCode = 1
})