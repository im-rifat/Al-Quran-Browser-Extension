import ListAdapter from "./list/list_adapter.js";
import { createElement } from "../utils/node_utils.js";

function createBismiViewHolder() {
    const bismillah = `<div class='block'>
            <p dir='rtl' class='has-text-centered arabic_text'></p>
            <p class='has-text-centered bangla_text'></p></div>`;

    return createElement(bismillah);
}

function bindBismiViewHolder(target, bismi) {
    target.firstChild.textContent = bismi['text'];
    target.firstChild.nextSibling.textContent = bismi['translation'];
}

function createVerseViewHolder() {
    const verse = `<div class='block'>
    <span class="tag is-primary is-light is-medium is-rounded">1:1</span>
    <div dir="rtl" class='has-text-right arabic_text'><p></p> <img src="/resources/bullet.svg" width="20px" height="20px" style="margin-right:20px"></div>
            <p class='has-text-left bangla_text'></p></div>`;

    return createElement(verse);
}

function bindVerseViewHolder(target, verse) {
    //console.log(verse);
    target.firstChild.textContent = verse['chapter'] + ':' + verse['index'];
    target.firstChild.nextSibling.firstChild.replaceWith(verse['text']);
    target.firstChild.nextSibling.nextSibling.textContent = verse['translation'];
}

function createVerseAdapter(onItemClickListener) {
    const listAdapter = new ListAdapter();

    listAdapter.create = (position) => {
        const verseList = listAdapter.list;

        const verse = verseList[position];

        if(verse['bismi']) return createBismiViewHolder();
        else return createVerseViewHolder()

    };

    listAdapter.bind = (target, position) => {
        const verseList = listAdapter.list;

        const verse = verseList[position];

        if(verse['bismi']) bindBismiViewHolder(target, verse['bismi']);
        else bindVerseViewHolder(target, verse);
    };

    return listAdapter;
}

export default createVerseAdapter;