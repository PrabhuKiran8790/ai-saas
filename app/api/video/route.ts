import { checkApiLimit, incrementApiLimit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN || "",
});

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { prompt } = body;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!prompt) {
			return new NextResponse("prompt is required", { status: 400 });
		}
		const onFreePlan = await checkApiLimit();
		const isPro = await checkSubscription();

		if (!onFreePlan && !isPro) {
			return new NextResponse("API Limit Reached", { status: 429 });
		}

		const response = await replicate.run(
			"anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
			{
				input: {
					prompt: prompt,
				},
			},
		);

		if (!isPro) {
			await incrementApiLimit();
		}

		return NextResponse.json(response);
	} catch (error) {
		console.log(["VIDEO API Error"], error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
