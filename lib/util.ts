import { ApolloClient, gql } from "@apollo/client";
import { BrandBasic, BrandDetails, ModelBasic, ModelDetails } from "./types";

export function slugify(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-");
}

export async function getBrandBySlug( client: ApolloClient<any>, brand_slug: string ): Promise<BrandBasic | null> {
    const { data } = await client.query<{ findAllBrands: BrandBasic[] }>({
        query:
            gql`
        query GetBrands {
            findAllBrands {
                id
                name
            }
        }
    `,
    });

    const brand = data.findAllBrands.find(
        (b) => slugify(b.name) === brand_slug
    );

    return brand || null;
}

export async function getBrandDetails( client: ApolloClient<any>, brandId: string ): Promise<BrandDetails> {
    const { data } = await client.query<{ findUniqueBrand: BrandDetails }>({
        query:
            gql`
        query GetBrandById($id: ID!) {
            findUniqueBrand(id: $id) {
                origin
                image
                categories
            }
        }
    `,
        variables: { id: brandId },
    });

    return data.findUniqueBrand;
}

export async function getBrandModels(
    client: ApolloClient<any>,
    brandId: string,
    sortBy: { field: "name" | "type" | "price"; order: "ASC" | "DESC" } = {
        field: "price",
        order: "ASC",
    }
): Promise<ModelBasic[]> {
    const { data } = await client.query<{ findBrandModels: ModelBasic[] }>({
        query:
            gql`
        query GetModelsByBrandId($id: ID!, $sortBy: sortBy!) {
            findBrandModels(id: $id, sortBy: $sortBy) {
                name
                type
                image
                price
            }
        }
    `,
        variables: { id: brandId, sortBy },
    });

    return data.findBrandModels;
}

export async function getModelBySlug( client: ApolloClient<any>, brandId: string, modelSlug: string ): Promise<ModelBasic | null> {
    const { data } = await client.query<{ findBrandModels: ModelBasic[] }>({
        query:
            gql`
            query GetModelsByBrandId($id: ID!, $sortBy: sortBy!) {
            findBrandModels(id: $id, sortBy: $sortBy) {
                id
                name
            }
        }
    `,
        variables: { id: brandId, sortBy: { field: "name", order: "DESC" } },
    });

    const model = data.findBrandModels.find(
        (m) => slugify(m.name) === modelSlug
    );

    return model || null;
}

export async function getModelDetails( client: ApolloClient<any>, brandId: string, modelId: string ): Promise<ModelDetails> {
    const { data } = await client.query<{ findUniqueModel: ModelDetails }>({
        query:
            gql`
        query GetModel($brandId: ID!, $modelId: ID!) {
            findUniqueModel(brandId: $brandId, modelId: $modelId) {
                id
                name
                type
                image
                description
                price
                specs {
                    bodyWood
                    neckWood
                    fingerboardWood
                    pickups
                    tuners
                    scaleLength
                    bridge
                }
                musicians {
                    name
                    musicianImage
                    bands
                }
            }
        }
    `,
        variables: { brandId, modelId },
    });

    return data.findUniqueModel;
}

export async function searchModels( client: ApolloClient<any>, brandId: string, name: string ): Promise<ModelBasic[]> {
    const { data } = await client.query<{ searchModels: ModelBasic[] }>({
        query: gql`
        query SearchModels($brandId: String!, $name: String!) {
            searchModels(brandId: $brandId, name: $name) {
                name
                type
                image
                price
            }
        }
    `,
        variables: { brandId: brandId, name: name },
    });

    return data.searchModels;
}