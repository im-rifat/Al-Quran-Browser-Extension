import { readXmlAsync } from "./utils/xml_reader.js";
import { main } from "./entry.js";

document.addEventListener('DOMContentLoaded', function () {
    readXmlAsync('resources/quran-data.xml').then(data => {
        main(data);
    }).catch().finally();
});