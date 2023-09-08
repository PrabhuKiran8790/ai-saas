import { tools } from "@/constants";
import { Card, CardHeader } from "./ui/card";

const LandingContent = () => {
	return (
		<div className="px-10 select-none hover:cursor-default">
			<h2 className="text-center font-extrabold text-white mb-10">
				Tools Available
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{tools.map((tool) => (
					<Card key={tool.label} className="bg-[#192339] border-none">
						<CardHeader>
							<div className="flex items-center gap-4 w-full">
								<div
									className={`${tool.bgColor} h-10 w-10 flex items-center justify-center rounded-lg shadow-sm shadow-zinc-500`}
								>
									<tool.icon
										className={`${tool.color} `}
										size={34}
										strokeWidth={2}
									/>
								</div>
								<h3 className="text-xl font-bold text-white">{tool.label}</h3>
							</div>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
};
export default LandingContent;
