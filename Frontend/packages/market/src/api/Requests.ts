import axios, { AxiosRequestHeaders } from 'axios';
import { BaseResponse } from './Models/BaseResponse';
import { GuildMember } from './Models/GuildMember';
import {
    Listing as ListingModel,
    ListingWithCount,
    NewListing,
    UpdatedListing,
} from './Models/Listing';
import { ListingTag } from './Models/ListingTag';
import { Member } from './Models/Member';
import { Transaction as TransactionModel } from './Models/Transaction';
import { User } from './Models/User';

const getHeaders = (token?: string): AxiosRequestHeaders => {
    const headers: AxiosRequestHeaders = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    return headers;
};

export const Balance = {
    async getBalance(api: string, discordId: string): Promise<number> {
        const url = `${api}/balance?discordId=${discordId}`;

        const { data } = await axios.get(url);
        const { balance } = data;
        return balance as number;
    },
};

export const Roles = {
    async getRoles(api: string): Promise<Record<string, string>> {
        const url = `${api}/roles`;

        const { data } = await axios.get(url);
        const { results } = data;
        return results as Record<string, string>;
    },
};

export interface LoginPostResponse extends BaseResponse, Partial<User> {
    token?: string;
    member?: Member;
}

/**
 * All functions associated with logging in
 */
export const Login = {
    async getLoginUrl(api: string): Promise<string> {
        const url = `${api}/login`;

        const { data } = await axios.get(url);
        const { loginUrl } = data;

        return loginUrl as string;
    },

    async getSessionToken(
        api: string,
        code: string
    ): Promise<LoginPostResponse> {
        const url = `${api}/login`;

        const body = { code };

        const { data } = await axios.post(url, body);
        return data as LoginPostResponse;
    },
};

export interface GetListingResponse extends BaseResponse {
    records?: ListingWithCount[];
    numRecords?: number;
}
export type GetListingByIdReponse = Partial<ListingModel> & BaseResponse;
export type ListingPostBody = NewListing;
export type ListingPostResponse = Partial<ListingModel> & BaseResponse;

export type ListingPutBody = UpdatedListing;
export type ListingPutResponse = ListingPostResponse;

/**
 * All functions associated with pushing/pulling listings
 */
export const Listing = {
    async getBulk(
        api: string,
        pageSize?: number,
        offset?: number,
        showDisabled?: boolean,
        showInactive?: boolean,
        tags?: string
    ): Promise<GetListingResponse> {
        const params = new URLSearchParams();
        if (pageSize !== undefined) params.append('pageSize', String(pageSize));
        if (offset !== undefined) params.append('offset', String(offset));
        if (showDisabled !== undefined)
            params.append('showDisabled', String(showDisabled));
        if (tags !== undefined) params.append('tags', tags);
        if (showInactive !== undefined)
            params.append('showInactive', String(showInactive));

        const url = `${api}/listing?${params.toString()}`;

        const { data } = await axios.get(url);
        return data as GetListingResponse;
    },

    async getById(api: string, id: string): Promise<GetListingByIdReponse> {
        const url = `${api}/listing/${id}`;

        const { data } = await axios.get(url);
        return data as GetListingByIdReponse;
    },

    async create(
        api: string,
        token: string,
        listing: NewListing
    ): Promise<ListingPostResponse> {
        const url = `${api}/listing`;

        const body: ListingPostBody = listing;
        const headers = getHeaders(token);

        const { data } = await axios.post(url, body, { headers });

        return data as ListingPostResponse;
    },

    async update(
        api: string,
        token: string,
        listing: UpdatedListing
    ): Promise<ListingPutResponse> {
        const url = `${api}/listing`;

        const body: ListingPutBody = listing;
        const headers = getHeaders(token);

        const { data } = await axios.put(url, body, { headers });

        return data as ListingPutResponse;
    },
};

export interface TransactionGetResponse extends BaseResponse {
    results?: TransactionModel[];
    numRecords?: number;
    users?: Record<string, GuildMember>;
}

export interface TransactionGetSignableMessageResponse extends BaseResponse {
    signableMessage?: string;
    signableMessageToken?: string;
}

export interface TransactionSendResponse
    extends TransactionGetSignableMessageResponse,
        Partial<TransactionModel> {
    newBalance?: number;
}

/**
 * All functions associated with pushing/loading transactions from the backend
 */
export const Transaction = {
    async getByUserId(
        api: string,
        token: string | undefined,
        userId: string,
        offset = 0,
        pageSize = 1000,
        loadUsers = false
    ): Promise<TransactionGetResponse> {
        const url = `${api}/transaction/user/${userId}?offset=${offset}&pageSize=${pageSize}&loadUsers=${String(
            loadUsers
        )}`;

        const headers = getHeaders(token);
        const { data } = await axios.get(url, { headers });

        return data as TransactionGetResponse;
    },

    async getByListingId(
        api: string,
        token: string | undefined,
        listingId: string,
        offset = 0,
        pageSize = 1000,
        loadUsers = false
    ): Promise<TransactionGetResponse> {
        const url = `${api}/transaction/listing/${listingId}?offset=${offset}&pageSize=${pageSize}&loadUsers=${String(
            loadUsers
        )}`;

        const headers = getHeaders(token);
        const { data } = await axios.get(url, { headers });

        return data as TransactionGetResponse;
    },

    async getBulk(
        api: string,
        token: string | undefined,
        offset = 0,
        pageSize = 1000,
        loadUsers = false
    ): Promise<TransactionGetResponse> {
        const url = `${api}/transaction?offset=${offset}&pageSize=${pageSize}&loadUsers=${String(
            loadUsers
        )}`;

        const headers = getHeaders(token);
        const { data } = await axios.get(url, { headers });

        return data as TransactionGetResponse;
    },

    async getSignableMessage(
        api: string,
        token: string,
        listingId: string,
        quantity = 1
    ): Promise<TransactionGetSignableMessageResponse> {
        const url = `${api}/transaction`;

        const headers = getHeaders(token);
        const body = {
            listingId,
            quantity,
        };

        const { data } = await axios.post(url, body, { headers });

        return data as TransactionGetSignableMessageResponse;
    },

    async send(
        api: string,
        token: string,
        listingId: string,
        quantity = 1,
        signableMessageToken?: string,
        signature?: string,
        address?: string
    ): Promise<TransactionSendResponse> {
        const url = `${api}/transaction`;

        const headers = getHeaders(token);
        const body = {
            listingId,
            signableMessageToken,
            signature,
            address,
            quantity,
        };

        const { data } = await axios.post(url, body, { headers });

        return data as TransactionSendResponse;
    },

    async fulfill(
        api: string,
        token: string,
        transactionId: string
    ): Promise<TransactionModel> {
        const url = `${api}/transaction/${transactionId}/fulfill`;

        const headers = getHeaders(token);

        const { data } = await axios.post(url, undefined, { headers });

        return data;
    },

    async refund(
        api: string,
        token: string,
        txId: string
    ): Promise<TransactionModel> {
        const url = `${api}/transaction/${txId}/refund`;

        const headers = getHeaders(token);
        const { data } = await axios.post(url, undefined, { headers });

        return data;
    },
};

export interface TagsGetResponse extends BaseResponse {
    results?: ListingTag[];
}

export const TagRequests = {
    get: async (api: string, hideUnused = false): Promise<TagsGetResponse> => {
        const url = `${api}/tags?hideUnused=${String(hideUnused)}`;

        const { data } = await axios.get<TagsGetResponse>(url);

        return data;
    },
};

export default {};
