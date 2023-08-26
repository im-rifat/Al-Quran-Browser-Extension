import { renderAsync } from "./utils/render.js";
import { loadQuranUthmaniXMLDoc } from "./quran_uthmani_reader.js";

function onItemViewClicked(event) {

    let tempTarget = event.target;

    var rows = document.getElementsByClassName("surah_item");
    for (var i = 0; i < rows.length; i++) {
        if(rows[i].classList.contains('table-active')) rows[i].classList.remove('table-active');
    }

    while(tempTarget != null) {
        tempTarget = tempTarget.parentElement;
        if(tempTarget.hasAttribute('data-id')) {

            const rowId = tempTarget.getAttribute('data-id');
            tempTarget.classList.add('table-active');

            loadQuranUthmaniXMLDoc(rowId);
            break;
        }
    }
}

async function getItemView(name, transliteration, translation, numOfVerses, id) {
    return await renderAsync('views/item_surah.html', {
        "name": name,
        "transliteration": transliteration,
        "translation": translation,
        "numOfVerses": numOfVerses,
        "id": id
    });
}

export async function quranDataDetails(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var listView = ``;
    var x = xmlDoc.getElementsByTagName("sura");

    console.log(xml);

    for (i = 0; i < x.length; i++) {
        listView += await getItemView(x[i].getAttribute('name'), x[i].getAttribute('tname')
        , x[i].getAttribute('ename'), x[i].getAttribute('ayas'), x[i].getAttribute('index'));
    }

     document.getElementById("table_surah_list").innerHTML = listView;
     document.getElementById("table_surah_list").onclick = onItemViewClicked;
}