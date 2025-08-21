export type BrandBasic = {
    id: string;
    name: string;
};

export type BrandDetails = {
    origin: string;
    image: string;
    categories: string[];
};

export type ModelBasic = {
    id: string;
    name: string;
    type: string;
    image: string;
    price: number;
};

export type Specs = {
    bodyWood: string;
    neckWood: string;
    fingerboardWood: string;
    pickups: string;
    tuners: string;
    scaleLength: string;
    bridge: string;
};

export type Musician = {
    name: string;
    musicianImage: string;
    bands: string[];
};

export type ModelDetails = {
    id: string;
    name: string;
    type: string;
    image: string;
    description: string;
    price: number;
    specs: Specs;
    musicians: Musician[];
};