import { ethers } from "hardhat";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv"
dotenv.config()


// yarn ts-node --files .\scripts\voteForProposal.ts contractAddress amount proposal

async function main() {
    const args = process.argv.slice(2)
    const contractAddress = args[0]
    const amount = args[1]
    const proposal = args[2]
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

    const TokenizedBallotFactory = new TokenizedBallot__factory(signer)
    const contract = await TokenizedBallotFactory.attach(contractAddress) 
    
    const voteTx = await contract.connect(signer).vote(Number(proposal), ethers.utils.parseUnits(amount));
    const voteTxReceipt = await voteTx.wait()

    console.log(`Voted for ${proposal} with ${amount} voting power at TXN: ${voteTxReceipt.transactionHash}`)
}

main().catch((error) => {
    console.log(error)
    process.exitCode = 1
})