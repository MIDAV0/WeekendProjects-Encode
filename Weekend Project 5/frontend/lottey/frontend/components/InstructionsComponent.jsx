import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import UserInfo from "./ui/UserInfo";
import Bet from "./ui/Bet";
import { useSigner, useNetwork } from "wagmi";
import ClaimReward from "./ui/ClaimReward";

const TARGET_CHAIN = "Polygon Mumbai"


export default function InstructionsComponent() {
	const router = useRouter();
	const { data: signer, isLoading } = useSigner();
	const { chain, chains } = useNetwork();

	if (signer) {
		if (chain.name === TARGET_CHAIN)
			return (
				<div className="text-white grid grid-cols-4 gap-4 p-4">
					<div>
						<UserInfo
							signer={signer}
							chain={chain}
						/>
					</div>
					<div className="col-span-2">
					<Bet
						signer={signer}
					/>	
					</div>
					<div>
						<ClaimReward
							signer={signer}
						/>
					</div>
				</div>
			)
		else
			return (
				<div className="text-white flex justify-center items-center">
					<div className="border-2 rounded-xl border-cyan-500 p-6 bg-cyan-500 text-4xl">
						Switch to Polygon Mumbai network
					</div>
				</div>
			)	
	}

	if (isLoading) return (
		<div className="text-white flex justify-center items-center">
			<div className="border-2 rounded-xl border-cyan-500 p-6 bg-cyan-500 text-4xl">
				Loading wallet ... 
			</div>
		</div>
	)

	return (
		<div className="text-white flex justify-center items-center">
			<div className="border-2 rounded-xl border-cyan-500 p-6 bg-cyan-500 text-4xl">
				Connect wallet
			</div>
		</div>
	)
}