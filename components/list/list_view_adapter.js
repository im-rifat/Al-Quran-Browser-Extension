class ListViewAdapter {

    #totalElement;
    #createViewHolderElement;
    #bindViewHolderElement;
    #onItemClicked;
    
    constructor(totalElement, createViewHolderElement, bindViewHolderElement, onItemClicked) {
        this.#totalElement = totalElement;
        this.#createViewHolderElement = createViewHolderElement;
        this.#bindViewHolderElement = bindViewHolderElement;
        this.#onItemClicked = onItemClicked;
    }

    getItemCount() {
        return this.#totalElement == undefined ? 0 : this.#totalElement();
    }

    createViewHolder(position) {
        return this.#createViewHolderElement == undefined ? undefined : this.#createViewHolderElement(position);
    }

    bindViewHolder(vh, position) {
        if(this.#bindViewHolderElement) this.#bindViewHolderElement(vh, position);
    }

    onItemClicked(target, siblings) {
        if(this.#onItemClicked) this.#onItemClicked(target, siblings);
    }
}

export default ListViewAdapter;