import LandingContent from "@/components/LandingContent";
import LandingHero from "@/components/landingHero";
import LandingNavBar from "@/components/landingNavbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
	return (
		<div>
			<LandingNavBar />
			<LandingHero />
			<LandingContent />
		</div>
	);
};

export default LandingPage;
