import axios, { AxiosRequestHeaders } from 'axios';
import { BaseResponse } from './Models/BaseResponse';
import {
    Listing as ListingModel,
    NewListing,
    UpdatedListing,
} from './Models/Listing';
import { Member } from './Models/Member';
import { Transaction as TransactionModel } from './Models/Transaction';
import { User } from './Models/User';

const getHeaders = (token: string): AxiosRequestHeaders => {
    const headers: AxiosRequestHeaders = {};
    headers.Authorization = `Bearer ${token}`;

    return headers;
};

export const Balance = {
    async getBalance(api: string, discordId: string): Promise<number> {
        const url = `${api}/balance`;

        const { data } = await axios.get(url);
        const { balance } = data;
        return balance as number;
    },
};

interface LoginPostResponse extends BaseResponse, Partial<User> {
    token?: string;
    guildMember?: Member;
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

interface GetListingResponse extends BaseResponse {
    records?: ListingModel[];
    numRecords?: number;
}
type GetListingByIdReponse = Partial<ListingModel> & BaseResponse;
type ListingPostBody = NewListing;
type ListingPostResponse = Partial<ListingModel> & BaseResponse;

type ListingPutBody = UpdatedListing;
type ListingPutResponse = ListingPostResponse;

/**
 * All functions associated with pushing/pulling listings
 */
export const Listing = {
    async getListings(
        api: string,
        pageSize = 1000,
        offset = 0,
        showDisabled = false
    ): Promise<GetListingResponse> {
        const url = `${api}/listing?pageSize=${pageSize}&offset=${offset}&showDisabled=${String(
            showDisabled
        )}`;

        const { data } = await axios.get(url);
        return data as GetListingResponse;
    },

    async getListingById(
        api: string,
        id: string
    ): Promise<GetListingByIdReponse> {
        const url = `${api}/listing/${id}`;

        const { data } = await axios.get(url);
        return data as GetListingByIdReponse;
    },

    async createListing(
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

    async updateListing(
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

interface TransactionGetResponse extends BaseResponse {
    results?: TransactionModel[];
    numRecords?: number;
}

interface TransactionGetSignableMessageResponse extends BaseResponse {
    signableMessage?: string;
    signableMessageToken?: string;
}

interface TransactionSendResponse
    extends BaseResponse,
        Partial<TransactionModel> {
    newBalance?: number;
}

/**
 * All functions associated with pushing/loading transactions from the backend
 */
export const Transaction = {
    async getByUserId(
        api: string,
        token: string,
        userId: string,
        offset = 0,
        pageSize = 1000
    ): Promise<TransactionGetResponse> {
        const url = `${api}/transaction/user/${userId}?offset=${offset}&pageSize=${pageSize}`;

        const headers = getHeaders(token);
        const { data } = await axios.get(url, { headers });

        return data as TransactionGetResponse;
    },

    async getByListingId(
        api: string,
        token: string,
        listingId: string,
        offset = 0,
        pageSize = 1000
    ): Promise<TransactionGetResponse> {
        const url = `${api}/transaction/listing/${listingId}?offset=${offset}&pageSize=${pageSize}`;

        const headers = getHeaders(token);
        const { data } = await axios.get(url, { headers });

        return data as TransactionGetResponse;
    },

    async getBulk(
        api: string,
        token: string,
        offset = 0,
        pageSize = 1000
    ): Promise<TransactionGetResponse> {
        const url = `${api}/transaction?offset=${offset}&pageSize=${pageSize}`;

        const headers = getHeaders(token);
        const { data } = await axios.get(url, { headers });

        return data as TransactionGetResponse;
    },

    async getTransactionSignableMessage(
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

    async sendTransaction(
        api: string,
        token: string,
        listingId: string,
        signableMessageToken: string,
        signature: string,
        address: string,
        quantity = 1
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
};

export default {};
