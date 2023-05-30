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
            `http://localhost:3001/claim`,
            setLoading,
            setData
        )
    }, []);

    console.log(data)

    return (
        <>
            <div className="border-2 rounded-lg flex-col items-center text-center p-4">
                <h1 className="">Rewards</h1>
                <div className="text-left">
                    {!isLoading ? 
                        <p>Loading rewards...</p>
                        : 
                            data ?
                            <p>Available rewards: <span className="font-bold">{data}</span></p>
                            : 
                            <p>No rewards available</p>
                    }
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={claimReward}>Claim</button>
                </div>
            </div>
        </>
    )
    
    function claimReward() {
        fetch(`http://localhost:3001/claim`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error)
        });
    }
}