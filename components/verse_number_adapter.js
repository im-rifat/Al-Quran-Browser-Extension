import ListAdapter from "./list/list_adapter.js";
import { createElement, findElement } from "../utils/node_utils.js";

let itemClickedIdentifier = -1;

function createVerseNumberAdapter(onItemClickListener) {
    const listAdapter = new ListAdapter();

    listAdapter.create = (position) => {
        const template = `
        <tr class="verse_number">
            <td>
                <div class="col m-0">
                    <p class="m-0">$index</p>
                </div>
            </td>
        </tr>`;

        return createElement(template);
    };

    listAdapter.bind = (target, position) => {
        //node.firstChild.parentElement.setAttribute('data-id', surahList[position].index);
        //node.firstChild.parentElement.setAttribute('data-position', position);

        target.setAttribute('data-id', listAdapter.list[position]);
        target.setAttribute('data-position', position);

        if(itemClickedIdentifier != listAdapter.list[position]) {
            if(target.classList.contains('table-active')) target.classList.remove('table-active');
        } else {
            if(!target.classList.contains('table-active')) target.classList.add('table-active');
        }

        const foundElement = findElement(target, (node) => {
            return node && node.nodeName == 'P';
        });

        if(foundElement) {
            foundElement.textContent = `${listAdapter.list[position]}`;
        }
    };

    listAdapter.clickListener = (target, siblings) => {
        const dataList = listAdapter.list;

        for (let i = 0; i < siblings.length; i++) {
            if(siblings[i].classList.contains('table-active')) siblings[i].classList.remove('table-active');
        }

        target.classList.add('table-active');
        if(target.hasAttribute('data-id')) {
            itemClickedIdentifier = target.getAttribute('data-id');
        }

        if(onItemClickListener) onItemClickListener(dataList[target.getAttribute('data-position')]);
    };

    return listAdapter;
}

export default createVerseNumberAdapter;