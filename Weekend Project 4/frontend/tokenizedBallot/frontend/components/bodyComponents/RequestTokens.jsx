import { useState } from "react";
import getDataFromAPI from "../utils/fetcher";

export default function RequestTokens({ signer }) {
	const [txData, setTxData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [number, setNumber] = useState(0);


	if (txData) {
		return (
			<>
				<p>Transaction sent</p>
				<a href={"https://mumbai.polygonscan.com/tx/"+txData.hash} target="_blank">{txData.hash}</a>
			</>
		)
	}
	if (isLoading) {
		return (
			<>
				<p>Requesting tokens ...</p>
			</>
		)
	}
	return (
		<>
			<div>
				<h1>Request Tokens</h1>
				<input type="number" value={number} onChange={(e) => setNumber(e.target.value)}></input>
				<button 
                    onClick={() => 
                        getDataFromAPI(
                            "POST", 
                            { 
                                address: signer._address, 
                                signature: "signature", 
                                amount: number 
                            }, 
                            'http://localhost:3001/request-tokens', 
                            setLoading, 
                            setTxData)
                        }
                >
                    Request
                </button>
			</div>
		</>
	)
}