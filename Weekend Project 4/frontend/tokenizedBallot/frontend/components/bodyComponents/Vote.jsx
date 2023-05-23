import { useState, useEffect } from "react";
import getDataFromAPI from "../utils/fetcher";

export default function Vote({ signer }) {
	const [isLoading, setLoading] = useState(false);
	const [isProposalLoading, setProposalLoading] = useState(false);
	const [proposals, setProposals] = useState([]);
	const [proposalId, setProposalId] = useState(null);

	const [isBlockLoading, setBlockLoading] = useState(false);
	const [blockNumber, setBlockNumber] = useState(null);

	useEffect(() => {
		getDataFromAPI(
			"GET", 
			{}, 
			"http://localhost:3001/get-proposals", 
			setProposalLoading, 
			setProposals)
	}, [])

	useEffect(() => {
		getDataFromAPI(
			"GET", 
			{}, 
			"http://localhost:3001/get-snapshot-block", 
			setBlockLoading, 
			setBlockNumber)
	}, [])


	return (
		<>
			<h1>Vote</h1>

			{ isProposalLoading ? <p>Loading proposals ...</p> :
				proposals.length === 0 ? <p>No proposals</p> :
					proposals.map((index, proposal) => (
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
				disabled={
					isLoading || 
					proposals.length === 0 || 
					isBlockLoading || 
					Number(blockNumber.hex) === 1
				}
			>
				Vote
			</button>
		</>
	)
}
