import { useState } from "react";
import getDataFromAPI from "../utils/fetcher";

const adminAddresses = [
	"0x65315D8c187178bfFfA37C400f0C8842e0724D24"
]

export default function Snapshot({ signer }) {
	const [txData, setTxData] = useState(null);
	const [isLoading, setLoading] = useState(false);

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
						onClick={() => 
                            getDataFromAPI(
                                "GET",
                                {},
                                `http://localhost:3001/make-snapshot`, 
                                setLoading, 
                                setTxData)
                            }
					>
						{permitted ? "Snapshot" : "Not permitted"}
					</button>
				}
			</div>
		</>
	)
}