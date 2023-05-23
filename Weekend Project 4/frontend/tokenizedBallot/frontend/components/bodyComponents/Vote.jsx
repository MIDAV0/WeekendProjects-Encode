export default function Vote() {
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
