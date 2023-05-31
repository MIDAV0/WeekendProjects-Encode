import { useEffect, useState } from "react";
import getDataFromAPI from "../utils/fetcher";

// load available rewards
// display rewards
// display claim button
export default function ClaimReward({ signer, isLoadingWallet, chain}) {

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
        getDataFromAPI(
            "GET",
            {},
            `http://localhost:3001/display-prize?address=${signer?._address}`,
            setLoading,
            setData
        )
    }, []);



    return (
        <>
            <div className="border-2 rounded-lg flex-col items-center text-center p-4">
                <h1 className="">Rewards</h1>
                <div className="text-left">
                    {!isLoading ? 
                        <p>Loading rewards...</p>
                        : 
                            data || data === 0 ?
                            <p>Available rewards: <span className="font-bold">{data}</span></p>
                            : 
                            <p>No rewards available</p>
                    }
                    <button 
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={claimRewards(data)}
                        disabled={!data}    
                    >
                        Claim
                        </button>
                </div>
            </div>
        </>
    )
    
    function claimRewards(amount) {
        fetch(`http://localhost:3001/claim-prize?amount=${amount}`)
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
        })
        .catch((error) => {
            console.error(error)
        });
    }
}