"use client"; // as we are using react-hook-form, we need to use client

import * as z from "zod";
import axios from "axios";
import { Code2, Divide, FormInput, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { Empty } from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";
import { useProModal } from "@/hooks/useProModal";
import toast from "react-hot-toast";

const CodeGenerationPage = () => {
	const router = useRouter();
	const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
	const proModal = useProModal();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessage: ChatCompletionRequestMessage = {
				role: "user",
				content: values.prompt,
			};
			const newMessages = [...messages, userMessage];

			const response = await axios.post("/api/code", {
				messages: newMessages,
			});

			setMessages((currentMessages) => [
				...currentMessages,
				userMessage,
				response.data,
			]);
			form.reset();
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			// TODO: Implement Pro Model validation
			if (error?.response?.status === 429) {
				proModal.onOpen();
			}else {
				toast.error("Something went wrong");
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Code Generation"
				description="Generate Code with Text 👨🏻‍💻"
				icon={Code2}
				iconColor="text-green-700"
				bgColor="bg-green-700/10"
			/>
			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="
              rounded-lg 
              border
              w-full
              p-4 px-3 md:px-6 
              focus-within: shadow-sm
              grid grid-cols-12
              gap-2"
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0">
											<Input
												disabled={isLoading}
												placeholder="Simple counter app using React"
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className="col-span-12 lg:col-span-2 w-full"
								disabled={isLoading}
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>
				<div className="space-y-4 mt-4">
					{isLoading && (
						<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
							<Loader />
						</div>
					)}
					{messages.length === 0 && !isLoading && (
						<div>
							<Empty label="No Conversation Started" />
						</div>
					)}
					<div className="flex flex-col-reverse gap-y-4">
						{messages.map((message) => (
							<div
								key={message.content}
								className={cn(
									"p-3 md:p-5 w-full rounded-lg flex items-start gap-x-8",
									message.role === "user"
										? "bg-white border border-black/10"
										: "bg-muted",
								)}
							>
								{message.role === "user" ? <UserAvatar /> : <BotAvatar />}
								<ReactMarkdown
									components={{
										pre: ({ node, ...props }) => (
											<div className="overflow-auto w-full my-2 bg-gray-900 text-white p-3 rounded-lg">
												<pre {...props} className="p-1" />
											</div>
										),
										code: ({ node, ...props }) => (
											<code
												className="bg-green-300 text-black font-mono font-semibold rounded-lg p-1"
												{...props}
											/>
										),
									}}
									className="text-md overflow-hidden leading-7"
								>
									{message.content || ""}
								</ReactMarkdown>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CodeGenerationPage;
