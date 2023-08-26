import ItemSurah from "../item_surah/item_surah.js";

class ListSurah {
    constructor(datas) {
        this.datas = datas;
    }

    async render() {
        var listView = ``;
    
        for (let i = 0; i < this.datas.length; i++) {
            let item = new ItemSurah(this.datas[i]);
            listView += await item.render();
        }

        return listView;
    }
}

export default ListSurah;