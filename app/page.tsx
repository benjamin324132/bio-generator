import Footer from "@/components/Footer";
import GenerateForm from "@/components/Form";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="max-w-screen-xl mx-auto px-5">
      <NavBar />
      <Hero />
      <GenerateForm />
      <Footer />
    </main>
  )
}
