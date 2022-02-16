const tmplBody = `import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import getEventbriteOrganizerEvents from '../common/eventbrite/getEventbriteOrganizerEvents';
import { {{ShortHand}}EvtRaw } from './types';

const get{{FileName}} = (): Promise<ApiErrorOr<{{ShortHand}}EvtRaw[]>> =>
  getEventbriteOrganizerEvents('{{organiserPath}}');

export default get{{FileName}};
`;

const tmplNormalise = `import { ComEvent, Sources } from '../../../events/types';
import { EvtBrtEvtRaw } from '../common/eventbrite/types';
import getEventbriteEvtId from '../common/eventbrite/getEventbriteEvtId';
import getNormalisedEventbriteEvent from '../common/eventbrite/getNormalisedEventbriteEvent';
import { {{ShortHand}}EvtRaw } from './types';

export const get{{FileName}}Id = (ce: {{ShortHand}}EvtRaw) => getEventbriteEvtId('{{code}}', ce)

const normalise{{FileName}}Event = (ce: {{ShortHand}}EvtRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('{{code}}', ce);

  if (!rest) return null;
  return ({
    ...rest,
    source: Sources.{{FILE_NAME}},
    venueName: '{{Venue_Name}}',
  });
}

export default normalise{{FileName}}Event;
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const fileName = cliArgs[0] || (await makey.ask('My first question:'));
  const FileName = makey.toUpperCaseFirst(fileName);
  const ShortHand = await makey.ask('Short Hand version:');
  const code = await makey.ask('Three Letter Code:');
  const organiserPath = await makey.ask('EventBrite /o/{path}:');
  const Venue_Name = await makey.ask('Venue name:');
  const FILE_NAME = makey.camelToSnakeCaps(fileName);

  makey.createFile(
    `./services/api/sources/${fileName}/get${FileName}.ts`,
    makey.templateReplace(tmplBody, {
      FileName,
      ShortHand,
      organiserPath,
    }),
  );

  makey.createFile(
    `./services/api/sources/${fileName}/normalise${FileName}Event.ts`,
    makey.templateReplace(tmplNormalise, {
      fileName,
      FileName,
      FILE_NAME,
      code,
      ShortHand,
      Venue_Name,
    }),
  );

  makey.createFile(
    `./services/api/sources/${fileName}/types.ts`,
    `import { EvtBrtEvtRaw } from '../common/eventbrite/types';

export type ${ShortHand}EvtRaw = EvtBrtEvtRaw;
`,
  );
};
