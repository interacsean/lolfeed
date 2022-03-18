const tmplBody = `import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import getEventbriteOrganizerEvents from '../common/eventbrite/getEventbriteOrganizerEvents';
import { {{ShortHand}}EvtRaw } from './types';

const get{{FileName}} = (): Promise<ApiErrorOr<{{ShortHand}}EvtRaw[]>> =>
  getEventbriteOrganizerEvents('{{organiserPath}}');

export default get{{FileName}};
`;

const tmplNormalise = `import { ComEvent, Sources } from '../../types';
import getEventbriteEvtId from '../common/eventbrite/getEventbriteEvtId';
import getNormalisedEventbriteEvent from '../common/eventbrite/getNormalisedEventbriteEvent';
import { {{ShortHand}}EvtRaw } from './types';

export const get{{FileName}}Id = (ce: {{ShortHand}}EvtRaw) => getEventbriteEvtId('{{code}}', ce)

const normalise{{FileName}}Event = (ce: {{ShortHand}}EvtRaw): ComEvent | null => {
  const rest = getNormalisedEventbriteEvent('{{code}}', ce);

  if (!rest) return null;
  return ({
    ...rest,
    source: Sources.{{SOURCE_TYPE}},
    venueName: '{{Venue_Name}}',
  });
}

export default normalise{{FileName}}Event;
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const fileName = cliArgs[0] || (await makey.ask('My first question:'));
  const FileName = makey.toUpperCaseFirst(fileName);
  const ShortHand = await makey.ask('Short Hand version (6 chrs):');
  const code = await makey.ask('Three Letter Code:');
  const organiserPath = await makey.ask('EventBrite /o/{path}:');
  const Venue_Name = await makey.ask('Venue name:');
  const SOURCE_TYPE = await makey.ask('Sources enum key:');
  const FILE_NAME = makey.camelToSnakeCaps(fileName);

  makey.createFile(
    `./services/events/sources/${fileName}/get${FileName}.ts`,
    makey.templateReplace(tmplBody, {
      FileName,
      ShortHand,
      organiserPath,
    }),
  );

  makey.createFile(
    `./services/events/sources/${fileName}/normalise${FileName}Event.ts`,
    makey.templateReplace(tmplNormalise, {
      fileName,
      FileName,
      FILE_NAME,
      code,
      ShortHand,
      Venue_Name,
      SOURCE_TYPE,
    }),
  );

  makey.createFile(
    `./services/events/sources/${fileName}/types.ts`,
    `import { EvtBrtEvtRaw } from '../common/eventbrite/types';

export type ${ShortHand}EvtRaw = EvtBrtEvtRaw;
`,
  );

  makey.editFile(`./services/events/sources/eventSources.ts`, (file) =>
    file.replace(
      `  },
];`,
      `  },
  {
    source: Sources.${SOURCE_TYPE},
    getId: get${FileName}Id,
    getEvents: get${FileName},
    normalise: normalise${FileName}Event,
  },
];`,
    ),
  );
};
