import React, { useEffect } from 'react';
import axios from 'axios';

import './WasteCollection.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

/**
 * Componente che mostra il prossimo ritiro dei rifiuti.
 * TODO: deve aggiornarsi dopo l'orario di ritiro rifiuti, verso le 10AM
 * TODO: aggiungere link a editor (importare da waste-collection-calendar)
 */
function WasteCollection() {
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(
                    `${SERVER_BASE_URL}/waste`
                );
                const waste = res.data;
                console.log(waste);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return <div className="waste-collection">WASTE COLLECTION</div>;
}

export default WasteCollection;
