import styles from "../styles/Home.module.css";
import InstructionsComponent from "../components/InstructionsComponent";

export default function Home() {
  return (
    <div>
      <main className="px-6 flex h-[90vh] justify-center">
        <InstructionsComponent></InstructionsComponent>
      </main>
    </div>
  );
}
