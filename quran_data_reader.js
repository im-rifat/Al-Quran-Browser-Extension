import { loadQuranUthmaniXMLDoc } from "./quran_uthmani_reader.js";
import searchView from "./components/search_view.js";
import ListView from "./components/list/list_view.js";
import createSurahAdapter from "./components/surah_adapter.js";
import createVerseNumberAdapter from "./components/verse_number_adapter.js";

const verseNumberListView = new ListView(
    document.getElementById("searchVerseNumber"),
    "verse_number_list"
);

var verseIndices = [];

function searchSurahList(surahList, key) {
    let searchResult = key ? surahList.filter((el) => {
        // search by index or transliteration name
        return el.index.toString().includes(key) || el.tname.toLowerCase().includes(key.toLowerCase());
    }) :  surahList;

    return searchResult;
}

function onSurahItemClicked(surah) {
    loadVerseNumberList(surah['ayas']);
    loadQuranUthmaniXMLDoc(surah['index']);
}

function onVerseNumberItemClicked(index) {
    console.log(index);
}

function loadVerseNumberList(numberOfVerse) {
    verseIndices = [];
    for(let i = 0; i < numberOfVerse; i++) verseIndices.push(i+1);

    verseNumberListView.setAdapter(
        createVerseNumberAdapter(
        verseIndices
        , onVerseNumberItemClicked)
    );

    //document.getElementById("verse_number_list").innerHTML = new ListVerseNumber(numberOfVerse).render();
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

    document.getElementById("searchVerseNumber").prepend(
        searchView("search_versse", "Verse", (search) => {
            console.log(search);
        })
    )

    let searchResult = searchSurahList(surahList, '');

    const listView = new ListView(document.getElementById("searchSurah"), "search_surah_list");
    listView.setAdapter(createSurahAdapter(searchResult, onSurahItemClicked));

    document.getElementById("searchSurah").prepend(searchView("search_surah", "Search surah", (search) => {
        searchResult = searchSurahList(surahList, search);
        listView.setAdapter(createSurahAdapter(searchResult, onSurahItemClicked));
    }));
}