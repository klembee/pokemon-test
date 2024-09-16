import { Pokemon } from "#/app/lib/pokemon/definitions";
import Image from "next/image";

interface PokeMonTableImageProps {
    pokemon: Pokemon
}

export default function PokemonTableImage({pokemon}: PokeMonTableImageProps) {
    if(pokemon.id) {
        return <Image
        className="mx-auto"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        width={100}
        height={100}
        alt={`${pokemon.name}`} />
    }

    return "Loading"
}