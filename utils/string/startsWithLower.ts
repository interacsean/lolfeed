import { startsWith } from 'ramda';

const startsWithLower = (needle: string, haystack: string) =>
  startsWith(needle.toLowerCase(), haystack.toLowerCase());

export default startsWithLower;
