import { useEffect, useState } from "react";
import getDataFromAPI from "../utils/fetcher";
import DataLoader from "../helpers/DataLoader";
import APIButton from "../helpers/APIButton";

// check if lottery is open
// if yes display bet option and lottery closing time and close lottery button and number of active bets
// if no display lottery closed
export default function Bet({ signer }) {
	const [state, setState] = useState(null);
	const [isLoadingState, setLoadingState] = useState(false);

    const [numberOfBets, setNumberOfBets] = useState(null);
    const [isLoadingNumberOfBets, setLoadingNumberOfBets] = useState(false);

    const [betsAmount, setBetsAmount] = useState(null);

    useEffect(() => {
        getDataFromAPI(
            "GET",
            {},
            `http://localhost:3001/lottery-state`, 
            setLoadingState, 
            setState)
        }, []);
    
    // useEffect(() => {
    //     getDataFromAPI(
    //         "GET",
    //         {},
    //         `http://localhost:3001/number-of-bets`, 
    //         setLoadingNumberOfBets, 
    //         setNumberOfBets)
    //     }, []);


    return (
        <>
            <div className="border-2 rounded-lg flex-row items-center text-center p-4">
                {state ?
                     state.state ?
                        <div>
                            <p>Lottery is open until {state.closingDate}</p>
                            <p>Number of active bets: {numberOfBets}</p>
                            <p>Cost of single bet</p>
                            <div className="flex justify-center gap-4 mt-2">
                                <input 
                                    type="number" 
                                    placeholder="Prize amount"
                                    className="input input-bordered input-warning"
                                    onChange={(e) => setTokenAmount(e.target.value)}    
                                />
                                <APIButton
                                    url={`http://localhost:3001/bet`}
                                    buttonName="Bet"
                                    method={"GET"}
                                />
                            </div>
                            <div className="mt-4">
                                <APIButton
                                    url={`http://localhost:3001/close-lottery`}
                                    buttonName="Close bets"
                                    method={"GET"}
                                />
                            </div>
                        </div>
                        :
                        <div className="flex justify-center items-center text-xl text-yellow-500 h-20">
                                Lottery is closed
                        </div>
                    : 
                        <span className="font-bold text-yellow-500 loading loading-infinity loading-lg"></span>
                    }
            </div>
        </>
    )
}