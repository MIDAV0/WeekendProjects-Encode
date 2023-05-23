import getDataFromAPI from "../utils/fetcher";
import { useState } from "react";

export default function Delegate({ signer }) {
	const [txData, setTxData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [delegateAddress, setDelegateAddress] = useState(null);
	
	return (
		<>
			<h1>Delegate votes</h1>
			<input type="text" placeholder="Delegate address" onChange={(e) => setDelegateAddress(e.target.value)}></input>
			<button
				onClick={() => delegateVotes(delegateAddress, setLoading, setTxData)}
				disabled={isLoading}
			>Delegate</button>
			<p>----</p>
			<button
				onClick={() => 
					getDataFromAPI(
						"GET",
						{},
						`http://localhost:3001/delegate-votes?delegate=${signer._address}`, 
						setLoading, 
						setTxData)
					}
				disabled={isLoading}
			>
				Delegate to yourself
			</button>

			<p>----</p>
			
			{ isLoading && 
				<p>Delegating ...</p>
			}
			{ txData &&
				<>
					<p>Transaction sent</p>
					<a href={"https://mumbai.polygonscan.com/tx/"+txData.hash} target="_blank">{txData.hash}</a>
				</>
			}
		</>
	)
}