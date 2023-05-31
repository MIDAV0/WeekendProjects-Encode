import { useEffect, useState } from "react";

export default function UserInfo({ signer, isLoadingWallet, chain}) {

    if (signer) return (
        <>
            <div className="border-2 rounded-lg flex-row items-center text-center p-4">
                <h1 className="">User info</h1>
                <div className="text-left">
                    <p>Your address is {signer._address}</p>
                    <p>Connected to {chain.name} network</p> 
                    <p>Lottery tokens: <span className="font-bold">{getLotteryTokens()}</span></p>
                </div>
            </div>
        </>
    )
    if (isLoadingWallet) return <p>Loading...</p>
    return <p>Connect your wallet</p>
}

function getLotteryTokens() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/token-balance`)
        .then((res) => res.json())
        .then((data) => {
            setData(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error)
        });
    }, []);
    
    if (isLoading) return "Loading...";
    if (!data && data !== 0) return "No token data";
    return data;
}