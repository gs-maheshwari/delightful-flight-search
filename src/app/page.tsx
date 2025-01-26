import { Search } from "../components";

export default function Home() {
  return (
    <main className="flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-10 self-center text-green-600">
        Delightful Flight Search
      </h1>
      <Search />
    </main>
  );
}
