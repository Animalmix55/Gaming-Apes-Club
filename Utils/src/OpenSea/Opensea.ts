/* eslint-disable no-await-in-loop */
import { OpenSeaAPI } from 'opensea-js';
import { OpenSeaAsset } from 'opensea-js/lib/types';
import { ERC721Attribute, GACLayer } from '../GenerateMeta/Models';

export const getOpenSeaAPI = (apiKey: string): OpenSeaAPI =>
    new OpenSeaAPI({ apiKey });

export const getAllAssetsInCollection = async (
    api: OpenSeaAPI,
    contractAddress: string
) => {
    const result: Record<string, OpenSeaAsset> = {};

    let next: string | undefined;
    let assets: OpenSeaAsset[];

    ({ assets, next } = await api.getAssets({
        asset_contract_address: contractAddress,
        limit: 50,
    }));

    let added = 0;
    assets.forEach((asset) => {
        if (!asset.tokenId) return;
        if (result[asset.tokenId]) return;

        added += 1;
        result[asset.tokenId] = asset;
    });
    if (added === 0) return result;
    added = 0;

    while (next !== undefined) {
        ({ assets, next } = await api.getAssets({
            asset_contract_address: contractAddress,
            cursor: next,
            limit: 50,
        }));

        let added = 0;
        assets.forEach((asset) => {
            if (!asset.tokenId) return;
            if (result[asset.tokenId]) return;

            added += 1;
            result[asset.tokenId] = asset;
        });
        if (added === 0) return result;
        added = 0;

        console.log(`Total number fetched: ${Object.keys(result).length}`);
    }

    return result;
};

export const getTokenRarities = async (
    api: OpenSeaAPI,
    contractAddress: string
): Promise<Record<string, number>> => {
    const assetsById = await getAllAssetsInCollection(api, contractAddress);
    const assets = Object.keys(assetsById).map((k) => assetsById[k]);

    /**
     * Indexed by layer name => trait name
     */
    const occurances: Record<string, Record<string, number>> = {};
    assets.forEach((asset) => {
        const { traits } = asset;
        const allTraits = traits as ERC721Attribute<GACLayer>[];

        allTraits.forEach((trait) => {
            if (!occurances[trait.trait_type])
                occurances[trait.trait_type] = {};
            if (!occurances[trait.trait_type][trait.value])
                occurances[trait.trait_type][trait.value] = 0;
            occurances[trait.trait_type][trait.value] += 1;
        });
    });

    Object.keys(occurances).forEach((traitName) => {
        const numOccurances = Object.keys(occurances[traitName]).reduce(
            (total, cur) => occurances[traitName][cur] + total,
            0
        );

        const balance = assets.length - numOccurances;

        occurances[traitName].None = balance;
    });

    const rarities: Record<string, number> = {};
    assets.forEach((asset) => {
        const { traits, tokenId } = asset;
        const allTraits = traits as ERC721Attribute<GACLayer>[];
        const traitNames = Object.keys(occurances);

        let score = 0;
        traitNames.forEach((traitName) => {
            const value =
                allTraits.find((t) => t.trait_type === traitName)?.value ??
                'None';
            const numOccurances = occurances[traitName][value];

            score += 1 / (numOccurances / assets.length);
        });
        if (tokenId) rarities[tokenId] = score;
    });

    return rarities;
};
