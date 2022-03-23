import fs from 'fs';
import {
    generateGACImages,
    generateGACMetadata,
} from './GenerateMeta/GenerateGAC';
import {
    ERC721Meta,
    ERC721MetaWithImagePath,
    GACLayer,
    UsedTraits,
} from './GenerateMeta/Models';

const OUTPUT_BASE =
    'C:/Users/Cory/source/repos/Gaming-Apes-Club/Utils/src/Assets/Outputs';
const getNextOutputDir = (): string => {
    const allPathsInDir = fs.readdirSync(OUTPUT_BASE);
    const folders = allPathsInDir.filter((path) => {
        const fullPath = `${OUTPUT_BASE}/${path}`;
        return fs.lstatSync(fullPath).isDirectory();
    });

    let index = 0;
    const date = new Date();
    const dirname = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    let result = `${dirname}-${index}`;

    while (folders.includes(result)) {
        index++;
        result = `${dirname}-${index}`;
    }

    return `${OUTPUT_BASE}/${result}`;
};

const generateMetadata = (): void => {
    const outputDir = getNextOutputDir();

    let meta: {
        metadata: ERC721MetaWithImagePath<GACLayer>[];
        usedTraits: UsedTraits<GACLayer>;
    };

    while (true) {
        try {
            meta = generateGACMetadata(
                6500,
                'Gaming Ape Club',
                'C:/Users/Cory/source/repos/Gaming-Apes-Club/Utils/src/Assets/Art',
                'C:/Users/Cory/source/repos/Gaming-Apes-Club/Utils/src/Assets/Rarities.csv',
                undefined,
                'https://www.gamingapeclub.com/'
            );
        } catch (e) {
            // eslint-disable-next-line no-continue
            continue;
        }

        break;
    }

    fs.mkdirSync(outputDir);

    fs.writeFileSync(
        `${outputDir}/meta.json`,
        JSON.stringify(meta.metadata, null, 4)
    );
    fs.writeFileSync(
        `${outputDir}/used.json`,
        JSON.stringify(meta.usedTraits, null, 4)
    );
    const imageDir = `${outputDir}/images`;
    fs.mkdirSync(imageDir);

    generateGACImages(meta.metadata, imageDir);
};

// generateMetadata();

Array.from(new Array(6550)).forEach((_, i) => {
    const meta: ERC721Meta<GACLayer> = {
        name: `Gaming Ape #${i}`,
        external_url: 'https://www.gamingapeclub.com/',
        attributes: [],
        image: '',
    };

    fs.writeFileSync(
        `C:/Users/Cory/source/repos/Gaming-Apes-Club/Utils/src/Assets/PlaceholderMetadata/${i}`,
        JSON.stringify(meta, null, 4)
    );
});
