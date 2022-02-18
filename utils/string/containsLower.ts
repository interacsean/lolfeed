const containsLower = (needle: string, haystack: string) =>
  haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;

export default containsLower;
