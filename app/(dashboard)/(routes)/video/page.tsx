"use client"; // as we are using react-hook-form, we need to use client

import * as z from "zod";
import axios from "axios";
import { MusicIcon, VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/Empty";
import Loader from "@/components/Loader";
import { useProModal } from "@/hooks/useProModal";
import toast from "react-hot-toast";

const VideoPage = () => {
	const router = useRouter();
	const [video, setVideo] = useState<string>();
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
			setVideo(undefined);

			const response = await axios.post("/api/video", values);
			setVideo(response.data[0]);
			form.reset();
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			// TODO: Implement Pro Model validation

			if (error?.response?.status === 429) {
				proModal.onOpen();
			} else {
				toast.error("Something went wrong");
			}
			console.log(error);
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Video"
				description="Generate videos with AI"
				icon={VideoIcon}
				iconColor="text-orange-700"
				bgColor="bg-orange-700/10"
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
												placeholder="Enter your prompt here"
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
					{!video && !isLoading && (
						<div>
							<Empty label="No Video generated" />
						</div>
					)}
					{video && (
						// rome-ignore lint/a11y/useMediaCaption: <explanation>
						<video
							controls
							className="w-full mt-8 bg-black rounded-lg aspect-video border"
						>
							<source src={video} />
						</video>
					)}
				</div>
			</div>
		</div>
	);
};

export default VideoPage;
