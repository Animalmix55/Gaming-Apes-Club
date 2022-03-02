import { Member, User } from 'discord-oauth2';

export interface AuthLocals {
    [x: string]: unknown;
    user: User & { member: Member };
    isAdmin: boolean;
}

export default AuthLocals;
