import {
    useQuery,
    UseQueryResult,
} from '@tanstack/react-query'
import { pokemonListApiSchema, PokemonListSchema } from './definitions';

export const POKEMON_FETCH_QUERY_KEY = "pokemonFetchData";

// Fetch the list of pokemons
export function fetchPokemons(page: number, per_page = 10): UseQueryResult<PokemonListSchema, Error> {    

    return useQuery({
        queryKey: [POKEMON_FETCH_QUERY_KEY],
        queryFn: async () => {
            return await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * per_page}&limit=${per_page}`)
                .then((result) => result.json())
                .then((result) => {
                    return pokemonListApiSchema.parse(result)
        })
        }
    });
}