const appendToString = (suffix: string) => (str: string | number) => [str, suffix].join('');

export const appendPixelToString = appendToString('px')