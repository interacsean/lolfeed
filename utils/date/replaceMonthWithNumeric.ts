const mos = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const replaceMonthWithNumeric = (str: string) => {
  return mos.reduce((subj, MMMM, monNumMinus1) => {
    return subj.replace(MMMM, (monNumMinus1 + 1).toString().padStart(2, '0'));
  }, str);
};

export default replaceMonthWithNumeric;
