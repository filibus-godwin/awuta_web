import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import VendorBuyerBenefits from "@/components/landing/VendorBuyerBenefits";
import Testimonials from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <>
      <main className="flex flex-col">
        <Hero />
        <HowItWorks />
        <Features />
        {/* <VendorBuyerBenefits /> */}
        <Testimonials />
      </main>
    </>
  );
}
