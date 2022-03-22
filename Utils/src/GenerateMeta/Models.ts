export enum GACLayer {
    Background = 'Background',
    Backbling = 'Backbling',
    'Body & Eyes' = 'Body & Eyes',
    Teeth = 'Teeth',
    Fur = 'Fur',
    Nose = 'Nose',
    Neckwear = 'Neckwear',
    Clothing = 'Clothing',
    Earring = 'Earring',
    Headwear = 'Headwear',
    Eyewear = 'Eyewear',
    Lasers = 'Lasers',
}

export type Layer = GACLayer;

export type AssetName = string;
export interface Asset<T extends Layer> {
    rarityPercent: number;
    occurances: number;
    filePath: string;
    name: string;
    layer: T;
    /**
     * If the layer is required
     */
    required: boolean;
}

export type UsedTraits<T extends Layer> = Record<
    T,
    Record<AssetName, Asset<T>>
>;

// ------------------------------------------------ NFT TYPES ------------------------------------------------

export interface ERC721Attribute<T extends Layer> {
    trait_type: T;
    value: AssetName;
    /**
     * Special formatting in opensea.
     * @see https://docs.opensea.io/docs/metadata-standards
     */
    display_type?: 'number' | 'boost_percentage' | 'boost_number';
}

export interface ERC721Meta<T extends Layer> {
    description?: string;
    external_url?: string;
    image: string;
    name: string;
    attributes: ERC721Attribute<T>[];
}

export interface ERC721MetaWithImagePath<T extends Layer>
    extends Omit<ERC721Meta<T>, 'image'> {
    attributes: (ERC721Attribute<T> & { imagePath: string })[];
}
