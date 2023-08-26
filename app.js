import { readXmlAsync } from "./utils/xml_reader.js";
import { quranDataDetails } from "./quran_data_reader.js";

document.addEventListener('DOMContentLoaded', function () {
    readXmlAsync('resources/quran-data.xml').then(data => {
        quranDataDetails(data);
    }).catch().finally();
});