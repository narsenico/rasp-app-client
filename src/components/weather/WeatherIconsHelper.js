/**
 * Ritorna la classe css per l'icona da usare in base alle informazioni
 * contenute in hourly, che rappresenta il meteo per una precisa ora.
 *
 * hourly può contenere diversi oggetti weather, considero quello indicato da index.
 *
 * @param {any} hourly
 * @param {String}  sunrise alba come stringa UTC
 * @param {String}  sunset  tramonto come string UTC
 * @param {Number}  index   indice di hourly.weather
 */
export const getHourlyIconClassName = (hourly, sunrise, sunset, index = 0) => {
    const weather = hourly.weather[index];
    const hhDate = new Date(hourly.date).getHours();
    const hhSunrise = new Date(sunrise).getHours();
    const hhSunset = new Date(sunset).getHours();

    // https://gist.github.com/tbranyen/62d974681dea8ee0caa1
    if (hhDate >= hhSunrise && hhDate < hhSunset) {
        return `wi wi-owm-day-${weather.id}`;
    } else if (hhDate >= hhSunset || hhDate < hhSunrise) {
        return `wi wi-owm-night-${weather.id}`;
    } else {
        return '';
    }
};
