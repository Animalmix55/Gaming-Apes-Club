export interface HasListingRoles {
    roles: ListingRole[];
}

export interface ListingRole {
    listingId: string;
    roleId: string;
    /**
     * Indicates the role CANT access listing
     */
    blacklisted: boolean | null;
}

export const getRoleId = (role: ListingRole) => role.roleId;
