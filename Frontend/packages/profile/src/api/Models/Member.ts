import { User } from './User';

export interface Member {
    user?: User;
    nick: string | null | undefined;
    roles: string[];
    joined_at: number;
    premium_since?: number | null | undefined;
    deaf: boolean;
    mute: boolean;
    pending?: boolean;
    is_pending?: boolean;
    communication_disabled_until?: string | null;
}
