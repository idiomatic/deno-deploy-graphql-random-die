// -*- eval: (indent-tabs-mode nil); -*-

import { serve, json } from "https://deno.land/x/sift@0.5.0/mod.ts";
import { buildSchema, graphql } from "https://raw.githubusercontent.com/adelsz/graphql-deno/v15.0.0/mod.ts";

const schema = buildSchema(await Deno.readTextFile("./schema.graphql"));

class RandomDie {
    numSides: number;
    constructor(numSides: number) {
        this.numSides = numSides;
    }
    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }
    roll({ numRolls }: { numRolls: number }) {
        var output = [];
        for (var i = 0; i < numRolls; i++) {
            output.push(this.rollOnce());
        }
        return output;
    }
}

const resolvers = {
    getDie: ({ numSides }: { numSides: number }) => {
        return new RandomDie(numSides || 6);
    }
};

await serve({
    "/graphql": async (request) => {
        var { query } = await request.json();
        return json(await graphql(schema, query, resolvers));
    }
});
