'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PokemonList from "./ui/pokemon_list/PokemonList";

export default function HomePage() {
  const queryClient = new QueryClient();

  return (
    <main className="flex min-h-screen flex-col p-2 bg-gray-700 text-zinc-300">
      <QueryClientProvider client={queryClient}>
        <PokemonList />
      </QueryClientProvider>
    </main>
  );
}
