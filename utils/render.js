import { readFileAsync } from "./file_reader.js";

export function renderAsync(file, data) {
    let template = readFileAsync(file);

    let pattern = new RegExp("\\${\\w+}", "gmi");

    console.log(template);

    let result = template.replace(pattern, match => {
        let extractKey = match.match(new RegExp("\\w+", "gmi"));
        return data[extractKey];
    });

    return result;
}