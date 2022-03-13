import fs from 'fs';
import { Blend } from 'sharp';
import { compileNFT } from './GenerateImage';
import {
    generateMetadata,
    getAttributeByLayer,
    hasAttribute,
} from './MetaUtils';
import {
    ERC721Attribute,
    ERC721MetaWithImagePath,
    GACLayer,
    Layer,
    UsedTraits,
} from './Models';

const LayerOrder = [
    GACLayer.Background,
    GACLayer.Backbling,
    GACLayer['Body & Eyes'],
    GACLayer.Teeth,
    GACLayer.Fur,
    GACLayer.Nose,
    GACLayer.Neckwear,
    GACLayer.Clothing,
    GACLayer.Earring,
    GACLayer.Headwear,
    GACLayer.Eyewear,
    GACLayer.Lasers,
    GACLayer.Tattoo,
];

const LayerRequirements: Record<Layer, boolean> = {
    [GACLayer.Background]: true,
    [GACLayer.Backbling]: false,
    [GACLayer['Body & Eyes']]: true,
    [GACLayer.Teeth]: false,
    [GACLayer.Fur]: true,
    [GACLayer.Nose]: false,
    [GACLayer.Neckwear]: false,
    [GACLayer.Clothing]: false,
    [GACLayer.Earring]: false,
    [GACLayer.Headwear]: false,
    [GACLayer.Eyewear]: false,
    [GACLayer.Lasers]: false,
    [GACLayer.Tattoo]: false,
};

export const getInitialUsedTraits = (
    rarityFile: string,
    artRoot: string
): UsedTraits<GACLayer> => {
    const rarityCsv = fs.readFileSync(rarityFile).toString();
    const attributes: { [name: string]: number }[] = [];

    rarityCsv.split('\r\n').forEach((line, y) => {
        if (y === 0) return; // skip headers
        const cells = line.split(',');
        let actualX = -1;
        cells.forEach((cell, x) => {
            if (x % 2 !== 0) return; // skip non-text
            actualX += 1;

            const name = cell;

            if (
                !name ||
                name.toLowerCase().replace(/[^a-zA-Z]/g, '') === 'none'
            )
                return;
            const rarity = Number(cells[x + 1].replace('%', ''));

            if (Number.isNaN(rarity))
                throw new Error(
                    `${name} in column ${x + 1} is not a number (${
                        cells[x + 1]
                    })`
                );

            if (!attributes[actualX]) attributes[actualX] = {};
            attributes[actualX][name] = rarity;
        });
    });

    if (LayerOrder.length !== attributes.length)
        throw new Error('Layer size mismatch');

    const missing: string[] = [];
    const usedTraits: UsedTraits<GACLayer> = {} as never;
    LayerOrder.forEach((layer, i) => {
        const layerDir = `${artRoot}/${layer}`;
        const filesInDir = fs.readdirSync(layerDir);
        const values = Object.keys(attributes[i]);
        if (!usedTraits[layer]) usedTraits[layer] = {};

        values.forEach((value) => {
            const matchingFile = filesInDir.find(
                (fileName) =>
                    fileName
                        .split('.')[0]
                        .toLowerCase()
                        .replace(/[^a-z]/g, '') ===
                    value.toLowerCase().replace(/[^a-z]/g, '')
            );
            if (!matchingFile) {
                // throw new Error(
                //     `Could not find art for layer ${layer}, value ${value}`
                // );
                missing.push(`${layer} - ${value}`);
                return;
            }

            const valuePath = `${layerDir}/${matchingFile}`;
            usedTraits[layer][value] = {
                rarityPercent: attributes[i][value],
                occurances: 0,
                filePath: valuePath,
                name: value,
                layer,
                required: LayerRequirements[layer],
            };
        });
    });

    console.log(missing);
    return usedTraits;
};

type RequiresScreen = Record<
    Layer,
    Record<string, boolean | undefined> | boolean | undefined
>;

/**
 * Layers/Values that specifically need to be composited with the screen flag
 */
const ScreenRequirements: RequiresScreen = {
    [GACLayer.Headwear]: {
        'Dark Blue Halo': true,
        'Light Blue Halo': true,
        'Orange Halo': true,
        'RGB Halo': true,
    },
    [GACLayer.Lasers]: true,
    [GACLayer.Neckwear]: {
        'Gold Controller': true,
        'Gold Double Cuban': true,
        'Gold GAC': true,
        'Gold Iron': true,
        'Gold Single Cuban': true,
        'Silver Controller': true,
        'Silver Double Cuban': true,
        'Silver GAC': true,
        'Silver Iron': true,
        'Silver Single Cuban': true,
    },
} as never;

