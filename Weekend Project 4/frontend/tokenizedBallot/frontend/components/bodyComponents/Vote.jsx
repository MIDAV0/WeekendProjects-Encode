import { useState, useEffect } from "react";
import getDataFromAPI from "../utils/fetcher";

export default function Vote({ signer }) {
	const [isLoading, setLoading] = useState(false);
	const [txData, setTxData] = useState(null);

	const [isProposalLoading, setProposalLoading] = useState(false);
	const [proposals, setProposals] = useState([]);
	const [proposalId, setProposalId] = useState(null);

	const [voteAmount, setVoteAmount] = useState(0);

	const [isBlockLoading, setBlockLoading] = useState(false);
	const [blockNumber, setBlockNumber] = useState(null);

	const votes = []

	const signerAddress = signer?._address

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
			<input type="number" placeholder="Amount" onChange={(e) => setVoteAmount(e.target.value)}></input>
			<button
				onClick={() => 
					{
						useEffect(() => {
							getDataFromAPI(
								"GET",
								{},
								`http://localhost:3001/vote?proposalId=${proposalId}&amount=${voteAmount}`, 
								setLoading, 
								setTxData)
						}, [])
						if (txData) {
							votes.push({signerAddress, proposalId, voteAmount})
						}
						setVoteAmount(0)
						setProposalId(null)
					}
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
