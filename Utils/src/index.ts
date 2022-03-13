import fs from 'fs';
import {
    generateGACImages,
    generateGACMetadata,
} from './GenerateMeta/GenerateGAC';

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

const outputDir = getNextOutputDir();

const meta = generateGACMetadata(
    500,
    'Gaming Ape Club',
    'C:/Users/Cory/source/repos/Gaming-Apes-Club/Utils/src/Assets/Art',
    'C:/Users/Cory/source/repos/Gaming-Apes-Club/Utils/src/Assets/Rarities.csv'
);

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
