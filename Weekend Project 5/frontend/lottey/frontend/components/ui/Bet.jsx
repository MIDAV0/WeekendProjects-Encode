import { useEffect, useState } from "react";
import getDataFromAPI from "../utils/fetcher";
import DataLoader from "../helpers/DataLoader";

// check if lottery is open
// if yes display bet option and lottery closing time and close lottery button and number of active bets
// if no display lottery closed
export default function Bet({ signer }) {
	const [state, setState] = useState(null);
	const [isLoadingState, setLoadingState] = useState(false);
    const [bet, setBet] = useState(null);
    const [isLoadingBet, setLoadingBet] = useState(false);
    const [closeLottery, setCloseLottery] = useState(null);
    const [isLoadingCloseLottery, setLoadingCloseLottery] = useState(false);

    const [numberOfBets, setNumberOfBets] = useState(null);
    const [isLoadingNumberOfBets, setLoadingNumberOfBets] = useState(false);


    const [betTimes, setBetTimes] = useState(null);

    useEffect(() => {
        getDataFromAPI(
            "GET",
            {},
            `http://localhost:3001/lottery-state`, 
            setLoadingState, 
            setState)
        }, []);
    
    useEffect(() => {
        getDataFromAPI(
            "GET",
            {},
            `http://localhost:3001/number-of-bets`, 
            setLoadingNumberOfBets, 
            setNumberOfBets)
        }, []);


    return (
        <>
            <div className="border-2 rounded-lg flex-row items-center text-center p-4">
                {state ?
                     state.lotteryOpen ?
                        <div>
                            <p>Lottery is open until {state.closingTime}</p>
                            <p>Number of active bets: {numberOfBets}</p>

                            <div>
                                <p>Place your bet</p>
                                <input type="number" placeholder="Enter your bet"/>
                                <button
                                    disabled={betTimes === 0 || isLoadingBet}
                                    onClick={() => {
                                        getDataFromAPI(
                                            "GET",
                                            {},
                                            `http://localhost:3001/bet`,
                                            setLoadingBet,
                                            setBet
                                        )
                                    }}
                                >Bet</button>
                            </div>
                            <button
                                disabled={isLoadingState || isLoadingBet || isLoadingCloseLottery}
                                onClick={() => {
                                    getDataFromAPI(
                                        "GET",
                                        {},
                                        `http://localhost:3001/close-lottery`,
                                        setLoadingCloseLottery,
                                        setCloseLottery
                                    )
                                }}
                            >Close lottery</button>
                        </div>
                        :
                        <div>
                            <p>Lottery is closed</p>
                        </div>
                    : 
                    <p>Loading lottery data...</p>
                }
            </div>
        </>
    )
}