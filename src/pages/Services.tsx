
import Layout from "@/components/Layout";
import ServicesHeader from "@/components/ServicesHeader";
import ServicesGrid from "@/components/ServicesGrid";
import IndustryStandards from "@/components/IndustryStandards";

export default function Services() {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <ServicesHeader />
        <ServicesGrid />
        <IndustryStandards />
      </div>
    </Layout>
  );
}
