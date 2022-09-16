import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function WindowComponent({ children, toggleData }) {
	const windowRef = useRef(null);
	const openerRef = useRef(null);
	const [container] = useState(document.createElement("div"));

	useEffect(() => {
		windowRef.current = window.open("", "", "width=400,height=200");

		windowRef.current.addEventListener("beforeunload", () => {
			toggleData();
		});

		openerRef.current = windowRef.current.opener;

		openerRef.current.addEventListener("beforeunload", () => {
			windowRef.current.close();
		});

		return () => {
			windowRef.current.close();
		};
	}, []);

	useEffect(() => {
		if (windowRef.current) {
			windowRef.current.document.body.appendChild(container);
		}
	}, [windowRef.current]);

	return createPortal(children, container);
}

export default WindowComponent;
