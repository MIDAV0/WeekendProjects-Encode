import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv"
dotenv.config()

// yarn ts-node --files .\scripts\Ballot.ts Choc Strab Van

const ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"

async function main() {
    const proposals = process.argv.slice(2)

    // const wallet = ethers.Wallet.createRandom()
    // console.log(`Using waller address ${wallet.address}`)
    // const signer = wallet

    // const prov = new ethers.providers.AlchemyProvider(
    //     "goerli",
    //     process.env.ALCHEMY_API_KEY
    // )

    // const provider = ethers.getDefaultProvider("goerli")
    // const block = await provider.getBlock("latest")

    const accounts = await ethers.getSigners()

    console.log("Deploying Ballot contract")
    //const ballotFactory = await ethers.getContractFactory("Ballot")
    const ballotFactory = new Ballot__factory(accounts[0])
    const convertedProposals = proposals.map((proposal) => ethers.utils.formatBytes32String(proposal))
    const ballotContract = await ballotFactory.deploy(convertedProposals)
    const deployTx = await ballotContract.deployTransaction.wait()
    console.log(`The ballot contract was deployed as ${ballotContract.address} at block ${deployTx.blockNumber}`)

    console.log(`Giving right to vote`)
    const giveRightTx = await ballotContract.giveRightToVote(ADDRESS)
    const giveRightResponse = await giveRightTx.wait()
    console.log(`Tx reciept: BH ${giveRightResponse.transactionHash}, BN ${giveRightResponse.blockNumber}`)
}

main().catch((error) => {
    console.log(error)
    process.exitCode = 1
})