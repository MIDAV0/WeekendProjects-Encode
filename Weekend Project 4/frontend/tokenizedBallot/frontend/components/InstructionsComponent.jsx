import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useSigner, useNetwork, useBalance } from "wagmi";
import { useState, useEffect } from "react";
import Vote from "./bodyComponents/Vote";
import Delegate from "./bodyComponents/Delegate";
import Snapshot from "./bodyComponents/Snapshot";
import Wallet from "./bodyComponents/Wallet";
import RequestTokens from "./bodyComponents/RequestTokens";
import Winner from "./bodyComponents/Winner";

const adminAddresses = [
	"0x65315D8c187178bfFfA37C400f0C8842e0724D24"
]

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					<span>My Dapp</span>
				</h1>
			</header>

			<div className={styles.components}>
				<div className={styles.box}>
					<Wallet></Wallet>
				</div>
				<div className={styles.box}>
					<RequestTokens></RequestTokens>
				</div>
				<div className={styles.box}>
					<Snapshot></Snapshot>
				</div>
				<div className={styles.box}>
					<Delegate></Delegate>
				</div>
				<div className={styles.box}>
					<Vote></Vote>
				</div>
				<div className={styles.box}>
					<Winner></Winner>
				</div>
			</div>
		</div>
	);
}


function signMessage(signer, message) {
	signer.signMessage(message).then((signature) => {
		console.log(signature)
	}, (error => console.error(error)))
}