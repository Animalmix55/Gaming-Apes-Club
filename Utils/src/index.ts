import fs from 'fs';
import {
    generateGACImages,
    generateGACMetadata,
    sortByLayerOrder,
} from './GenerateMeta/GenerateGAC';
import { getAttributeByLayer } from './GenerateMeta/MetaUtils';
import {
    ERC721Attribute,
    ERC721Meta,
    ERC721MetaWithImagePath,
    GACLayer,
    UsedTraits,
} from './GenerateMeta/Models';

// const OUTPUT_BASE =
//     'C:/Users/Cory/source/repos/Gaming-Apes-Club/Utils/src/Assets/Outputs';
// const getNextOutputDir = (): string => {
//     const allPathsInDir = fs.readdirSync(OUTPUT_BASE);
//     const folders = allPathsInDir.filter((path) => {
//         const fullPath = `${OUTPUT_BASE}/${path}`;
//         return fs.lstatSync(fullPath).isDirectory();
//     });

//     let index = 0;
//     const date = new Date();
//     const dirname = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
//     let result = `${dirname}-${index}`;

//     while (folders.includes(result)) {
//         index++;
//         result = `${dirname}-${index}`;
//     }

//     return `${OUTPUT_BASE}/${result}`;
// };

// const generateMetadata = (seedData?: ERC721MetaWithImagePath<GACLayer>[]) => {
//     const outputDir = getNextOutputDir();

//     let meta: {
//         metadata: ERC721MetaWithImagePath<GACLayer>[];
//         usedTraits: UsedTraits<GACLayer>;
//     };

//     while (true) {
//         try {
//             meta = generateGACMetadata(
//                 6550,
//                 'Gaming Ape Club',
//                 'C:/Users/Cory/source/repos/Gaming-Apes-Club/Utils/src/Assets/Art',
//                 'C:/Users/Cory/source/repos/Gaming-Apes-Club/Utils/src/Assets/Rarities.csv',
//                 undefined,
//                 'https://www.gamingapeclub.com/',
//                 seedData
//             );
//         } catch (e) {
//             console.error(e);
//             // eslint-disable-next-line no-continue
//             continue;
//         }

//         break;
//     }

//     fs.mkdirSync(outputDir);

//     fs.writeFileSync(
//         `${outputDir}/meta.json`,
//         JSON.stringify(meta.metadata, null, 4)
//     );
//     fs.writeFileSync(
//         `${outputDir}/used.json`,
//         JSON.stringify(meta.usedTraits, null, 4)
//     );
//     const imageDir = `${outputDir}/images`;
//     fs.mkdirSync(imageDir);

//     generateGACImages(meta.metadata, imageDir, seedData?.length);

//     const splitMeta: Omit<ERC721Meta<GACLayer>, 'image'>[] = meta.metadata.map(
//         (m) => {
//             const bodyAndEyes = getAttributeByLayer(
//                 m as never,
//                 GACLayer['Body & Eyes']
//             );

//             if (!bodyAndEyes) {
//                 console.error(m);
//                 throw new Error('Missing body');
//             }

//             const trait_parts = bodyAndEyes.value.split(' ');

//             const eyes = trait_parts[0];
//             const expression = trait_parts.slice(1).join(' ');

//             const attributes: ERC721Attribute<GACLayer>[] = [
//                 ...m.attributes.filter(
//                     (a) => a.trait_type !== GACLayer['Body & Eyes']
//                 ),
//                 { value: eyes, trait_type: 'Eyes' as never },
//                 { trait_type: 'Expression' as never, value: expression },
//             ].sort(sortByLayerOrder);

//             return { ...m, attributes };
//         }
//     );

//     fs.writeFileSync(
//         `${outputDir}/split_meta.json`,
//         JSON.stringify(splitMeta, null, 4)
//     );

//     return { ...meta, splitMeta, outputDir };
// };

// const seedMeta = JSON.parse(
//     fs
//         .readFileSync(
//             'C:/Users/Cory/source/repos/Gaming-Apes-Club/Utils/src/Assets/Outputs/2-28-2022-3/meta.json'
//         )
//         .toString()
// ) as ERC721MetaWithImagePath<GACLayer>[];

// const { splitMeta: allSplitMeta, outputDir } = generateMetadata(seedMeta);
// const splitMeta = allSplitMeta.slice(6500);

// const usedTraits: UsedTraits<GACLayer> = allSplitMeta.reduce(
//     (innerUsedTraits, token) => {
//         const traits = { ...innerUsedTraits };
//         token.attributes.forEach((a) => {
//             if (!traits[a.trait_type]) traits[a.trait_type] = {};
//             if (!traits[a.trait_type][a.value])
//                 traits[a.trait_type][a.value] = {
//                     rarityPercent: 0,
//                     occurances: 0,
//                     filePath: '',
//                     name: a.value,
//                     layer: a.trait_type,
//                     required: false,
//                 };

//             traits[a.trait_type][a.value].occurances++;
//         });

//         return traits;
//     },
//     {} as UsedTraits<GACLayer>
// );

// const getRarityQuotient = (
//     token: { attributes: ERC721Attribute<GACLayer>[] },
//     collectionSize: number
// ) => {
//     return token.attributes.reduce((prev, cur) => {
//         const { occurances } = usedTraits[cur.trait_type][cur.value];

//         const rarityPercent = occurances / collectionSize;

//         return prev + 1 / rarityPercent;
//     }, 0);
// };

// const sortedByRarity = splitMeta.sort(
//     (a, b) =>
//         getRarityQuotient(a, allSplitMeta.length) -
//         getRarityQuotient(b, allSplitMeta.length)
// );

// const withQuotients = sortedByRarity.map((v) => ({
//     ...v,
//     quotient: getRarityQuotient(v, allSplitMeta.length),
// }));

// fs.writeFileSync(
//     `${outputDir}/metaWithQuotients.json`,
//     JSON.stringify(withQuotients, null, 4)
// );

const splitMeta = JSON.parse(
    fs
        .readFileSync(
            'C:/Users/Cory/source/repos/Gaming-Apes-Club/Utils/src/Assets/Outputs/2-28-2022-5/split_meta.json'
        )
        .toString()
) as ERC721Meta<GACLayer>[];

const OUTPUT_METADATA_DIR =
    'C:/Users/Cory/source/repos/Gaming-Apes-Club/Utils/src/Assets/OutputMetadata';

splitMeta.forEach((v, i) => {
    const sanitized: ERC721Meta<GACLayer> = {
        name: v.name,
        external_url: v.external_url,
        description: v.description,
        image: `https://cc_nftstore.mypinata.cloud/ipfs/Qmcs5wVVKyTmVh4jRb2Zsaj5D9mrgmJyTG5Xfie5p6NPH6/${i}.webp`,
        attributes: [],
    };
    v.attributes.forEach((a) => {
        sanitized.attributes.push({
            display_type: a.display_type,
            trait_type: a.trait_type,
            value: a.value,
        });
    });

    fs.writeFileSync(
        `${OUTPUT_METADATA_DIR}/${i}`,
        JSON.stringify(sanitized, null, 4)
    );
});
