import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_API_LIMIT } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/useProModal";

const ApiUsageCounter = ({
	apiLimitCount = 0,
	isPro = false,
}: { apiLimitCount: number; isPro: boolean }) => {
	const [mounted, setMounted] = useState(false);
	const proModal = useProModal();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	if (isPro) {
		return null;
	}

	return (
		<div className="px-3">
			<Card className="bg-white/10 border-0">
				<CardContent className="py-6">
					<div className="text-center text-sm text-white mb-4 space-y-2">
						<p>
							{apiLimitCount} / {MAX_FREE_API_LIMIT} Free Credits
						</p>
						<Progress
							className="h-3"
							value={(apiLimitCount / MAX_FREE_API_LIMIT) * 100}
						/>
					</div>
					<Button
						onClick={proModal.onOpen}
						variant="gradient"
						className="w-full"
					>
						Upgrade
						<Zap className="w-4 h-4 ml-2 fill-white" />
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default ApiUsageCounter;
