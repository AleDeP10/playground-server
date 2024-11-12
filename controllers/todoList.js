import pool from "../config/dbConfig.js";
import utentiConnessi from '../dataStore.js';

const setCriteriQuery = (query, criteri) => {

    var sezioni = getSezioneValues(criteri);
    console.log(sezioni);
    for (let i = 0; i < sezioni.length; i++) {
        let tabella = sezioni[i]
        query.join(`${tabella} as tab${i}`, function () {
            this.on(`tab${i}.userid`, '=', 'ts.id')
        });

        let valoriSezioni = getSezioni(criteri, tabella)
        console.log("valoriSezioni=", valoriSezioni)
        for (const val of valoriSezioni) {
            query.where(`tab${i}.${val.campo}`, val.newValue.id);
        }
    };
    return query;
}

const getSezioneValues = (obj) => {
    const values = [];

    function searchSezione(currentObj) {
        for (const key in currentObj) {
            if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                searchSezione(currentObj[key]);
            } else if (key === 'sezione') {
                if (!values.includes(currentObj[key]))
                    values.push(currentObj[key]);
            }
        }
    }
    searchSezione(obj);
    return values;
}

const getSezioni = (obj, sezione) => {
    const risultati = [];

    // Itera attraverso le chiavi dell'oggetto principale
    for (const chiave in obj.filtriRicerca) {
        if (obj.filtriRicerca.hasOwnProperty(chiave)) {
            const sottoOggetto = obj.filtriRicerca[chiave];
            if (sottoOggetto.sezione === sezione) {
                risultati.push(sottoOggetto);
            }
        }
    }

    return risultati;
}

export const ricerca = async (req, res) => {
    var criteri = req.body;
    try {
        let query = req.db('Task as ts')
            .select(
                'ts.id as taskId',
                'ts.task',
                'ts.status',
            )
            .from('Task as ts')
            .where('ts.status', '=', req.db.raw('?', ['stato']));   // Usa raw per il valore statico

        query = setCriteriQuery(query, criteri) // criteri deve contenere "stato"

        const risultati = await query;
        console.log({ criteri, risultati });
        // const modifiedRows = risultati.map(row => {
        //     if (utentiConnessi.hasOwnProperty(row.userId)) {
        //         return {
        //             ...row,
        //             online: true
        //         };
        //     }
        //     return row;
        // });
        // res.status(200).json(modifiedRows);
        res.status(200).json(risultati);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errore nella ricerca dei dati' });
    }
};

export const controller = {
    ricerca: ricerca
};