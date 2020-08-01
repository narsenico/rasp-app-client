export const ensureArray = (value) => {
    if (value === undefined) {
        return [];
    } else if (Array.isArray(value)) {
        return value;
    } else {
        return [value];
    }
};
