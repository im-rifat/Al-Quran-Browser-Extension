import ListAdapter from "./list/list_adapter.js";
import { createElement } from "../utils/node_utils.js";

function createBismiViewHolder() {
    const bismillah = `<div class='m-0'>
            <p dir='rtl' class='text-center m-0 text-right arabic_text'></p>
            <p class='text-center m-0 bangla_text'></p></div>`;

    return createElement(bismillah);
}

function bindBismiViewHolder(target, bismi) {
    target.firstChild.textContent = bismi['text'];
    target.firstChild.nextSibling.textContent = bismi['translation'];
}

function createVerseViewHolder() {
    const verse = `<div class='m-0'>
    <div dir="rtl" class='m-0 text-right arabic_text'><img src="/resources/bullet.svg" width="20px" height="20px" style="margin-left:20px"><p></p></div>
            <p class='m-0 bangla_text'></p></div>`;

    return createElement(verse);
}

function bindVerseViewHolder(target, verse) {
    target.firstChild.firstChild.nextSibling.replaceWith(verse['text']);
    target.firstChild.nextSibling.textContent = verse['translation'];
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