"use client";

import Image from "next/image";
import Link from "next/link";
import { Bungee_Spice } from "next/font/google";
import { usePathname } from "next/navigation";

import { routes } from "@/constants";
import { cn } from "@/lib/utils";

import ApiUsageCounter from "./apiUsageCounter";

const bungee_spice = Bungee_Spice({ weight: "400", subsets: ["latin"] });

interface sidebarProps {
	apiLimitCount: number;
	isPro: boolean;
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: sidebarProps) => {
	const pathname = usePathname();
	return (
		<div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
			<div className="px-3 py-2 flex-1">
				<Link href="/dashboard" className="flex items-center pl-3 mb-14">
					<div className="relative mr-4 w-8 h-8">
						<Image fill src="/logo.png" alt="logo" />
					</div>
					<h1
						className={cn(
							"text-2xl font-bold text-orange-400",
							bungee_spice.className,
						)}
					>
						Multi-GPT
					</h1>
				</Link>
				<div className="space-y-1">
					{routes.map((route) => (
						<Link
							key={route.href}
							href={route.href}
							className={cn(
								"text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
								pathname === route.href
									? "text-white bg-white/10"
									: "text-zinc-400",
							)}
						>
							<div className="flex items-center flex-1">
								<route.icon className={cn("h-5 w-5 mr-3", route.color)} />
								{route.label}
							</div>
						</Link>
					))}
				</div>
			</div>
			<ApiUsageCounter apiLimitCount={apiLimitCount} isPro={isPro} />
		</div>
	);
};

export default Sidebar;
