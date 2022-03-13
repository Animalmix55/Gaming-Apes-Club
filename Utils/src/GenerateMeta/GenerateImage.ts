import sharp, { Blend } from 'sharp';
import { ERC721Attribute, ERC721MetaWithImagePath, Layer } from './Models';

export const compileImages = (
    paths: string[],
    baseLayer?: sharp.Sharp,
    blends?: (Blend | undefined)[]
) => {
    const base = baseLayer ?? sharp(paths[0]);

    base.composite(
        paths.slice(baseLayer ? 0 : 1).map((f, i) => ({
            input: f,
            blend: blends?.[baseLayer ? i : i + 1],
        }))
    );

    return base;
};

export const compileNFT = <T extends Layer>(
    NFT: ERC721MetaWithImagePath<T>,
    layerOrderComparator: (
        layer1: ERC721Attribute<T>,
        layer2: ERC721Attribute<T>
    ) => 0 | 1 | -1,
    baseLayer?: sharp.Sharp,
    getBlend?: (attribute: ERC721Attribute<T>) => Blend | undefined
) => {
    const orderedAttributes = NFT.attributes.sort(layerOrderComparator);

    const paths = orderedAttributes.map((a) => a.imagePath);
    const blends = getBlend ? orderedAttributes.map(getBlend) : undefined;

    return compileImages(paths, baseLayer, blends);
};
