import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/components/modalProvider";
import ToasterProvider from "@/components/toaster";
import CrispChatProvider from "@/components/crisp-chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "MultiGPT",
	description: "Create with AI Magic",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<CrispChatProvider />
				<body className={inter.className}>
					<ModalProvider />
					<ToasterProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
