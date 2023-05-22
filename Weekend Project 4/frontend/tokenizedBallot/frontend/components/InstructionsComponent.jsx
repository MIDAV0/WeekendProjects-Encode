import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useSigner, useNetwork, useBalance } from "wagmi";
import { useState, useEffect } from "react";

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
	const { data: signer } = useSigner();
	const [isLoading, setLoading] = useState(false);
	const [proposals, setProposals] = useState([]);
	const [proposalId, setProposalId] = useState(null);

	useEffect(() => {
		fetch('http://localhost:3001/get-proposals')
		.then((res) => res.json())
		.then((data) => {
			setProposals(data);
			setLoading(false);
		})
	}, [])


	return (
		<>
			<h1>Vote</h1>

			{ proposals.map((index, proposal) => (
					<div>
						<p>{proposal} : {index}</p>
					</div>
			))}
			<input type="number" placeholder="Proposal ID" onChange={(e) => setProposalId(e.target.value)}></input>
			<button
				onClick={() => castVote(proposalId, setLoading, setTxData)}
				disabled={isLoading}
			>Vote</button>
		</>
	)
}

function castVote(proposalId, setLoading, setData) {
	setLoading(true);

	fetch(`http://localhost:3001/vote?proposalId=${proposalId}`)
	.then((res) => res.json())
	.then((data) => {
		setData(data);
		setLoading(false);
	})
	.catch((error) => {
		console.error(error)
	});
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


function Snapshot() {
	const { data: signer } = useSigner();
	const [txData, setTxData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [delegateAddress, setDelegateAddress] = useState(null);

	const permitted = adminAddresses.find((address) => address === signer?._address);

	return (
		<>
			<div>
				<h1>Snapshot</h1>
				{
					txData ?
					<p>Snapshot was made at block {txData}</p> :
					<button
						disabled={!permitted || isLoading}
						onClick={() => getSnapshot(setLoading, setTxData)}
					>
						{permitted ? "Snapshot" : "Not permitted"}
					</button>
				}
			</div>
		</>
	)
}

function getSnapshot(setLoading, setData) {	
	setLoading(true);

	fetch(`http://localhost:3001/make-snapshot`)
	.then((res) => res.json())
	.then((data) => {
		setData(data);
		setLoading(false);
	})
	.catch((error) => {
		console.error(error)
	});
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