const transformNFT = (
    meta: ERC721MetaWithImagePath<GACLayer>,
    _: ERC721MetaWithImagePath<GACLayer>[],
    originalUsedTraits: UsedTraits<GACLayer>
): ERC721MetaWithImagePath<GACLayer> => {
    const teeth = getAttributeByLayer(meta, GACLayer.Teeth);
    const headwear = getAttributeByLayer(meta, GACLayer.Headwear);
    const body = getAttributeByLayer(meta, GACLayer['Body & Eyes']);
    const eyewear = getAttributeByLayer(meta, GACLayer.Eyewear);
    const clothes = getAttributeByLayer(meta, GACLayer.Clothing);
    const neckwear = getAttributeByLayer(meta, GACLayer.Neckwear);
    const earring = getAttributeByLayer(meta, GACLayer.Earring);

    let newMeta: ERC721MetaWithImagePath<GACLayer> = {
        ...meta,
        attributes: [...meta.attributes],
    };

    if (!body) throw new Error('Missing body');

    // no eyewear and headphones/headsets
    if (headwear && eyewear && headwear.value.includes('Head'))
        newMeta = {
            ...newMeta,
            attributes: newMeta.attributes.filter(
                (a) => a.trait_type !== GACLayer.Eyewear
            ),
        };

    // no earrings and headphones/headsets
    if (headwear && earring && headwear.value.includes('Head'))
        newMeta = {
            ...newMeta,
            attributes: newMeta.attributes.filter(
                (a) => a.trait_type !== GACLayer.Earring
            ),
        };

    // no secret agent and clothes
    if (
        hasAttribute(meta, GACLayer.Earring, 'Secret Agent', originalUsedTraits)
    )
        newMeta = {
            ...newMeta,
            attributes: newMeta.attributes.filter(
                (a) => a.trait_type !== GACLayer.Clothing
            ),
        };

    // no clothes and chains/sword
    if (clothes && neckwear)
        newMeta = {
            ...newMeta,
            attributes: newMeta.attributes.filter(
                (a) => a.trait_type !== GACLayer.Neckwear
            ),
        };

    // no teeth in closed mouths
    if (teeth) {
        if (!body.value.includes('Open'))
            newMeta = {
                ...newMeta,
                attributes: newMeta.attributes.filter(
                    (a) => a.trait_type !== GACLayer.Teeth
                ),
            };
        else if (body.value.includes('Angry') && !teeth.value.includes('Angry'))
            newMeta = {
                ...newMeta,
                attributes: newMeta.attributes.map((a) => {
                    if (a.trait_type !== GACLayer.Teeth) return a;

                    return {
                        ...a,
                        value: a.value.replace('Smile', 'Angry'),
                        imagePath: a.imagePath.replace('Smile', 'Angry'),
                    };
                }),
            };
        else if (body.value.includes('Smile') && !teeth.value.includes('Smile'))
            newMeta = {
                ...newMeta,
                attributes: newMeta.attributes.map((a) => {
                    if (a.trait_type !== GACLayer.Teeth) return a;

                    return {
                        ...a,
                        value: a.value.replace('Angry', 'Smile'),
                        imagePath: a.imagePath.replace('Angry', 'Smile'),
                    };
                }),
            };
    }

    return newMeta;
};

const isValidCombination = (
    meta: ERC721MetaWithImagePath<GACLayer>,
    previouslyGenerated: ERC721MetaWithImagePath<GACLayer>[],
    originalUsedTraits: UsedTraits<GACLayer>
): boolean => {
    const body = getAttributeByLayer(meta, GACLayer['Body & Eyes']);
    const eyewear = getAttributeByLayer(meta, GACLayer.Eyewear);
    const lasers = getAttributeByLayer(meta, GACLayer.Lasers);
    const fur = getAttributeByLayer(meta, GACLayer.Fur);
    const teeth = getAttributeByLayer(meta, GACLayer.Teeth);
    const backbling = getAttributeByLayer(meta, GACLayer.Backbling);

    if (!fur) throw new Error('Missing fur');
    if (!body) throw new Error('Missing body');
    (Object.keys(LayerRequirements) as GACLayer[]).forEach((layer): void => {
        const exists = !!getAttributeByLayer(meta, layer);
        if (LayerRequirements[layer] && !exists)
            throw new Error(`Missing ${layer}`);
    });

    // no eyewear and lasers
    if (eyewear && lasers) return false;

    if (
        hasAttribute(
            meta,
            GACLayer.Neckwear,
            'Pixel Sword',
            originalUsedTraits
        ) &&
        backbling
    )
        return false;

    if (body.value.includes('Open') && !teeth) return false;

    const lastGenerated = previouslyGenerated[previouslyGenerated.length - 1];
    if (lastGenerated) {
        const lastFur = getAttributeByLayer(lastGenerated, GACLayer.Fur);
        if (lastFur && fur.value === lastFur.value) return false;
    }

    return true;
};

export const generateGACMetadata = (
    supply: number,
    collectionName: string,
    artDir: string,
    rarityPath: string,
    description?: string,
    externalUrl?: string
) => {
    const initialUsedTraits = getInitialUsedTraits(rarityPath, artDir);
    const result = generateMetadata(
        initialUsedTraits,
        isValidCombination,
        transformNFT,
        (): 0 => 0,
        supply,
        collectionName,
        false,
        description,
        externalUrl
    );

    return result;
};

export const generateGACImages = async (
    metadata: ERC721MetaWithImagePath<GACLayer>[],
    targetDir: string
) => {
    const getBlend = (
        metadata: ERC721Attribute<GACLayer>
    ): Blend | undefined => {
        const screenLayerReq = ScreenRequirements[metadata.trait_type];
        if (!screenLayerReq) return undefined;
        if (screenLayerReq === true) return 'screen';

        const screenValueReq = screenLayerReq[metadata.value];
        if (!screenValueReq) return undefined;
        return 'screen';
    };

    console.log('Starting image generation');
    await Promise.all(
        metadata.map(async (nft, i) => {
            console.log(`Generating image for ${i}`);

            const nftImage = compileNFT(nft, (): 0 => 0, undefined, getBlend);
            await nftImage.webp().toFile(`${targetDir}/${i}.webp`);

            console.log(`Generated image for ${i}`);
        })
    );
};

export default {};
