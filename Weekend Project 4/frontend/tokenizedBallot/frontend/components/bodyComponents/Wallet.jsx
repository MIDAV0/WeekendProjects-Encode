export default function Wallet() {
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