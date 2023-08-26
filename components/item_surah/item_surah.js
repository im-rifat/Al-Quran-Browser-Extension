import { renderAsync } from "../../utils/render.js"

class ItemSurah {
    constructor(data) {
        this.data = data
        this.path = '../../components/item_surah/item_surah.html';
    }

    async render() {
        return await renderAsync(this.path, this.data);
    }
}

export default ItemSurah;