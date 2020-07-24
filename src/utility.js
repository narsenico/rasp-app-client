import { useRef, useEffect } from 'react';
import { format as dfFormat } from 'date-fns';
import { it } from 'date-fns/locale';
import { CronJob } from 'cron';

/**
 * Hook react per setInterval
 *
 * @param {Function} callback funzione da eseguire ad ogni intervallo
 * @param {Number} delay millisecondi di attesa per la prima esecuzione
 * @param {Number} timeout timeout internvallo in millisecondi
 */
export const useInterval = (callback, delay, timeout) => {
    const fn = useRef();

    useEffect(() => {
        fn.current = callback;
    }, [callback]);

    useEffect(() => {
        let hnd;
        if (delay < timeout) {
            hnd = setTimeout(fn.current, delay);
        }
        return () => {
            clearTimeout(hnd);
        };
    }, [fn, delay, timeout]);

    useEffect(() => {
        const hnd = setInterval(fn.current, timeout);
        return () => {
            clearInterval(hnd);
        };
    }, [fn, timeout]);
};

/**
 * Hook per cron.
 * Se l'opzione runOnInit è true la callback viene chiamata la prima
 * volta immediatamente.
 *
 * @param {String} cronTime indica quando scatenare la callback, usando la sintassi cron
 * @param {Function} callback callback chiamata
 * @param {Object} options opzioni
 */
export const useCron = (cronTime, callback, { runOnInit }) => {
    const fn = useRef();

    useEffect(() => {
        fn.current = callback;
    }, [callback]);

    useEffect(() => {
        const job = new CronJob(
            cronTime,
            fn.current,
            null,
            false,
            undefined,
            undefined,
            runOnInit
        );
        job.start();
        return () => job.stop();
    }, [cronTime, runOnInit]);
};

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
