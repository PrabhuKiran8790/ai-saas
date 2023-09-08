"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";

interface SubscriptionButtonProps {
	isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
	const [loading, setLoading] = useState(false);

	const onClick = async () => {
		try {
            setLoading(true);
			const response = await axios.get("/api/stripe");
			window.location.href = response.data.url;
		} catch (error) {
			console.log("BILLING PORTAL ERROR: ", error);
		} finally {
            setLoading(false);
        }
	};

	return (
		<Button disabled={loading} variant={isPro ? "gradient" : "default"} onClick={onClick}>
			{isPro ? "Manage Subscription" : "Upgrade"}
			{isPro && <Zap className="ml-2 w-4 h-4 fill-white" />}
		</Button>
	);
};

export default SubscriptionButton;
