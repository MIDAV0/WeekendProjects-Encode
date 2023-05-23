import { useState, useEffect } from "react";
import getDataFromAPI from "../utils/fetcher";

const adminAddresses = [
	"0x65315D8c187178bfFfA37C400f0C8842e0724D24"
]

export default function Snapshot({ signer }) {
	const [txData, setTxData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const permitted = adminAddresses.find((address) => address === signer?._address);

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
			<div>
				<h1>Snapshot</h1>
				{blockNumber && Number(blockNumber.hex) !== 1 &&
					<p>Snapshot was made at block: {Number(blockNumber.hex)}</p>
				}
				{
					<button
						disabled={
							!permitted ||
							isLoading ||
							isBlockLoading 
						}
						onClick={() => 
							getDataFromAPI(
								"GET",
								{},
								`http://localhost:3001/make-snapshot`, 
								setLoading, 
								setTxData)
							}
					>
						Make Snapshot
					</button>
				}
			</div>
		</>
	)
}