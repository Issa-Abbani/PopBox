//For passing an array of strings
export function isEmpty(...values: string[]): boolean {
  return values.some(value => value.trim() === "");
}


//for passing an object
export function hasEmptyValue(values: Record<string, string>): boolean {
  return Object.values(values).some(value => value.trim() === "");
}