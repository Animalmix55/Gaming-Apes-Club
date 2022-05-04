import { BaseResponse } from '@gac/shared';
import express from 'express';
import { Op, Sequelize } from 'sequelize';

import { ListingTagEntity } from '../database/models/ListingTag';
import { ListingTagToListingEntity } from '../database/models/ListingTagToListing';
import StoredListing from '../database/models/StoredListing';
import { ListingTag } from '../models/ListingTag';

interface GetResponse extends BaseResponse {
    results?: (ListingTag & { listingCount: number })[];
}

interface GetQuery {
    hideUnused?: 'true' | 'false';
}

export const getTagsRouter = () => {
    const TagsRouter = express.Router();

    // GET
    TagsRouter.get<string, never, GetResponse, never, GetQuery, never>(
        '/',
        async (req, res) => {
            const { query } = req;
            const { hideUnused } = query;

            try {
                const tags = await ListingTagEntity.findAll({
                    attributes: {
                        include: [
                            '*',
                            [
                                Sequelize.fn(
                                    'COUNT',
                                    Sequelize.col('listingToTags.listingId')
                                ),
                                'listingCount',
                            ],
                        ],
                    },
                    ...(hideUnused === 'true' && {
                        having: {
                            listingCount: {
                                [Op.gt]: 0,
                            },
                        },
                    }),
                    include: [
                        {
                            as: 'listingToTags',
                            model: ListingTagToListingEntity,
                            attributes: [],
                            include:
                                hideUnused === 'true'
                                    ? [
                                          {
                                              model: StoredListing,
                                              as: 'listing',
                                              where: {
                                                  disabled: {
                                                      [Op.not]: true,
                                                  },
                                                  startDate: {
                                                      [Op.or]: [
                                                          { [Op.eq]: null },
                                                          {
                                                              [Op.lte]:
                                                                  new Date(),
                                                          },
                                                      ],
                                                  },
                                                  endDate: {
                                                      [Op.or]: [
                                                          { [Op.eq]: null },
                                                          {
                                                              [Op.gt]:
                                                                  new Date(),
                                                          },
                                                      ],
                                                  },
                                              },
                                              attributes: [],
                                          },
                                      ]
                                    : [],
                        },
                    ],
                    group: ['ListingTag.id'],
                });
                return res
                    .status(200)
                    .send({ results: tags.map((s) => s.get() as never) });
            } catch (e) {
                console.error(`Tag retrieval by ${req.ip} failed`, e);
                return res
                    .status(500)
                    .send({ error: 'Failed to retrieve Tags' });
            }
        }
    );

    return TagsRouter;
};

export default getTagsRouter;
