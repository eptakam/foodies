import Link from "next/link";

export default function MealsPage() {
  return (
    <main>
      <h1>The Meals Page</h1>
      <p><Link href="/">Home</Link></p>
      <p><Link href="./meals/share">Share</Link></p>
    </main>
  );
}