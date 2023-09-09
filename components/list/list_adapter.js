import { deepEqual } from "../../utils/object_utils.js";

function trimTarget(target) {
    return target;
}

class ListAdapter {

    create;
    bind;
    #element;
    #currentList;

    constructor(create, bind) {
        this.create = create;
        this.bind = bind;

        this.#currentList = [];
        this.list = [];
    }

    submitList(newList) {
        this.list = (newList == null || newList == undefined) ? [] : newList;
        this.#newListUpdated();
    }

    onAttachListView(lisView) {
        this.#element = lisView;
    }

    onDetachListView(listView) {
        let childElement = listView.firstChild;

        while(childElement) {
            listView.removeChild(childElement);
            childElement = listView.firstChild;
        }

        this.#element = undefined;
    }

    #createViewHolder(position) {
        return this.create(position);
    }

    #bindViewHolder(target, position) {
        this.bind(target, position);
    }

    notifyDatasetChanged() {
        this.#newListUpdated();
    }

    #isContentSame(item1, item2) {
        return deepEqual(item1, item2);
    }

    #newListUpdated() {
        if(this.#element == null || this.#element == undefined) return;

        const currentListSize = this.#currentList.length;
        const newListSize = this.list.length;

        if(currentListSize == newListSize) {
            for(let i = 0; i < currentListSize; i++) {
                if(this.#isContentSame(this.#currentList[i]
                    , this.list[i])) {
                        // bindview
                        this.#bindViewHolder(trimTarget(this.#element.childNodes[i]), i);
                } else {
                    // create -> bind -> replace with
                    const node = this.#createViewHolder(i);
                    this.#bindViewHolder(node, i);
                    this.#element.childNodes[i].replaceWith(node);
                }
            }
        } else {
            // will add or remove

            const shouldBeAdded = newListSize > currentListSize;

            if(shouldBeAdded) {
                let i = 0;

                for(; i < currentListSize; i++) {
                    if(this.#isContentSame(this.#currentList[i]
                        , this.list[i])) {
                            // just bind
                            this.#bindViewHolder(trimTarget(this.#element.childNodes[i]), i);
                        } else {
                            // create -> bind -> replace with
                            const node = this.#createViewHolder(i);
                            this.#bindViewHolder(node, i);
                            this.#element.childNodes[i].replaceWith(node);
                        }
                }

                for(; i < newListSize; i++) {
                    // create -> bind -> append
                    const node = this.#createViewHolder(i);
                    this.#bindViewHolder(node, i);
                    this.#element.append(node);
                }
            } else {
                let i = 0;

                for(; i < newListSize; i++) {
                    if(this.#isContentSame(this.#currentList[i]
                        , this.list[i])) {
                            // just bind
                            this.#bindViewHolder(trimTarget(this.#element.childNodes[i]), i);
                        } else {
                            // create -> bind -> replace with
                            const node = this.#createViewHolder(i);
                            this.#bindViewHolder(node, i);
                            this.#element.childNodes[i].replaceWith(node);
                        }
                }

                let childElement = this.#element.lastChild;
                for(; i < currentListSize; i++) {
                    // remove 
                    this.#element.removeChild(childElement);
                    childElement = this.#element.lastChild;
                }
            }
        }

        this.#currentList = this.list;
    }
}

export default ListAdapter;