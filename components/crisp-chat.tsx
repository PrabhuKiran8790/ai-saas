"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
import { useAuth } from "@clerk/nextjs";

export const CrispChat = () => {
	const { isSignedIn } = useAuth();

	useEffect(() => {
		if (isSignedIn) {
			Crisp.configure("aa3e4d00-872b-4789-9b5d-0fd3c6d6af7f");
		}
	}, [isSignedIn]);

	return null;
};

const CrispChatProvider = () => {
	return (
		<>
			<CrispChat />
		</>
	);
};

export default CrispChatProvider;
