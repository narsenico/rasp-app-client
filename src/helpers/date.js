import { format as dfFormat, parse as dfParse, addDays } from 'date-fns';
import { it } from 'date-fns/locale';

export const formatDate = (date, format) => {
    return dfFormat(date, format, { locale: it });
};

export const shortTime = (date = Date.now()) => {
    return formatDate(date, 'HH:mm');
};

export const longTime = (date = Date.now()) => {
    return formatDate(date, 'HH:mm:ss');
};

export const shortDate = (date = Date.now()) => {
    return formatDate(date, 'EEE, dd MMM');
};

export const longDate = (date = Date.now()) => {
    return formatDate(date, 'EEEE, dd MMMM yyyy');
};

export const humanDate = (date = Date.now()) => {
    const today = formatDate(Date.now(), 'yyyyMMdd');
    const tomorrow = formatDate(addDays(Date.now(), 1), 'yyyyMMdd');
    const ref = formatDate(date, 'yyyyMMdd');
    return ref === today
        ? 'Oggi'
        : ref === tomorrow
        ? 'Domani'
        : shortDate(date);
};

export const parseDate = (date, format = 'yyyyMMdd') => {
    return dfParse(date, format, 0);
};
