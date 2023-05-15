import { ethers } from "hardhat";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv"
dotenv.config()

// yarn ts-node --files .\scripts\deployTokenizedBallot.ts contractAddress Choc Strab Van

async function main() {
    const args = process.argv.slice(2)
    const contractAddress = args[0]
    const proposals = args.slice(1)
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

    console.log("Deploying TokenizedBallot contract")
    //const ballotFactory = await ethers.getContractFactory("Ballot")
    const TokenizedBallotFactory = new TokenizedBallot__factory(signer)
    const convertedProposals = proposals.map((proposal) => ethers.utils.formatBytes32String(proposal))

    const contract = await TokenizedBallotFactory.deploy(convertedProposals, contractAddress)
    const deployTx = await contract.deployTransaction.wait()
    console.log(`The ballot contract was deployed at address ${contract.address} at block ${deployTx.blockNumber}, at TXN: ${deployTx.transactionHash}`)
}

main().catch((error) => {
    console.log(error)
    process.exitCode = 1
})