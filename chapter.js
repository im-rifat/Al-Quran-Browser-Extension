import { readXmlAsync } from "./utils/xml_reader.js";

function parseXml(xml, translationXml) {
    var i;
    var xmlDoc = xml.responseXML;
    let translationXmlDoc = translationXml.responseXML;
    var x = xmlDoc.getElementsByTagName("sura");

    chapters = [];

    // Start to fetch the data by using TagName
    for (i = 0; i < x.length; i++) {
        if(x[i].getAttribute('index')) {
            let rows = x[i].getElementsByTagName("aya");
            let trRows = translationXmlDoc.getElementsByTagName("sura")[i].getElementsByTagName("aya");

            const verses = [];

            for(let j = 0; j < rows.length; j++) {

                if(rows[j].hasAttribute('bismillah')) {
                    verses.push({
                        'bismi': {
                            'text': chapters[0][0].text,
                            'translation': chapters[0][0].translation
                        }
                    });
                }

                verses.push({
                    'chapter': (i+1).toString(),
                    'index': rows[j].getAttribute('index'),
                    'text': rows[j].getAttribute('text'),
                    'translation': trRows[j].getAttribute('text')
                });
            }

            chapters.push(verses);
        }
    }
}

let instance;
let chapters = [];

class Chapter {
    constructor() {
        if(instance) throw new Error("New instance cannot be created!!");

        Promise.all([readXmlAsync('resources/quran-uthmani.xml')
        , readXmlAsync('resources/bn-bengali.xml')])
        .then((values) => {
            parseXml(values[0], values[1]);
        });

        instance = this;
    }

    getChapter(index) {
        return chapters[index];
    }
}

let chapterInstance = Object.freeze(new Chapter());

export default chapterInstance;