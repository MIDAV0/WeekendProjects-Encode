export default function Snapshot() {
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