'use client';

import PokemonTable from "./PokemonTable";
import _ from "lodash";

export default function PokemonList() {
    return (
        <div className="mx-auto">
            <h1 className="text-5xl mb-3">Pokemon list</h1>
            <div>
                <PokemonTable />
            </div>
        </div>
    )
}