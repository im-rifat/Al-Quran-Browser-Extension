import { createElement } from "../../utils/node_utils.js";
import ListViewAdapter from "./list_view_adapter.js";

function trimTarget(target) {
    return target;
}

class ListView {

    #adapter;
    #element;

    constructor(parentNode, id) {
        this.#adapter = new ListViewAdapter();
        this.#element = listView(id);
        this.#element.onclick = (event) => {
            let target = event.target;

            while(target.parentElement != undefined && target.parentElement.nodeName != 'TABLE') {
                target = target.parentElement;
            }

            this.#adapter.onItemClicked(target, [].filter.call(this.#element.childNodes, (ele) => {
                return target != ele;
            }));
        }
        parentNode.appendChild(this.#element);
    }

    setAdapter(adapter) {
        this.#adapter = adapter;
        this.#notifyDataSetChanged();
    }

    #notifyDataSetChanged() {
        let length = this.#element.childNodes.length;
        const dataSetLen = this.#adapter.getItemCount();

        const shouldBeAdded = dataSetLen > length;
        const shouldBeRemoved = dataSetLen < length;
        const nothingChanged = length == dataSetLen;

        if(nothingChanged) {
            for(let j = 0; j < length; j++) {
                this.#adapter.bindViewHolder(trimTarget(this.#element.childNodes[j]), j);
            }

            return;
        }

        if(shouldBeAdded) {
            let j = 0;

            for(; j < length; j++) {
                this.#adapter.bindViewHolder(trimTarget(this.#element.childNodes[j]), j);
            }

            for(; j < dataSetLen; j++) {
                const childElement = this.#adapter.createViewHolder(j);
                this.#element.appendChild(childElement);

                this.#adapter.bindViewHolder(childElement, j);
            }

            return;
        }

        // should be removed task perform here
        let j = 0;

        for(; j < dataSetLen; j++) {
            this.#adapter.bindViewHolder(trimTarget(this.#element.childNodes[j]), j);
        }

        let childElement = this.#element.lastChild;
        for(; j < length; j++) {
            this.#element.removeChild(childElement);
            childElement = this.#element.lastChild;
        }
    }
}

function listView(id) {
    const template  = `
        <table
            id="${id}"
            class="table table-borderless table-hover"
          ></table>
    `;

    const element = createElement(template);

    return element;
}

export default ListView;