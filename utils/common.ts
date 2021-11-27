export type Collection<T> = Record<string, T>;

export function normalize<T>(array: T[], indexKey: keyof T): Collection<T> {
  const normalizedObject: any = {};
  for (const element of array) {
    const key = element[indexKey];
    normalizedObject[key] = element;
  }
  console.log('normalizedObject:', normalizedObject);
  return normalizedObject as Collection<T>;
}

export function denormalize<T>(collection: Collection<T>): T[] {
  return Object.values(collection);
}
