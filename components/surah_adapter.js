import ListAdapter from "./list/list_adapter.js";
import { createElement } from "../utils/node_utils.js";

let itemClickedIdentifier = -1;

function createSurahAdapter(onItemClickListener) {

    const listAdapter = new ListAdapter();

    listAdapter.create = (position) => {
        const template = `<div class="col m-0">
                    <p class="m-0">$index. $tname</p></div>`;

        return createElement(template);
    };

    listAdapter.bind = (target, position) => {
        //node.firstChild.parentElement.setAttribute('data-id', surahList[position].index);
        //node.firstChild.parentElement.setAttribute('data-position', position);

        target.firstChild.textContent = `${listAdapter.list[position].index}. ${listAdapter.list[position].tname}`;

        target.setAttribute('data-id', listAdapter.list[position].index);
        target.setAttribute('data-position', position);

        if(itemClickedIdentifier != listAdapter.list[position].index) {
            if(target.classList.contains('table-active')) target.classList.remove('table-active');
        } else {
            if(!target.classList.contains('table-active')) target.classList.add('table-active');
        }

        target.onclick = (event) => {
            itemClickedIdentifier = target.getAttribute('data-id');

            listAdapter.notifyDatasetChanged();

            if(onItemClickListener) onItemClickListener(listAdapter.list[target.getAttribute('data-position')]);
        }
    };

    return listAdapter;
}

export default createSurahAdapter;