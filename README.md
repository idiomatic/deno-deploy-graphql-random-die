# Deno Deploy GraphQL Random Die

A nearly-trivial reference-implementation example
https://graphql.org/graphql-js/object-types/ for Deno Deploy.

## Launch

        deno run --allow-net=:8000 --allow-env --allow-read --watch app.ts

## Testing (local)

        curl --data '{"query":"{getDie(numSides: 6) {rollOnce roll(numRolls: 3)}}"}' http://localhost:8000/graphql

## Testing (hosted)

        curl --data '{"query":"{getDie(numSides: 6) {rollOnce roll(numRolls: 3)}}"}' https://idiomatic-graphql-random.deno.dev/graphql
