import Hero from "@/components/Hero";
import Marketplace from "@/components/Marketplace";
import Stats from "@/components/Stats";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import PushNotificationsManager from "@/components/PushNotifications";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      <Marketplace />
      <Portfolio />
      <Footer />
      <AIChatbot />
      <PushNotificationsManager />
    </main>
  );
}

