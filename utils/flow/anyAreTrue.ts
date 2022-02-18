const anyAreTrue = <T>(fns: ((arg: T) => boolean)[], subj: T) =>
  fns.map((f) => f(subj)).includes(true);

export default anyAreTrue;
