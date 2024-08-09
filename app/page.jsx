import Link from "next/link";

export default function Homepage() {
  return (
    <>
      <div>
        <h1 className="text-6xl text-center font-bold">Hello, Next.js!</h1>
        <p className="text-center mt-10">This is a sample page.</p>
      </div>
      <div>
        <Link href="/properties">
          <h1 className="text-center underline mt-20">GO TO PROPERTIES</h1>
        </Link>
      </div>
    </>
  );
}
