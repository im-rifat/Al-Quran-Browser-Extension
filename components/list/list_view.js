import { createElement } from "../../utils/node_utils.js";
import ListAdapter from "./list_adapter.js";

class ListView {

    #adapter;
    #element;

    constructor(parentNode, id) {
        this.#adapter = new ListAdapter();
        this.#element = listView(id);
        parentNode.appendChild(this.#element);
    }

    setAdapter(adapter) {
        this.#adapter = adapter;
        this.#adapter.onDetachListView(this.#element);
        this.#adapter.onAttachListView(this.#element);
    }

    scrollToPosition(position) {
        const childSize = this.#element.childNodes.length;
        let pos = position;
        if(position < 0) pos = 0;
        else {
            pos = position >= childSize ? childSize-1 : position;
        }

        if(this.#element.childNodes[pos]) {

            this.#element.childNodes[pos].scrollIntoView({
                behavior: 'instant',
                block: 'center'
            });
        }
    }
}

function listView(id) {
    const template  = `
        <div id="${id}" class="scrollable-div"></div>`;

    const element = createElement(template);

    return element;
}

export default ListView;