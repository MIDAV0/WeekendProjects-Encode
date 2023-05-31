import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import UserInfo from "./ui/UserInfo";
import Bet from "./ui/Bet";
import { useSigner, useNetwork } from "wagmi";
import ClaimReward from "./ui/ClaimReward";


export default function InstructionsComponent() {
	const router = useRouter();
	const { data: signer, isLoading } = useSigner();
	const { chain, chains } = useNetwork();

	return (
		<div className="text-white flex justify-between items-center w-full h-full p-2">
			<UserInfo
				signer={signer}
				isLoadingWallet={isLoading}
				chain={chain}
			/>
			<Bet
				signer={signer}
				isLoadingWallet={isLoading}
				chain={chain}
			/>
			<ClaimReward
				signer={signer}
				isLoadingWallet={isLoading}
			/>
		</div>
	);
}
