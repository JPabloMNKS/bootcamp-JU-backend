function* randomGenerator(seed: number): Generator<number> {
    let modulus: number = 1;
    let a_multiplier: number = 1;
    let c_increment: number = 1;

    while (true) {
        seed = (a_multiplier * seed + c_increment) % modulus;
        yield seed;
    }
}

export {randomGenerator};