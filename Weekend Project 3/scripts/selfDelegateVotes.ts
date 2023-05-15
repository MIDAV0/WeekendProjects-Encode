import { ethers } from "hardhat";
import { MyERC20Votes__factory } from "../typechain-types";
import * as dotenv from "dotenv"
dotenv.config()


// yarn ts-node --files .\scripts\selfDelegateVote.ts contractAddress amount

async function main() {
    const args = process.argv.slice(2)
    const contractAddress = args[0]
    const amount = args[1]
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
    
    const mintTx = await contract.mint(signer.address, ethers.utils.parseUnits(amount))
    const mintTxReceipt = await mintTx.wait()

    console.log(`Minted ${amount} tokens to ${signer.address} with txHash ${mintTxReceipt.transactionHash}`)

    const delegateTx = await contract.delegate(signer.address);
    const delegateTxReceipt = await delegateTx.wait();

    const votes = await contract.getVotes(signer.address)
    console.log(`Self delegated votes to ${signer.address} at TXN: ${delegateTxReceipt.transactionHash}. Current voting power ${votes}`)
}

main().catch((error) => {
    console.log(error)
    process.exitCode = 1
})