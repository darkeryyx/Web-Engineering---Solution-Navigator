const fs = require('fs');


// stoppworte holen
const stoppWoerter = JSON.parse(fs.readFileSync('stopwords.json', 'utf8'));

async function haeufigsteWoerter(){
    try{
        // vorgegebener text
        const response = await fetch('https://kaul.inf.h-brs.de/ccm/we/ws23/resources/assets/Plagiatsresolution.html');
        const text = await response.text();


        // html tags mit leeren string ersetzen
        const ersetzt = (text) => text.replace(/<[^>]*>/g, '').toLowerCase();//lowerCase= umwandeln in kleinbuchstaben

        //stoppwörter entfernen und nicht stopwörter rausfilter
        const filterstoppWoerter = (text) => text.split(/\s+/).filter(wort => !stoppWoerter.includes(wort));
        const ersetztGefiltert = filterstoppWoerter(ersetzt(text));

        // wörter zählen
        const haeufigkeiten = ersetztGefiltert.reduce((acc, wort) => {
            acc[wort] = (acc[wort] || 0) + 1;
            return acc;
        }, {});

        //3 häufigsten wörter gesucht
        const top3worte = Object.entries(haeufigkeiten)
            .sort((a, b) => b[1] - a[1]) // sortierung absteigende häufigkeit
            .slice(0, 3) // ersten 3 wörter nehmen
            .map(entry => entry[0]); 

        console.log('Die 3 häufigsten Wörter:', top3worte);
    }catch(error){
        console.error('Webseite nicht richtig heruntergeladen', error);
    }
}

haeufigsteWoerter();
