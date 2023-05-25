import { useState, useEffect } from "react";
import getDataFromAPI from "../utils/fetcher";
import { ethers } from "ethers";

export default function Winner({signer}) {

	const [isBlockLoading, setBlockLoading] = useState(false);
	const [blockNumber, setBlockNumber] = useState(null);

	const [isProposalLoading, setProposalLoading] = useState(false);
	const [winningProposal, setWinningProposal] = useState(null);

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
			<h1>Winning proposal</h1>
			{	isBlockLoading ?
				<p>Loading ...</p>
				:
					(blockNumber && Number(blockNumber.hex) === 1) ?
						<p>Voting has not started yet</p>
					:
						!winningProposal ?
							<button
								onClick={() =>
									getDataFromAPI(
										"GET", 
										{}, 
										"http://localhost:3001/winning-proposal", 
										setProposalLoading, 
										setWinningProposal)
								}
								disabled={isProposalLoading}
							>
								Get winning proposal
							</button>
						:
							<p>Winning proposal: {winningProposal?.data.toString()}</p>
			}
		</>
	)
}