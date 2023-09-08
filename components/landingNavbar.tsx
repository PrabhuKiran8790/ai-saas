"use client";

import { Bungee_Spice, Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs"; // clerk component for auth in client side
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const bungee_spice = Bungee_Spice({ weight: "400", subsets: ["latin"] });

const LandingNavBar = () => {
	const { isSignedIn } = useAuth();

	return (
		<nav className="bg-transparent p-4 flex items-center justify-between">
			<Link href={"/"} className="flex items-center">
				<div className="relative h-8 w-8 mr-4">
					<Image fill src={"/logo.png"} alt="logo" />
				</div>
				<h1
					className={cn("text-2xl fontbold text-white", bungee_spice.className)}
				>
					MultiGPT
				</h1>
			</Link>
			<div className="flex items-center gap-x-2">
				<Link href={isSignedIn ? "/dashboard" : "/signup"}>
					<Button variant={"outline"} className="rounded-full">
						Get Started
					</Button>
				</Link>
			</div>
		</nav>
	);
};

export default LandingNavBar;
