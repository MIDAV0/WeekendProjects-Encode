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
    const [bet, setBet] = useState(null);
    const [isLoadingBet, setLoadingBet] = useState(false);
    const [closeLottery, setCloseLottery] = useState(null);
    const [isLoadingCloseLottery, setLoadingCloseLottery] = useState(false);

    const [numberOfBets, setNumberOfBets] = useState(null);
    const [isLoadingNumberOfBets, setLoadingNumberOfBets] = useState(false);


    const [betTimes, setBetTimes] = useState(null);

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
                                    <div class="w-70">
                                        <div class="relative h-10 w-full min-w-[200px]">
                                            <input
                                                class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=" "
                                                type="number"
                                                min="0"
                                                onChange={(e) => setBetsAmount(e.target.value)}
                                                />
                                            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Number of bets
                                            </label>
                                        </div>
                                    </div>
                                    <APIButton
                                        url={`http://localhost:3001/bet`}
                                        buttonName="Bet"
                                        method={"GET"}
                                        className={"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"}
                                    />
                            </div>
                            <div className="mt-4">
                                <APIButton
                                    url={`http://localhost:3001/close-lottery`}
                                    buttonName="Bet"
                                    method={"GET"}
                                    className={"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"}
                                />
                            </div>
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