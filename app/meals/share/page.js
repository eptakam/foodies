import Link from 'next/link';

export default function SharePage() {
  return (
    <main>
      <h1>The Share Page</h1>
      <p><Link href="/">Home</Link></p>
      <p><Link href="/meals">Meals</Link></p>
    </main>
  );
}