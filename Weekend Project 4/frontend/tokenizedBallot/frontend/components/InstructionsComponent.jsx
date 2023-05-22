import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useSigner, useNetwork, useBalance } from "wagmi";
import { useState, useEffect } from "react";

const adminAddresses = [

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
				{/* <div className={styles.box}>
					<Snapshot></Snapshot>
				</div> */}
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

function Winner() {
	return (
		<>
			<h1>Winning proposal</h1>
			<p>----</p>
			<p>----</p>
		</>
	)
}

function Vote() {
	return (
		<>
			<h1>Vote</h1>
			<button>Vote</button>
		</>
	)
}

function Delegate() {
	const { data: signer } = useSigner();
	const [txData, setTxData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [delegateAddress, setDelegateAddress] = useState(null);
	
	return (
		<>
			<h1>Delegate votes</h1>
			<input type="text" placeholder="Delegate address" onChange={(e) => setDelegateAddress(e.target.value)}></input>
			<button
				onClick={() => delegateVotes(delegateAddress, setLoading, setTxData)}
				disabled={isLoading}
			>Delegate</button>
			<p>----</p>
			<button
				onClick={() => delegateVotes(signer._address, setLoading, setTxData)}
				disabled={isLoading}
			>Delegate to yourself</button>
			<p>----</p>
			{ isLoading && 
				<p>Delegating ...</p>
			}
			{ txData &&
				<>
					<p>Transaction sent</p>
					<a href={"https://mumbai.polygonscan.com/tx/"+txData.hash} target="_blank">{txData.hash}</a>
				</>
			}
		</>
	)
}

function delegateVotes(address, setLoading, setData) {
	setLoading(true);

	fetch(`http://localhost:3001/delegate-votes?delegate=${address}`)
	.then((res) => res.json())
	.then((data) => {
		setData(data);
		setLoading(false);
	})
	.catch((error) => {
		console.error(error)
	});
}


// function Snapshot() {
// 	const { data: signer } = useSigner();
// 	const permitted = signer?._address in adminAddresses
// 	const snapshot = getSnapshot();

// 	const [snapShotData, setSnapShotData] = useState(null);
// 	const [isLoading, setLoading] = useState(false);

// 	useEffect(() => {
// 		setLoading(true);
// 		fetch('http://localhost:3001/api/requestBalance')
// 		.then((res) => res.json())
// 		.then((dataTx) => {
// 			setSnapShotData(dataTx);
// 			setLoading(false);
// 		})
// 		.catch((error) => {
// 			console.error(error)
// 		});
// 	}, []);

// 	if (isLoading) return <p>Loading...</p>;
// 	if (!snapShotData) return <p>No token data</p>;
	
// 	return (
// 		<>
// 			<div>
// 				<h1>Snapshot</h1>
// 				{
// 					snapShotData !== 1 ?
// 					<p>Snapshot was made at block {snapShotData}</p> :
// 					<button
// 						disabled={!permitted}
// 						onClick={() => {}}
// 					>
// 						{permitted ? "Snapshot" : "Not permitted"}
// 					</button>
// 				}
// 			</div>
// 		</>
// 	)
// }

async function getSnapshot() {	
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch('http://localhost:3001/api/requestSnapshot')
		.then((res) => res.json())
		.then((data) => {
			setData(data);
		})
		.catch((error) => {
			console.error(error)
		});
	}, []);
	return data
}

function Wallet() {
	const { data: signer, isError, isLoading } = useSigner();
	const { chain, chains } = useNetwork();

	if (signer) {
		return (
			<>
				<p>Your address is {signer._address}</p>
				<p>Connected to {chain.name} network</p>
				<WalletBalance></WalletBalance>
				
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

function getTokenBalance(signer) {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	
	useEffect(() => {
		setLoading(true);
		fetch(`http://localhost:3001/addressTokenBalance?address=${signer._address}`)
		.then((res) => res.json())
		.then((data) => {
			const converted = Number(data.hex) / 10**18
			setData(converted);
			setLoading(false);
		})
		.catch((error) => {
			console.error(error)
		});
	}, []);
	
	if (isLoading) return <p>Loading...</p>;
	if (!data) return <p>No token data</p>;
	
	return (
		<div>
			Token balance: {data}
		</div>
	);
}

function getVotes(signer){
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	
	useEffect(() => {
		setLoading(true);
		fetch(`http://localhost:3001/addressVotingPower?address=${signer._address}`)
		.then((res) => res.json())
		.then((data) => {
			const converted = Number(data.hex) / 10**18
			setData(converted);
			setLoading(false);
		})
		.catch((error) => {
			console.error(error)
		});
	}, []);
	
	if (isLoading) return <p>Loading...</p>;
	if (!data) return <p>No votes data</p>;
	
	return (
		<div>
			Voting power: {data}
		</div>
	);
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
			{getTokenBalance(signer)}
			{getVotes(signer)}
		</>
	)
}

function RequestTokens() {
	const [txData, setTxData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const { data: signer } = useSigner();
	const [number, setNumber] = useState(0);


	if (txData) {
		return (
			<>
				<p>Transaction sent</p>
				<a href={"https://mumbai.polygonscan.com/tx/"+txData.hash} target="_blank">{txData.hash}</a>
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
				<h1>Request Tokens</h1>
				<input type="number" value={number} onChange={(e) => setNumber(e.target.value)}></input>
				<button onClick={() => requestTokens(signer, "signature", number, setLoading, setTxData)}>Request</button>
			</div>
		</>
	)
}

function requestTokens(signer, signature, amount, setLoading, setTxData) {
	setLoading(true);
	const reqestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ address: signer._address, signature: signature, amount: amount })
	};
	fetch('http://localhost:3001/request-tokens', reqestOptions)
		.then((res) => res.json())
		.then((data) => {
			setTxData(data);
			setLoading(false);
	})
}