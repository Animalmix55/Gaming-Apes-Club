import { Member, User } from 'discord-oauth2';

export interface TokenClaims extends User {
    member: Member;
}
