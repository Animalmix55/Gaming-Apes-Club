# GAC Dashboard

## Folder layout

The editable information in the folder is layed out as followed.
Each folder is a section on the dashboard page where `index.ts` holds the data and `*.png` and `*.jpg` are the image files.

```
dashboard/
└── assets/
    ├── banner/
    │   ├── index.ts
    │   └── *.png
    ├── news/
    │   ├── index.ts
    │   └── *.png
    ├── partners/
    │   ├── index.ts
    │   └── *.png
    ├── specials/
    │   ├── index.ts
    │   └── *.png
    └── team/
        ├── index.ts
        ├── *.jpg
        └── *.png
```

## How to update information

1. Import images into the folder required.
2. Open `index.ts` of the folder.
3. Import images at the top of the `index.ts` file.
4. Add data into the structures (You can follow existing information as a guideline)

### Example - Adding News

### 1 - Add Images

First you would add all images required for news into the `dashboard/assets/news` folder.

For this example we will add in these 2 files:

-   gac-pass.png
-   eth-merge.png

Resulting in this file structure:

```
dashboard/
└── assets/
    ├── news/
    │   ├── index.ts
    │   ├── gac-pass.png
    │   ├── eth-merge.png
    │   └── ...
    └── ...
```

#### 2 - Opening `index.ts`

Next we would open the `index.ts` file. Inside the file you will see imports at the top as such:

```js
import UtilityImage from './utility-game-plan.png';
import GridCraftImage from './grid-craft.png';
import P2EImage from './p2e.png';
```

And the following structures:

```ts
const latestNews: NewsType[] = [
    {
        image: UtilityImage,
        title: 'Gaming Ape Club Utility & Game Plan V1',
        url: '#',
    },
    ...
];

const bannerNews = {
    image: GridCraftImage,
    title: 'GAC x GridCraft Latest Updates',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};
```

`latestNews` controls the news section under the main header.

`bannerNews` controls the big news banner next to the stats.

#### 3 - Importing images

At the top of the `index.ts` files below the other imports, we need to add in our images.

**NOTE: If you remove any images, they will need to be removed from the import and structures**

We would add our images as follows:

```ts
import UtilityImage from './utility-game-plan.png';
import GridCraftImage from './grid-craft.png';
import P2EImage from './p2e.png';

import GACPass from './gac-pass.png';
import EthMerge from './eth-merge.png';
```

Please ensure the import name, I.E the word after `import`, e.g `GACPass`, `EthMerge`, is unique to the file.

#### 4 - Add data to structure

In this case we want to add more items to the news below the main header.

We would add the following data:

```ts
const latestNews: NewsType[] = [
    {
        image: UtilityImage,
        title: 'Gaming Ape Club Utility & Game Plan V1',
        url: '#',
    },
    ...,
    {
        image: GACPass,
        title: 'Gaming Ape Club Pass',
        url: 'https://path/to/link',
    },
    {
        image: EthMerge,
        title: 'Ethereum Merge',
        url: 'https://path/to/link',
    }
];
```

#### 5 - Commit and create a PR

You are done!
