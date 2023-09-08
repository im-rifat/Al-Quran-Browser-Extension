import searchView from "./components/search_view.js";
import ListView from "./components/list/list_view.js";
import createSurahAdapter from "./components/surah_adapter.js";
import createVerseNumberAdapter from "./components/verse_number_adapter.js";
import createVerseAdapter from "./components/verse_adapter.js";
import chapterInstance from "./chapter.js";

const surahListAdapter = createSurahAdapter(onSurahItemClicked);
const numberListAdapter = createVerseNumberAdapter(onVerseNumberItemClicked);
const chapterListAdapter = createVerseAdapter(null);

const verseNumberListView = new ListView(
    document.getElementById("searchVerseNumber"),
    "verse_number_list"
);
verseNumberListView.setAdapter(numberListAdapter);
let verseIndices = [];

const verseListView = new ListView(
    document.getElementById("surahVerse"),
    "surah_verse"
);
verseListView.setAdapter(chapterListAdapter);

function searchSurahList(surahList, key) {
    let searchResult = key ? surahList.filter((el) => {
        // search by index or transliteration name
        return el.index.toString().includes(key) || el.tname.toLowerCase().includes(key.toLowerCase());
    }) :  surahList;

    return searchResult;
}

function searchVerseNumberList(numberList, key) {
    let searchResult = key ? numberList.filter((el) => {
        // search by index or transliteration name
        const tos = el.toString();

        return tos.toString().includes(key);
    }) :  numberList;

    return searchResult;
}

function onSurahItemClicked(surah) {
    loadVerseNumberList(surah['ayas']);
    chapterListAdapter.submitList(chapterInstance.getChapter(surah['index']-1));
}

function onVerseNumberItemClicked(index) {
    console.log(index);
    verseListView.scrollToPosition(index);
}

function loadVerseNumberList(numberOfVerse) {
    verseIndices = [];
    for(let i = 0; i < numberOfVerse; i++) verseIndices.push(i+1);

    numberListAdapter.submitList(verseIndices);

    verseNumberListView.scrollToPosition(0);
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

            numberListAdapter.submitList(searchVerseNumberList(verseIndices, search));
        })
    )

    let searchResult = searchSurahList(surahList, '');

    const listView = new ListView(document.getElementById("searchSurah"), "search_surah_list");
    listView.setAdapter(surahListAdapter);
    surahListAdapter.submitList(searchResult);

    document.getElementById("searchSurah").prepend(searchView("search_surah", "Search surah", (search) => {
        searchResult = searchSurahList(surahList, search);
        surahListAdapter.submitList(searchResult);
    }));
}