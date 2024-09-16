import { Pokemon } from "#/app/lib/pokemon/definitions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#/components/ui/table";
import PokemonTableImage from "./PokemonImage";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "#/components/ui/pagination";
import { fetchPokemons, POKEMON_FETCH_QUERY_KEY } from "#/app/lib/pokemon/data";
import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { useState } from "react";

const perPage = 5;

export default function PokemonTable() {
    const queryClient = useQueryClient();

    const invalidateQuery = _.debounce(() => {
        queryClient.invalidateQueries({ queryKey: [POKEMON_FETCH_QUERY_KEY] })
    }, 150)

    const [currentPage, setPage] = useState(1);

    const { isPending, error, data, isFetching } = fetchPokemons(currentPage, perPage)

    if (isPending) return <p>Loading</p>
    if (error) {
        return <p>Error fetching pokemon list</p>
    }

    const numberOfPages = Math.ceil(data.count / perPage);

    function nextPage() {
        if(currentPage + 1 <= numberOfPages) {
            setPage(currentPage + 1);
            invalidateQuery();
        }
    }

    function prevPage() {
        if(currentPage - 1 > 0) {
            setPage(currentPage - 1);
            invalidateQuery();
        }
    }

    return <div>
        <Table className="h-96 overflow-y-auto bg-gray-800 border border-gray-700">
            <TableHeader className="">
                <TableRow>
                    <TableHead className="w-[150px] text-center">Image</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <PokemonTableRows pokemons={data.results} />
            </TableBody>
        </Table>

        <Pagination className="mt-2">
            <PaginationContent className="flex grid grid-cols-3">
                <PaginationItem className="flex-none">
                    <PaginationPrevious disable={currentPage <= 1} className="w-full" href="#" onClick={prevPage} />
                </PaginationItem>

                <PaginationItem className="flex-grow text-center">
                    {currentPage}
                </PaginationItem>

                 <PaginationItem className="flex-none">
                    <PaginationNext disable={currentPage + 1 > numberOfPages} className="w-full" href="#" onClick={nextPage} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </div>

}

interface PokemonTableRowsProps {
    pokemons: Pokemon[]
}

function PokemonTableRows({ pokemons }: PokemonTableRowsProps) {
    return pokemons.map((pokemon: Pokemon) => <TableRow key={pokemon.id}>
        <TableCell>
            <PokemonTableImage pokemon={pokemon} />
        </TableCell>
        <TableCell className="text-center text-xl">{pokemon.name}</TableCell>
    </TableRow>)
}