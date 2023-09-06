import ListViewAdapter from "./list/list_view_adapter.js";
import { createElement, findElement } from "../utils/node_utils.js";

let itemClickedIdentifier = -1;

function createSurahAdapter(surahList, onItemClickListener) {
    return new ListViewAdapter(() => {
        return surahList.length;
    }, (position) => {
        const template = `
        <tr data-id="" data-position = "0" class="surah_item">
            <td>
                <div class="col m-0">
                    <p class="m-0">$index. $tname</p>
                </div>
            </td>
        </tr>`;

        return createElement(template);
    }, (target, position) => {
        //node.firstChild.parentElement.setAttribute('data-id', surahList[position].index);
        //node.firstChild.parentElement.setAttribute('data-position', position);

        target.setAttribute('data-id', surahList[position].index);
        target.setAttribute('data-position', position);

        if(itemClickedIdentifier != surahList[position].index) {
            if(target.classList.contains('table-active')) target.classList.remove('table-active');
        } else {
            if(!target.classList.contains('table-active')) target.classList.add('table-active');
        }

        const foundElement = findElement(target, (node) => {
            return node && node.nodeName == 'P';
        });

        if(foundElement) {
            foundElement.textContent = `${surahList[position].index}. ${surahList[position].tname}`;
        }
    }, (target, siblings) => {
        for (let i = 0; i < siblings.length; i++) {
            if(siblings[i].classList.contains('table-active')) siblings[i].classList.remove('table-active');
        }

        target.classList.add('table-active');
        if(target.hasAttribute('data-id')) {
            itemClickedIdentifier = target.getAttribute('data-id');
        }

        if(onItemClickListener) onItemClickListener(surahList[target.getAttribute('data-position')]);
    })
}

export default createSurahAdapter;