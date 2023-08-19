function loadQuranUthmaniXMLDoc(id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      // Request finished and response
      // is ready and Status is "OK"
      if (this.readyState == 4 && this.status == 200) {
        loadTranslationXml(this, id);
      }
    };

    // employee.xml is the external xml file
    xmlhttp.open("GET", "resources/quran-uthmani.xml", true);
    xmlhttp.send();
}

function loadTranslationXml(arabicXml, id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      // Request finished and response
      // is ready and Status is "OK"
      if (this.readyState == 4 && this.status == 200) {
        quranUthmaniDetails(arabicXml, this, id);
      }
    };

    // employee.xml is the external xml file
    xmlhttp.open("GET", "resources/bn-bengali.xml", true);
    xmlhttp.send();
}

function getItemViewForVerses(text, verseId, bismi, translation) {
    let bismillah = `
    <tr class='bismillah'><td>
        <div class='m-0'>
        <p dir='rtl' class='text-center m-0 text-right' style="font-family: customfont; font-size:31px">${bismi}</p>
        <p class='text-center m-0' style="font-size:17px">${"শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।"}</p>
        </div>
    </td></tr>

`;
    let verse = `
    <tr class='verse_item'><td>
        <div class='m-0'>
        <p dir='rtl' class='m-0 text-right' style="font-family: customfont; font-size:31px">${text} .${verseId}</p>
        <p class='m-0' style="font-size:17px">${translation}</p>
        </div>
    </td></tr>

`;

if(bismi) return bismillah + verse;
    return verse;
}

function quranUthmaniDetails(xml, translationXml, id) {
    var i;
    var xmlDoc = xml.responseXML;
    let translationXmlDoc = translationXml.responseXML;
    var listView = ``;
    var x = xmlDoc.getElementsByTagName("sura");

    // Start to fetch the data by using TagName
    for (i = 0; i < x.length; i++) {
        if(x[i].getAttribute('index') == id) {
            let rows = x[i].getElementsByTagName("aya");
            let trRows = translationXmlDoc.getElementsByTagName("sura")[i].getElementsByTagName("aya");
            for(let j = 0; j < rows.length; j++) {
                listView += getItemViewForVerses(rows[j].getAttribute('text'), rows[j].getAttribute('index')
                , rows[j].getAttribute('bismillah')
                , trRows[j].getAttribute('text'));
            }
        }
    }

    // Print the xml data in table form
    document.getElementById("surah_verses").innerHTML = listView;

    document.getElementById("surah_verses").scrollIntoView(true);
}