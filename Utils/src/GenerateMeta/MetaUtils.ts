/* eslint-disable no-loop-func */
import crypto from 'crypto';
import {
    UsedTraits,
    AssetName,
    Layer,
    Asset,
    ERC721MetaWithImagePath,
    ERC721Meta,
    ERC721Attribute,
} from './Models';

export const updateUsedTraits = <T extends Layer>(
    usedTraits: UsedTraits<T>,
    newLayer: T,
    newTrait: AssetName
): UsedTraits<T> => {
    const newValue = { ...usedTraits };
    newValue[newLayer] = {
        ...newValue[newLayer],
        [newTrait]: {
            ...newValue[newLayer][newTrait],
            occurances: newValue[newLayer][newTrait].occurances + 1,
        },
    };

    return newValue;
};

export const attributeExists = <T extends Layer>(
    layer: T,
    value: string,
    originalUsedTraits: UsedTraits<T>
): boolean => {
    return !!originalUsedTraits[layer][value];
};

export const getAttributeByLayer = <T extends Layer>(
    meta: ERC721MetaWithImagePath<T>,
    layer: T
): ERC721Attribute<T> | undefined => {
    return meta.attributes.find((a) => a.trait_type === layer);
};

/**
 * Throws if the attribute does not exist.
 */
export const hasAttribute = <T extends Layer>(
    meta: ERC721MetaWithImagePath<T>,
    layer: T,
    value: string,
    originalUsedTraits: UsedTraits<T>
): boolean => {
    if (!attributeExists(layer, value, originalUsedTraits))
        throw new Error(`Attribute does not exists ${layer}-${value}`);

    const attribute = getAttributeByLayer(meta, layer);
    if (!attribute) return false;
    if (attribute.value !== value) return false;

    return true;
};

export const pickRandomAttribute = <T extends Layer>(
    usedTraits: UsedTraits<T>,
    layer: T,
    totalSupply: number,
    numGenerated: number
) => {
    const assets = Object.keys(usedTraits[layer]);
    const attributeLocation = crypto.randomInt(100000000) / 1000000;
    let selectedAttribute: Asset<T> | undefined;

    let currentValue = 0;
    assets.forEach((a) => {
        if (selectedAttribute) return;

        const { occurances, rarityPercent } = usedTraits[layer][a];
        const expectedNumOccurances = totalSupply * (rarityPercent / 100);

        const numRemaining = totalSupply - numGenerated;

        const remainingOccurances = Math.max(
            0,
            expectedNumOccurances - occurances
        );

        const remainingPercent = (remainingOccurances / numRemaining) * 100;
        currentValue += remainingPercent;
        if (currentValue >= attributeLocation) {
            selectedAttribute = usedTraits[layer][a];
        }
    });

    return selectedAttribute;
};

export const getDuplicateIndexes = <T extends Layer>(
    meta: ERC721MetaWithImagePath<T>[]
) => {
    const combos: { [x: string]: number } = {};
    const duplicateIndexes: number[] = [];

    for (let i = 0; i < meta.length; i++) {
        const key = meta[i].attributes.map((a) => a.value).join(' ');
        if (combos[key] !== undefined) duplicateIndexes.push(i);
        combos[key] = combos[key] !== undefined ? combos[key] + 1 : 0;
    }

    return duplicateIndexes;
};

export const sanitizeMeta = <T extends Layer>(
    imageMeta: ERC721MetaWithImagePath<T>[],
    imagePaths: string[]
): ERC721Meta<T>[] => {
    return imageMeta.map((i, index) => ({
        ...i,
        image: imagePaths[index],
        attributes: i.attributes.map((a) => {
            const newAttr = { ...a };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (newAttr as any).imagePath;
            return newAttr;
        }),
    }));
};

export const generateMetadata = <T extends Layer>(
    initialUsedTraits: UsedTraits<T>,
    isValid: (
        meta: ERC721MetaWithImagePath<T>,
        previouslyGenerated: ERC721MetaWithImagePath<T>[],
        originalUsedTraits: UsedTraits<T>
    ) => boolean,
    transform: (
        meta: ERC721MetaWithImagePath<T>,
        previouslyGenerated: ERC721MetaWithImagePath<T>[],
        originalUsedTraits: UsedTraits<T>
    ) => ERC721MetaWithImagePath<T>,
    layerComparator: (layer1: Asset<T>, layer2: Asset<T>) => -1 | 0 | 1,
    totalSupply: number,
    collectionName: string,
    allowDuplicates = false,
    description?: string,
    externalUrl?: string
): { metadata: ERC721MetaWithImagePath<T>[]; usedTraits: UsedTraits<T> } => {
    const outputNFTS: ERC721MetaWithImagePath<T>[] = [];

    // copy in initial traits to used traits
    let usedTraits = { ...initialUsedTraits };
    (Object.keys(initialUsedTraits) as T[]).forEach((layer) => {
        usedTraits[layer] = { ...initialUsedTraits[layer] };
    });
    const layers = Object.keys(initialUsedTraits) as T[];

    for (let i = 0; i < totalSupply; i++) {
        let NFT: ERC721MetaWithImagePath<T> | undefined;
        let attempts = 0;
        while (
            !NFT ||
            !isValid(NFT, outputNFTS, initialUsedTraits) ||
            (!allowDuplicates &&
                getDuplicateIndexes([...outputNFTS, NFT]).length > 0)
        ) {
            if (attempts > 500) throw new Error('Failed to generate');
            attempts += 1;
            NFT = {
                name: `${collectionName} #${i}`,
                description,
                external_url: externalUrl,
                attributes: [],
            };

            const attributeAssets: Asset<T>[] = [];
            layers.forEach((layer) => {
                const value = pickRandomAttribute(
                    usedTraits,
                    layer,
                    totalSupply + 100,
                    i
                );

                if (value) attributeAssets.push(value);
            });

            NFT.attributes = attributeAssets
                .sort(layerComparator)
                .map((f): ERC721MetaWithImagePath<T>['attributes'][number] => ({
                    trait_type: f.layer,
                    value: f.name,
                    imagePath: f.filePath,
                }));

            NFT = transform(NFT, outputNFTS, initialUsedTraits);
        }

        console.log(`Generated ${i}`);

        // update usedTraits
        NFT.attributes.forEach((attr) => {
            usedTraits = updateUsedTraits(
                usedTraits,
                attr.trait_type,
                attr.value
            );
        });

        outputNFTS.push(NFT);
    }

    return { metadata: outputNFTS, usedTraits };
};
