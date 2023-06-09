import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv"
dotenv.config()

// yarn ts-node --files .\scripts\Ballot.ts Choc Strab Van
/*
i had the same error.
but if you change provider line to use   const provider = new ethers.providers.JsonRpcProvider(
    "");
and use the https from alchemy instead of the key it works.
also note that when you create alchemy project you choose your network before. so the key is probably a goerli key
*/

async function main() {
    const proposals = process.argv.slice(2)
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

    console.log("Deploying Ballot contract")
    //const ballotFactory = await ethers.getContractFactory("Ballot")
    const ballotFactory = new Ballot__factory(signer)
    const convertedProposals = proposals.map((proposal) => ethers.utils.formatBytes32String(proposal))

    const ballotContract = await ballotFactory.deploy(convertedProposals)
    const deployTx = await ballotContract.deployTransaction.wait()
    console.log(`The ballot contract was deployed at address ${ballotContract.address} at block ${deployTx.blockNumber}`)
}

main().catch((error) => {
    console.log(error)
    process.exitCode = 1
})