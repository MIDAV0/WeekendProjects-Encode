import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Navbar() {
	return (
		<nav className="flex justify-between items-center w-full p-4 mb-4 gap-2">
			<a className="font-bold text-gray-300 text-3xl" href="/">
				LotteryDApp
			</a>
			<ConnectButton></ConnectButton>
		</nav>
	);
}
