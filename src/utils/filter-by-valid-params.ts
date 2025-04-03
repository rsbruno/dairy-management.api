export const filterByValidParams = <T>(params: Partial<T>) =>
  Object.entries(params)
    .filter(([_, value]) => !!value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) as Partial<T>;
