import { extractTime } from './normaliseRubberChickenEvent';
import { TimestampPrecision } from '../../../events/types';

describe('extractTime', () => {
  test('Finds date range with no time', () => {
    const expected = ['Description here', [1645318800000], TimestampPrecision.DAY];

    const actual = extractTime('Description here – February 20 - 24');

    expect(actual).toEqual(expected);
  });
  test('Finds date with time', () => {
    const expected = ['Description here', [1644654600000], TimestampPrecision.TIME];

    const actual = extractTime('Description here – Sunday 12 February – 7:30pm');

    expect(actual).toEqual(expected);
  });
  test('Finds date with time (no mins)', () => {
    const expected = ['Description here', [1644652800000], TimestampPrecision.TIME];

    const actual = extractTime('Description here – Sunday 12 February 7pm');

    expect(actual).toEqual(expected);
  });
  test('Finds date with time capital pm', () => {
    const expected = ['Description here', [1644652800000], TimestampPrecision.TIME];

    const actual = extractTime('Description here – Sunday 12 February – 7PM');

    expect(actual).toEqual(expected);
  });

  test('Finds date with time reversed', () => {
    const expected = ['Description here', [1644652800000], TimestampPrecision.TIME];

    const actual = extractTime('Description here – Sunday February 12 – 7PM');

    expect(actual).toEqual(expected);
  });
});
