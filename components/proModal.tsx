"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { useProModal } from "@/hooks/useProModal";
import { tools } from "@/constants";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

const ProModal = () => {
	const [loading, setLoading] = useState(false);
	const proModal = useProModal();
	const onSubscribe = async () => {
		try {
			setLoading(true)
			const response = await axios.get("/api/stripe");

			window.location.href = response.data.url;
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center justify-center flex-col gap-y-4 pb-2">
						<div className="flex items-center gap-x-2 font-bold py-1">
							Upgrade to MultiGPT
							<Badge className="uppercase text-sm py-1" variant={"gradient"}>
								Pro
							</Badge>
						</div>
					</DialogTitle>
					<DialogDescription className="text-center pt-2 text-zinc-900 font-medium space-y-2">
						{tools.map((tool) => (
							<Card
								key={tool.label}
								className="p-3 border-black/5 flex items-center justify-between"
							>
								<div className="flex items-center gap-x-4">
									<div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
										<tool.icon />
									</div>
									<div>{tool.label}</div>
								</div>
								<Check className="text-primary w-5 h-5" />
							</Card>
						))}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button onClick={onSubscribe} className="w-full" variant="gradient" size={"lg"}>
						Upgrade
						<Zap className="w-4 h-4 ml-2 fill-white" />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ProModal;
