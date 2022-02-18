const tmplBody = `import { {{ShortHand}}EvtRaw } from './types';
import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import getTryBookingEvents from '../common/trybooking/getTryBookingEvents';
import getTryBookingEvtId from '../common/trybooking/getTryBookingEvtId';

export const {{fileName}}TrybookingEid = '{{trybookingCode}}';

export const get{{FileName}}Id = (ev: {{ShortHand}}EvtRaw) => getTryBookingEvtId('{{code}}', ev);

const get{{FileName}} = (): Promise<ApiErrorOr<{{ShortHand}}EvtRaw[]>> =>
  getTryBookingEvents({{fileName}}TrybookingEid);

export default get{{FileName}};

`;

const tmplNormalise = `import { {{ShortHand}}EvtRaw } from './types';
import { ComEvent, Sources } from '../../types';
import getNormalisedTryBookingEvent from '../common/trybooking/getNormalisedTryBookingEvent';
import { {{fileName}}TrybookingEid } from './get{{FileName}}';

const normalise{{FileName}}Event = (ce: {{ShortHand}}EvtRaw): ComEvent | null => {
  const rchEvt = getNormalisedTryBookingEvent({{fileName}}TrybookingEid, '{{code}}', ce);
  return !rchEvt
    ? null
    : {
        ...rchEvt,
        source: Sources.{{SOURCE_TYPE}},
        venueName: '{{Venue_Name}}',
      };
};

export default normalise{{FileName}}Event;
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const fileName = cliArgs[0] || (await makey.ask('fileName:'));
  const FileName = makey.toUpperCaseFirst(fileName);
  const ShortHand = await makey.ask('Short Hand version:');
  const code = await makey.ask('Three Letter Code:');
  const trybookingCode = await makey.ask('Trybooking ID:');
  const Venue_Name = await makey.ask('Venue name:');
  const SOURCE_TYPE = await makey.ask('Sources enum key:');
  const FILE_NAME = makey.camelToSnakeCaps(fileName);

  makey.createFile(
    `./services/events/sources/${fileName}/get${FileName}.ts`,
    makey.templateReplace(tmplBody, {
      fileName,
      FileName,
      ShortHand,
      trybookingCode,
      code,
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
    `import { TryBkgEvtRaw } from '../common/trybooking/types';

export type ${ShortHand}EvtRaw = TryBkgEvtRaw;
`,
  );
};
