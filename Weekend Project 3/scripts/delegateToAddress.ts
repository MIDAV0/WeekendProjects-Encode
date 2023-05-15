import { ethers } from "hardhat";
import { MyERC20Votes__factory } from "../typechain-types";
import * as dotenv from "dotenv"
dotenv.config()


// yarn ts-node --files .\scripts\delegateToAddress.ts contractAddress amount delegateAddress
// Group
// 0x993AFeeaD710065aa20EDb6407a4F35a8bB67E77
// 0x2632c16D324b0b6C5E9E43ee672b8679A6a5A57f
// 0x3200c9E4FF0A35e8417cdEE82F659108E4663408
// 0xe1738cEbAE9E0efC82fae3cef28D7a852AF8e22c


async function main() {
    const args = process.argv.slice(2)
    const contractAddress = args[0]
    const amount = args[1]
    const delegateAddress = args[2]
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

    // const delegateTx = await contract.delegate(delegateAddress);
    // const delegateTxReceipt = await delegateTx.wait();

    const transferTx = await contract.connect(signer).transfer(delegateAddress, ethers.utils.parseUnits(amount))
    const trReciept = await transferTx.wait()

    console.log(`Delegated votes to ${delegateAddress} at TXN: ${trReciept.transactionHash}.`)
}

main().catch((error) => {
    console.log(error)
    process.exitCode = 1
})