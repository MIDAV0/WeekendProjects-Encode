import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useSigner, useNetwork } from "wagmi";
import Vote from "./bodyComponents/Vote";
import Delegate from "./bodyComponents/Delegate";
import Snapshot from "./bodyComponents/Snapshot";
import Wallet from "./bodyComponents/Wallet";
import RequestTokens from "./bodyComponents/RequestTokens";
import Winner from "./bodyComponents/Winner";

export default function InstructionsComponent() {
	const router = useRouter();
	const { data: signer, isLoading } = useSigner();
	const { chain, chains } = useNetwork();

	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					<span>My Dapp</span>
				</h1>
			</header>

			<div className={styles.components}>
				<div className={styles.box}>
					<Wallet
						signer={signer}
						isLoadingWallet={isLoading}
						chain={chain}
						chains={chains}
					/>
				</div>
				<div className={styles.box}>
					<RequestTokens
						signer={signer}
					/>
				</div>
				<div className={styles.box}>
					<Snapshot
						signer={signer}
					/>
				</div>
				<div className={styles.box}>
					<Delegate
						signer={signer}
					/>
				</div>
				<div className={styles.box}>
					<Vote
						signer={signer}
					/>
				</div>
				<div className={styles.box}>
					<Winner
						signer={signer}
					/>
				</div>
			</div>
		</div>
	);
}