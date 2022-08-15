/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const ExtractErrorMessageFromError = (
    error: any
): string | undefined => {
    if (!error) return undefined;
    if (axios.isAxiosError(error)) {
        if (error.response?.data.error) return error.response?.data.error;
        return error.message;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error as any).message;
};

export default {};
