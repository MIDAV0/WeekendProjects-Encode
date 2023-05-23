export default function Delegate() {
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
