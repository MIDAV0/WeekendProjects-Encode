export default function RequestTokens() {
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