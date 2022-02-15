const tmplBody = `import React from "react";
import { Box } from "@chakra-ui/react";

type Props = {};

const {{ComponentName}} = (props: Props) => {
  return (
    <Box></Box>
  );
};

export default React.memo({{ComponentName}});
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  if (!cliArgs[0]) throw Error('Must provide path to component');
  const path = cliArgs[0];

  if (!cliArgs[1]) throw Error('Must provide component name');
  const fileName = cliArgs[1];

  const bodyFilled = makey.templateReplace(tmplBody, {
    ComponentName: fileName,
  });

  makey.createFile(`./components/${path}/${fileName}/index.tsx`, bodyFilled);
};
