import { BaseResponse } from '@gac/shared';
import express from 'express';
import { ListingTagEntity } from '../database/models/ListingTag';
import { ListingTag } from '../models/ListingTag';

interface GetResponse extends BaseResponse {
    results?: ListingTag[];
}

export const getTagsRouter = () => {
    const TagsRouter = express.Router();

    // GET
    TagsRouter.get<string, never, GetResponse, never, never, never>(
        '/',
        async (req, res) => {
            try {
                const tags = await ListingTagEntity.findAll();
                return res
                    .status(200)
                    .send({ results: tags.map((s) => s.get()) });
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
