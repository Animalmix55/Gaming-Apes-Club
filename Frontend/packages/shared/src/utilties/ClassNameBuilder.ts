export const ClassNameBuilder = (
    ...classNames: (undefined | string | boolean)[]
): string => {
    return classNames.filter((c) => !!c).join(' ');
};

export default ClassNameBuilder;
