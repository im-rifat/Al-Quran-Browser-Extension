class ItemSurah {
    constructor(data) {
        this.data = data;
    }

    render() {
        const template = `
        <tr data-id="$index" class="surah_item">
            <td>
                <div class="col m-0">
                    <p class="m-0">$index. $tname</p>
                </div>
            </td>
        </tr>`;

        let pattern = new RegExp("\\$\\w+", "gmi");

        let result = template.replace(pattern, match => {
            let extractKey = match.match(new RegExp("\\w+", "gmi"));
            return this.data[extractKey];
        });

        return result
    }
}

export default ItemSurah;