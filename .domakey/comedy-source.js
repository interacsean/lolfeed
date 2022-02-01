const tmplBody = `import axios from 'axios';
import scrapy from 'node-scrapy';
import { {{ShortHand}}EvtRaw } from './types';
import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import { err } from 'errable';

const scrapeModel = {
  events: [
    '.group',
    {
      id: '.selector',
    }
  ],
}

const get{{FileName}} = (): Promise<ApiErrorOr<{{ShortHand}}EvtRaw[]>> => axios.get(
  \`https://source/\`
).then
  (({ data }) => {
    const structured = scrapy.extract(data, scrapeModel) as { events?: {{ShortHand}}EvtRaw[] };
    // todo: clean
    return structured?.events || err({ message: 'Could not get {{FileName}} events', errors: structured });
  });

export default get{{FileName}};
`;

const tmplNormalise = `import { {{ShortHand}}EvtRaw } from './types';
import { ComEvent, Sources, TimestampPrecision } from '../../../events/types';

export const get{{FileName}}Id = (event: {{ShortHand}}EvtRaw) => \`CODE-\${event.id}\`

const normalise{{FileName}}Event = (ce: {{ShortHand}}EvtRaw): ComEvent | null => {
  return ({
    uid: get{{FileName}}Id(ce),
    source: Sources.SOURCE,
    title: ce.title,
    subTitle: ce.subTitle,
    venueName: '',
    timezone: 'Australia/Melbourne',
    timestamp,
    timestampPrecision,
    orderLink: \`https://source/\${ce.bookingLink}\`,
    ...ce.imgSrc && { imgSrc: ce.imgSrc },
    price: ce.price && parseFloat(ce.price) || null,
  });
}
export default normalise{{FileName}}Event;
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const fileName = cliArgs[0] || (await makey.ask('My first question:'));
  const FileName = makey.toUpperCaseFirst(fileName);
  const ShortHand = await makey.ask('Short Hand version:');
  
  makey.createFile(
    `./services/api/sources/${fileName}/get${FileName}.ts`,
    makey.templateReplace(
      tmplBody,
      {
        fileName,
        FileName,
        ShortHand,
      }
    ),
  );

  makey.createFile(
    `./services/api/sources/${fileName}/normalise${FileName}Event.ts`,
    makey.templateReplace(
      tmplNormalise,
      {
        fileName,
        FileName,
        ShortHand,
      }
    ),
  );

  makey.createFile(
    `./services/api/sources/${fileName}/types.ts`,
    `export type ${ShortHand}EvtRaw = {
  id: string,
  imgSrc: string,
  title: string,
}
`
  );
}
