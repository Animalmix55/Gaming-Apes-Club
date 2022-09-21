export interface ListingRole {
    roleId: string;
    /**
     * Indicates the role CANT access listing
     */
    blacklisted: boolean | null;
}
