export interface HasListingRoles {
    roles: ListingRole[];
}

export interface HasRoleIds {
    roles: string[];
}

export interface ListingRole {
    listingId: string;
    roleId: string;
}

export const getRoleId = (role: ListingRole) => role.roleId;

export const mapToRoleId = <BaseType>(
    input: BaseType & HasListingRoles
): BaseType & HasRoleIds => {
    return { ...input, roles: input.roles.map(getRoleId) } as never;
};

export const mapToRoleIds = <BaseType>(
    input: (BaseType & HasListingRoles)[]
): (BaseType & HasRoleIds)[] => {
    return input.map((i) => mapToRoleId(i)) as never;
};
