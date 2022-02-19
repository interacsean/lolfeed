const tmplBody = `import {
  ComEvent,
  defaultEvtApproval,
  Sources,
  TimestampPrecision,
} from '../../types';
import { Tags } from '../../tags/tags';
import getNextNDates, { DayOfWeek } from '../../../../utils/date/getNextNDates';
import { unconfirmedMessage } from './common';

const get{{FileName}}Id = (date: Date) =>
  \`{{TLC}}-\${date.toISOString().substring(0, 10)}\`;

const get{{FileName}}Weeklies = (now: number = Date.now()): ComEvent[] => {
  const nextFourOccurrances = getNextNDates(4, DayOfWeek.Sunday, 18, 30);

  return nextFourOccurrances.map((date) => {
    return {
      uid: get{{FileName}}Id(date),
      timestampPrecision: TimestampPrecision.TIME,
      title: 'Laughs at {{FileName}}',
      description: \`\${unconfirmedMessage}\`,
      venueName: '{{Venue_Name}}',
      orderLink: '',
      timestamp: [date.getTime()],
      price: 0,
      source: Sources.{{SOURCE_CODE}},
      tags: [],
      timezone: 'Australia/Melbourne',
      approval: defaultEvtApproval,
    };
  });
};

export default get{{FileName}}Weeklies;
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const fileName = cliArgs[0] || (await makey.ask('file name:'));
  const FileName = makey.toUpperCaseFirst(fileName);
  const SOURCE_CODE = await makey.ask('Sources code:');
  const Venue_Name = await makey.ask('Venue Name:');
  const TLC = await makey.ask('Three letter code:');

  makey.createFile(
    `./services/events/weeklyEvents/weeklies/get${FileName}Weeklies.ts`,
    makey.templateReplace(tmplBody, {
      fileName,
      FileName,
      SOURCE_CODE,
      Venue_Name,
      TLC,
    }),
  );
};
