import { useRef, useEffect } from 'react';
import { CronJob } from 'cron';

/**
 * Hook per cron.
 * Se l'opzione runOnInit è true la callback viene chiamata la prima
 * volta immediatamente.
 *
 * @param {String} cronTime indica quando scatenare la callback, usando la sintassi cron
 * @param {Function} callback callback chiamata
 * @param {Object} options opzioni
 */
const useCron = (cronTime, callback, { runOnInit }) => {
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

export default useCron;