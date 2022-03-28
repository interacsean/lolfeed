const log = <T>(v: T): true => {
  // todo: Send to log service
  console.log(v);
  return true;
};

export default log;
