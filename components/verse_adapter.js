import ListAdapter from "./list/list_adapter.js";
import { createElement } from "../utils/node_utils.js";

function createBismiViewHolder() {
    const bismillah = `<tr class='bismillah'><td>
            <div class='m-0'>
            <p dir='rtl' class='text-center m-0 text-right' style="font-family: customfont; font-size:31px"></p>
            <p data='translation' class='text-center m-0' style="font-size:17px"></p>
            </div>
        </td></tr>`;

    return createElement(bismillah);
}

function bindBismiViewHolder(target, bismi) {
    target.firstChild.firstChild.firstChild.textContent = bismi['text'];
    target.firstChild.firstChild.firstChild.nextSibling.textContent = bismi['translation'];
}

function createVerseViewHolder() {
    const verse = `<tr class='verse_item'>
        <td>
            <div class='m-0'>
            <p dir='rtl' class='m-0 text-right' style="font-family: customfont; font-size:31px"></p>
            <p data='' class='m-0' style="font-size:17px"></p>
            </div>
        </td></tr>`;

    return createElement(verse);
}

function bindVerseViewHolder(target, verse) {
    target.firstChild.firstChild.firstChild.textContent = verse['text'];
    target.firstChild.firstChild.firstChild.nextSibling.textContent = verse['translation'];
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

    listAdapter.clickListener = null;

    return listAdapter;
}

export default createVerseAdapter;