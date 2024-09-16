import { z } from "zod";

const pokemonSchema = z.object({
        name: z.string(),
        url: z.string().url(),
    })
    .transform(pokemon => ({
        ...pokemon,
        get id(): number {
            return Number(pokemon.url.match(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/(\d+)/)[1])
        }
    }));

export const pokemonListApiSchema = z.object({
    count: z.number().positive(),
    next: z.string().url().nullable(),
    previous: z.string().url().nullable(),
    results: z.array(pokemonSchema)
});

// Infer the types
export type Pokemon = z.infer<typeof pokemonSchema>;
export type PokemonListSchema = z.infer<typeof pokemonListApiSchema>;