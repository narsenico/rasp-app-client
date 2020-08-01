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
    const date = +((new Date(hourly.date).getTime() / 1000).toFixed());

    // https://gist.github.com/tbranyen/62d974681dea8ee0caa1
    if (date >= sunrise && date < sunset) {
        return `wi wi-owm-day-${weather.id}`;
    } else if (date >= sunset || date < sunrise) {
        return `wi wi-owm-night-${weather.id}`;
    } else {
        return '';
    }
};
