import { useState, useEffect } from "react";
import getDataFromAPI from "../utils/fetcher";

export default function Vote({ signer }) {
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
				onClick={() => 
					getDataFromAPI(
						"GET",
						{},
						`http://localhost:3001/vote?proposalId=${proposalId}`, 
						setLoading, 
						setTxData)
					}
				disabled={isLoading}
			>
				Vote
			</button>
		</>
	)
}
