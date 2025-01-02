import Link from "next/link";
import ButtonLogin from "@/components/ButtonLogin";

export default function Home() {
  return (
    <main>
      <h1>Collect customer feedback </h1>
      <div> Create a feedback board in minutes , prioritize features , and build products your customers will love</div>
      <Link href= "/dashboard">Dashboard</Link>

      <ButtonLogin></ButtonLogin>
    </main>
  );
}