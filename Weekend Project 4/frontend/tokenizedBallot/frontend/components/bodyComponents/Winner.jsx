import { useState, useEffect } from "react";
import getDataFromAPI from "../utils/fetcher";

export default function Winner({signer}) {

	const [isBlockLoading, setBlockLoading] = useState(false);
	const [blockNumber, setBlockNumber] = useState(null);

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
					(blockNumber && Number(blockNumber.hex) !== 1) ?
					<p>Voting in progress</p>
					:
					<p>Voting has not started yet</p>
			}
		</>
	)
}