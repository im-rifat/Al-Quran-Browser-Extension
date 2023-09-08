function loadQuranUthmaniXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      // Request finished and response
      // is ready and Status is "OK"
      if (this.readyState == 4 && this.status == 200) {
        loadTranslationXml(this);
      }
    };

    // employee.xml is the external xml file
    xmlhttp.open("GET", "resources/quran-uthmani.xml", true);
    xmlhttp.send();
}

function loadTranslationXml(arabicXml) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      // Request finished and response
      // is ready and Status is "OK"
      if (this.readyState == 4 && this.status == 200) {
        quranUthmaniDetails(arabicXml, this);
      }
    };

    // employee.xml is the external xml file
    xmlhttp.open("GET", "resources/bn-bengali.xml", true);
    xmlhttp.send();
}

function quranUthmaniDetails(xml, translationXml) {
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

        loadQuranUthmaniXMLDoc();

        instance = this;
    }

    getChapter(index) {
        return chapters[index];
    }
}

let chapterInstance = Object.freeze(new Chapter());

export default chapterInstance;