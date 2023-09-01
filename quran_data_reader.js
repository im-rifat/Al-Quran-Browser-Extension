import { loadQuranUthmaniXMLDoc } from "./quran_uthmani_reader.js";
import ListSurah from "./components/list_surah/list_surah.js";

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

function updateSurahListDom(surahList, key) {
    let searchResult = key ? surahList.filter((el) => {
        // search by index or transliteration name
        return el.index.toString().includes(key) || el.tname.toLowerCase().includes(key.toLowerCase());
    }) :  surahList;

    document.getElementById("table_surah_list").innerHTML = new ListSurah(searchResult).render();
}

export function quranDataDetails(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("sura");

    const surahList = [];

    for (i = 0; i < x.length; i++) {
        let obj = {};
        for(let j = 0; j < x[i].attributes.length; j++) {
            obj[x[i].attributes.item(j).name] = x[i].attributes.item(j).value;
        }

        surahList.push(obj);
    }

    updateSurahListDom(surahList, "");
    document.getElementById("table_surah_list").onclick = onItemViewClicked;

    document.getElementById("search_surah").oninput = (event) => {
        let key = event.target.value;

        if(key) key = key.trim();

        updateSurahListDom(surahList, key)
    };
}