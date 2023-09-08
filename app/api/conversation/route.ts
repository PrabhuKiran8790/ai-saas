import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { incrementApiLimit, checkApiLimit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { messages } = body;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!configuration.apiKey) {
			return new NextResponse("OpenAI API Key Error", { status: 500 });
		}

		if (!messages) {
			return new NextResponse("Messages are required", { status: 400 });
		}

		const onFreePlan = await checkApiLimit();
		const isPro = await checkSubscription();

		if (!onFreePlan && !isPro) {
			return new NextResponse("API Limit Reached", { status: 429 });
		}

		const response = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages,
		});

		if (!isPro) {
			await incrementApiLimit();
		}

		return NextResponse.json(response.data.choices[0].message);
	} catch (error) {
		console.log(["Conversation API Error"], error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
