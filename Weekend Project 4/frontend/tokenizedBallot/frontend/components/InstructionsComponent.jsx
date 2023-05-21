import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useSigner, useNetwork, useBalance } from "wagmi";
import { useState, useEffect } from "react";

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					<span>My Dapp</span>
				</h1>
			</header>

			<div className={styles.buttons_container}>
				<Wallet></Wallet>
				<RequestTokens></RequestTokens>
			</div>
			<div className={styles.footer}>
				Footer
			</div>
		</div>
	);
}

function Wallet() {
	const { data: signer, isError, isLoading } = useSigner();
	const { chain, chains } = useNetwork();

	if (signer) {
		return (
			<>
				<p>Your address is {signer._address}</p>
				<p>Connected to {chain.name} network</p>
				<button onClick={() => signMessage(signer, "I am Vadzim")}>Sign</button>
				<WalletBalance></WalletBalance>
				<ApiInfo></ApiInfo>
			</>
		)
	}
	
	else if (isLoading) {
		return (
			<>
				<p>Loading...</p>
			</>
		)
	}

	return (
		<>
			<p>Connect your wallet</p>
		</>
	)
}

function signMessage(signer, message) {
	signer.signMessage(message).then((signature) => {
		console.log(signature)
	}, (error => console.error(error)))
}

function WalletBalance() {
	const { data: signer } = useSigner();
	const { data, isError, isLoading } = useBalance({address: signer._address});
	if (isError) return <p>Error</p>
	if (isLoading) return <p>Loading...</p>
	return(
		<>
			<p>Balance is {data?.formatted} {data?.symbol}</p>
		</>
	)
}

function ApiInfo() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	
	useEffect(() => {
		setLoading(true);
		fetch('https://random-data-api.com/api/v2/users')
		.then((res) => res.json())
		.then((data) => {
			setData(data);
			setLoading(false);
		});
	}, []);
	
	if (isLoading) return <p>Loading...</p>;
	if (!data) return <p>No profile data</p>;
	
	return (
		<div>
			<h1>{data.username}</h1>
			<p>{data.email}</p>
		</div>
	);
}

function RequestTokens() {
	const [txData, setTxData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const { data: signer } = useSigner();


	if (txData) {
		return (
			<>
				<p>Transaction sent</p>
				<a href={"http://sepolia.etherscen.io/tx/"+txData.hash} target="_blank">{txData.hash}</a>
				<p>Transaction hash: {txData.hash}</p>
			</>
		)
	}
	if (isLoading) {
		return (
			<>
				<p>Requesting tokens ...</p>
			</>
		)
	}
	return (
		<>
			<div>
				<button onClick={() => requestTokens(signer, "signature", setLoading, setTxData)}>Request Tokens</button>
			</div>
		</>
	)
}

function requestTokens(signer, signature, setLoading, setTxData) {
	setLoading(true);
	const reqestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ address: signer._address, signature: signature })
	};
	fetch('http://localhost:3001/api/requestTokens', reqestOptions)
		.then((res) => res.json())
		.then((data) => {
			setTxData(data);
			setLoading(false);
	})
}