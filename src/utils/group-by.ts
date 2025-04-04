type GroupByKey<T> = (item: T) => string;

export function groupBy<T>(array: T[], keyGetter: GroupByKey<T>): Map<string, T[]> {
  const map = new Map<string, T[]>();

  for (const item of array) {
    const key = keyGetter(item);
    const group = map.get(key);
    if (!group) {
      map.set(key, [item]);
    } else {
      group.push(item);
    }
  }

  return map;
}
