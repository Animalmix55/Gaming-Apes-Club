export interface GuildMember {
    guildId: string;
    joinedTimestamp: number;
    premiumSinceTimestamp?: number;
    nickname: string;
    pending: boolean;
    communicationDisabledUntilTimestamp?: number;
    userId: string;
    avatar?: string;
    displayName: string;
    roles: string[];
    avatarURL?: string;
    displayAvatarURL?: string;
}
