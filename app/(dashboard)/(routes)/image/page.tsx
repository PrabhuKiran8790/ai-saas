"use client"; // as we are using react-hook-form, we need to use client

import * as z from "zod";
import axios from "axios";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/Empty";
import Loader from "@/components/Loader";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/useProModal";
import toast from "react-hot-toast";

const ImagePage = () => {
	const router = useRouter();
	const [images, setImages] = useState<string[]>([]);
	const proModal = useProModal();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
			amount: "1",
			resolution: "512x512",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setImages([]);
			const response = await axios.post("/api/image", values);

			const urls = response.data.map((image: { url: string }) => image.url);
			setImages(urls);

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
				title="Image"
				description="Turn your ideas into an image."
				icon={ImageIcon}
				iconColor="text-pink-700"
				bgColor="bg-pink-700/10"
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
              gap-3"
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-12">
										<FormControl className="m-0 p-0">
											<Input
												disabled={isLoading}
												placeholder="Enter your prompt here"
												className="w-full p-3 text-base"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								name="amount"
								control={form.control}
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-6">
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue defaultValue={field.value} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{amountOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<FormField
								name="resolution"
								control={form.control}
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-6">
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue defaultValue={field.value} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{resolutionOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
						<div className="p-20">
							<Loader />
						</div>
					)}
					{images.length === 0 && !isLoading && (
						<div>
							<Empty label="No Images generated" />
						</div>
					)}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
						{images.map((image) => (
							<Card key={image} className="rounded-lg overflow-hidden">
								<div className="relative aspect-square">
									<Image src={image} alt="Image" fill />
								</div>
								<CardFooter className="p-2">
									<Button
										variant="secondary"
										className="w-full"
										onClick={() => window.open(image)}
									>
										<Download className="h-4 w-4 mr-2" />
										Download
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImagePage;
