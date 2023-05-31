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
            Loading...
        </>
    )

    if (data) return (
        <>
            {data.value}
        </>
    )

    return (
        <>
            {noDataMessage}   
        </>
    )
}