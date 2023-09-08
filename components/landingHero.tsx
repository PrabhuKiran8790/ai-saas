"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

const LandingHero = () => {
	const { isSignedIn } = useAuth();

	return (
		<div className="text-white font-bold py-36 -mb-14 text-center space-y-5 px-6">
			<div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-4 font-extrabold">
				<h1>The Multi Purpose AI Tool for</h1>
				<div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to to-pink-600">
					<TypewriterComponent
						options={{
							strings: [
								"Chatbot.",
								"Code Generation.",
								"Image Generation.",
								"Music Generation.",
								"Video Generation.",
							],
							autoStart: true,
							loop: true,
						}}
					/>
				</div>
			</div>
			<div className="text-sm md:text-xl font-light text-zinc-400">
				use AI to boost your productivity by 10X
			</div>
			<div>
				<Link href={isSignedIn ? "/dashboard" : "/signup"}>
					<Button
						variant={"gradient"}
						className="md:text-lg rounded-full font-semibold p-4 md:p-6 shadow-2xl shadow-fuchsia-800"
					>
						Get Started for Free
					</Button>
				</Link>
			</div>
			<div className="text-xs md:text-sm font-normal text-zinc-400">
				No Credit Card Required
			</div>
		</div>
	);
};

export default LandingHero;
