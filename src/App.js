import { useState, useRef, useEffect } from "react";
import WindowComponent from "./WindowComponent";

function App() {
	const [windowOpen, setWindowOpen] = useState(false);
	const [buttonText, setButtonText] = useState("window open");

	const toggleData = () => {
		const newButtonText =
			buttonText === "window open" ? "window close" : "window open";
		setButtonText(newButtonText);
		setWindowOpen(!windowOpen);
	};

	const onClickButton = () => {
		toggleData();
	};

	useEffect(() => {
		return () => {
			setWindowOpen(false);
		};
	}, []);

	return (
		<div>
			<button onClick={onClickButton}>{buttonText}</button>
			{windowOpen ? (
				<WindowComponent toggleData={toggleData}>Hello world!</WindowComponent>
			) : null}
		</div>
	);
}

export default App;
