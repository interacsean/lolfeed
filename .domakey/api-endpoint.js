const tmplBody = `import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrResponse } from '../../../utils/api/ApiErrResponse';

export type {{EndpointName}}Response = ApiErrResponse | {};

export default function {{endpointName}}Route(
  req: NextApiRequest,
  res: NextApiResponse<{{EndpointName}}Response>
) {
  if (req.method === 'GET') {
    res.json({ done: true });
  }
  return res.status(500).json({ message: 'Method not supported' });
}
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const fileName = cliArgs[0] || (await makey.ask('Endpoint path (from /pages/api/:'));

  const endpointName = fileName.split('/').reverse()[0];
  const EndpointName = makey.toUpperCaseFirst(endpointName);

  makey.createFile(
    `./pages/api/${fileName}.ts`,
    makey.templateReplace(
      tmplBody,
      {
        endpointName,
        EndpointName,
      }
    ),
  );
}
