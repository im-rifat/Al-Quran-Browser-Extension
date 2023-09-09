import { createElement } from "../../utils/node_utils.js";
import ListAdapter from "./list_adapter.js";

class ListView {

    #adapter;
    #element;

    constructor(parentNode, id) {
        this.#adapter = new ListAdapter();
        this.#element = listView(id);
        /*this.#element.onclick = (event) => {
            let target = event.target;

            while(target.parentElement != undefined && target.parentElement.nodeName != 'TABLE') {
                target = target.parentElement;
            }

            this.#adapter.onItemClicked(target, [].filter.call(this.#element.childNodes, (ele) => {
                return target != ele;
            }));
        }*/
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

        this.#element.childNodes[pos].scrollIntoView({
            behavior: 'instant',
            block: 'center'
        });
    }
}

function listView(id) {
    const template  = `
        <div id="${id}" class="scrollable-div"></div>`;

    const element = createElement(template);

    return element;
}

export default ListView;