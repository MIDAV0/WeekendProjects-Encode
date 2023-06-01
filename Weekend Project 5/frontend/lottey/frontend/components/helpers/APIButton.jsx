import { useState } from 'react';
import getDataFromAPI from "../utils/fetcher";

export default function APIButton({ url, buttonName, method, className }) {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    return (
        <>
            <button
                className={className}
                disabled={isLoading}
                onClick={() => {
                    getDataFromAPI(
                        method,
                        {},
                        url,
                        setLoading,
                        setData
                    )
                }}
                >
                {isLoading ? "Loading..." : buttonName}
                </button>
        </>
    )
}