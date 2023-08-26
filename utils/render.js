import { readFileAsync } from "./file_reader.js";

export async function renderAsync(file, data) {
    let template = await readFileAsync(file);

    let pattern = new RegExp("\\${\\w+}", "gmi");

    let result = template.replace(pattern, match => {
        let extractKey = match.match(new RegExp("\\w+", "gmi"));
        return data[extractKey];
    });

    return result;
}