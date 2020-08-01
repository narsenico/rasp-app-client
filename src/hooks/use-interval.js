import { useRef, useEffect } from 'react';

/**
 * Hook react per setInterval
 *
 * @param {Function} callback funzione da eseguire ad ogni intervallo
 * @param {Number} delay millisecondi di attesa per la prima esecuzione
 * @param {Number} timeout timeout internvallo in millisecondi
 */
const useInterval = (callback, delay, timeout) => {
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

export default useInterval;