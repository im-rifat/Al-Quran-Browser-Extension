import ListAdapter from "./list/list_adapter.js";
import { createElement } from "../utils/node_utils.js";

var itemClickedIdentifier = -1;

function createVerseNumberAdapter(onItemClickListener) {
    itemClickedIdentifier = -1;

    const listAdapter = new ListAdapter();

    listAdapter.create = (position) => {
        const template = `<div class="container mt-2 p-2">
                    <p>$index</p></div>`;

        return createElement(template);
    };

    listAdapter.bind = (target, position) => {
        target.setAttribute('data-id', listAdapter.list[position]);
        target.setAttribute('data-position', position);

        if(itemClickedIdentifier != listAdapter.list[position]) {
            if(target.classList.contains('has-background-primary-light')) target.classList.remove('has-background-primary-light');
        } else {
            if(!target.classList.contains('has-background-primary-light')) target.classList.add('has-background-primary-light');
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