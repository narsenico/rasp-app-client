import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { formatDate, shortTime, parseDate, humanDate } from '#helpers/date';

import './WasteCollectionView.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
// ora di termine ritiro rifiuti
const WASTE_COLLECTION_END_TIME = '10:00';
// descrizione tipologia rifiuti
const WASTE_DESCR = {
    P: 'Plastica',
    C: 'Carta',
    U: 'Umido',
    V: 'Vetro',
    S: 'Secco',
};

/**
 * Componente che mostra il prossimo ritiro dei rifiuti.
 * TODO: deve aggiornarsi dopo l'orario di ritiro rifiuti, verso le 10AM
 * TODO: aggiungere link a editor (importare da waste-collection-calendar)
 */
function WasteCollectionView() {
    const [waste, setWaste] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const today = formatDate(new Date(), 'yyyyMMdd');
                const now = shortTime();
                // ritorna il ritiro per la data indicata (sempre) e il successivo (se c'è)
                const res = await axios.get(
                    `${SERVER_BASE_URL}/waste/${today}`
                );
                // ritorna un array
                // come primo elemento la data richiesta
                // come seoncdo il ritiro successivo alla data richiesta, se esiste
                const { data } = res;
                // console.log(data);

                // se non è ancora passata l'ora del ritiro cerco oggi
                const index =
                    now <= WASTE_COLLECTION_END_TIME && data[0] ? 0 : 1;
                if (data[index]) {
                    // data[index].waste = 'S';
                    setWaste({
                        title: humanDate(parseDate(data[index].date)), // TODO: formattare
                        items: data[index].waste.split('').map((wt) => ({
                            icon: 'waste-icon-' + wt,
                            type: wt,
                            description: WASTE_DESCR[wt],
                        })),
                    });
                } else {
                    setWaste({
                        title: 'NULLA',
                        itmes: [],
                    });
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return (
        <div className="waste-collection-view box">
            <div className="box-header text-center place-center text-uppercase text-ellipsis text-2x">
                {waste.title}
            </div>
            <div className="item-container">
                {waste.items &&
                    waste.items.map((item, index) => (
                        <div key={index} className="item">
                            <div className="descr text-uppercase">
                                {item.description}
                            </div>
                            <div className="icon">
                                <div
                                    className="waste-icon"
                                    type={item.type}
                                ></div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default WasteCollectionView;
