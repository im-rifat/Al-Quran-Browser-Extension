import ListAdapter from "./list/list_adapter.js";
import { createElement } from "../utils/node_utils.js";

var itemClickedIdentifier = -1;

function createVerseNumberAdapter(onItemClickListener) {
    itemClickedIdentifier = -1;

    const listAdapter = new ListAdapter();

    listAdapter.create = (position) => {
        const template = `<div class="col m-0">
                    <p class="m-0">$index</p></div>`;

        return createElement(template);
    };

    listAdapter.bind = (target, position) => {
        target.setAttribute('data-id', listAdapter.list[position]);
        target.setAttribute('data-position', position);

        if(itemClickedIdentifier != listAdapter.list[position]) {
            if(target.classList.contains('table-active')) target.classList.remove('table-active');
        } else {
            if(!target.classList.contains('table-active')) target.classList.add('table-active');
        }

        target.firstChild.textContent = `${listAdapter.list[position]}`;

        target.onclick = (event) => {
            itemClickedIdentifier = target.getAttribute('data-id');

            if(onItemClickListener) onItemClickListener(listAdapter.list[target.getAttribute('data-position')]);

            listAdapter.notifyDatasetChanged();
        }
    };

    return listAdapter;
}

export default createVerseNumberAdapter;