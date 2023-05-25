import { ethers } from "hardhat";
import { MyERC20Votes__factory } from "../typechain-types";
import * as dotenv from "dotenv"
dotenv.config()

// yarn ts-node .\scripts\grantRole.ts 0xb2750f3e973Fe82A5B0Ff9de8996B6dE288f20df

const addresses = [
    "0x39638D5dF0478a9E7f23fF5BD631C8729EDE8022",
    "0xEa41f81274E6Bf0948179b0cd37BD742Ba55Dc00",
    "0x2632c16D324b0b6C5E9E43ee672b8679A6a5A57f",
    "0xe1738cEbAE9E0efC82fae3cef28D7a852AF8e22c",
    "0x3200c9E4FF0A35e8417cdEE82F659108E4663408"
]


async function main() {
    const args = process.argv.slice(2)
    const contractAddress = args[0]
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

    const minterRole = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"))

    console.log("Granting roles...")

    for (const address of addresses) {
        const grantRoleTx = await contract.grantRole(minterRole, address, {gasLimit: 2000000})
        const grantRoleTxReceipt = await grantRoleTx.wait()
        console.log(`Granted MINTER role to ${address} with txHash ${grantRoleTxReceipt.transactionHash}`)
    }
}

main().catch((error) => {
    console.log(error)
    process.exitCode = 1
})