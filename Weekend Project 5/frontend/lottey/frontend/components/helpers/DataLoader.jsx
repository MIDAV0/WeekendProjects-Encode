import getDataFromAPI from "../utils/fetcher";
import { useEffect, useState } from "react";

export default function DataLoader({ noDataMessage, url }) {
    
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
        getDataFromAPI(
            "GET",
            {},
            url,
            setLoading,
            setData
        )
    }, []);


    if (isLoading) return (
        <>
            <span className="font-bold text-yellow-500 loading loading-infinity loading-md"></span>
        </>
    )

    if (data) return (
        <>
            <span className="font-bold text-green-500">
                {data.value}
            </span>
        </>
    )

    return (
        <>
            {noDataMessage}   
        </>
    )
}