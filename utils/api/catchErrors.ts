import reportError from '../../services/reporting/reportError';
import { err } from 'errable';

const catchErrorsWithMsg = (msg: string) => (e: any) => {
  reportError(msg);
  return err({ message: msg, e });
};

export default catchErrorsWithMsg;
