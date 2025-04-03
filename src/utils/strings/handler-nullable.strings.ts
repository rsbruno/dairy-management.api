export const handlerNullableStrings = (value: string | null | undefined, _default?: string): string =>
  value === null || value === undefined ? (_default ?? '') : value;
