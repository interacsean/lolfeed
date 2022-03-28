import reportError from '../../services/reporting/reportError';
import { err } from 'errable';

const catchErrorsWithMsg = (msg: string) => (error: any) => {
  reportError(msg);
  return err({ message: msg, error });
};

export default catchErrorsWithMsg;
