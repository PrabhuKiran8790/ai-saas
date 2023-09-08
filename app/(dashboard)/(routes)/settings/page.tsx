import { Heading } from "@/components/heading";
import SubscriptionButton from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { SettingsIcon } from "lucide-react";

const Settings = async () => {
	const isPro = await checkSubscription();

	return (
		<div>
			<Heading
				title="Settings"
				description="Manage your account settings and set e-mail preferences."
				icon={SettingsIcon}
				bgColor="bg-gray-200"
			/>
			<div className="px-4 lg:px-8 space-y-4">
				<div className="text-muted-foreground text-sm">
					{isPro
						? "You are currently on a pro plan"
						: "You are on a free plan. Upgrade to pro to unlock more credits"}
				</div>
				<SubscriptionButton isPro={isPro} />
			</div>
		</div>
	);
};

export default Settings;
