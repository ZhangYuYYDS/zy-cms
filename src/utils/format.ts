import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export function utcFormat(utcString: string, format = 'YYYY-MM-DD HH:mm:ss') {
  dayjs.utc;
  return dayjs.utc(utcString).utcOffset(8).format(format);
}
