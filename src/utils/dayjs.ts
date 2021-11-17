import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import preciseRange from 'dayjs-precise-range';
import isBetween from 'dayjs/plugin/isBetween';

//plugins
dayjs.extend(duration);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);
dayjs.extend(preciseRange);
dayjs.extend(isBetween);

export default dayjs;
