import { useState } from 'react';
import getDataFromAPI from "../utils/fetcher";

export default function APIButton({ url, buttonName, method }) {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    return (
        <>
            <button
                className="btn bg-yellow-500 text-gray-900 hover:bg-yellow-800 hover:text-gray-300"
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
                {isLoading ? 
                    <span className="loading loading-spinner"></span>
                : 
                    buttonName
                }
                </button>
        </>
    )
}