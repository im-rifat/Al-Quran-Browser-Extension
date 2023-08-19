function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      // Request finished and response
      // is ready and Status is "OK"
      if (this.readyState == 4 && this.status == 200) {
        quranDataDetails(this);
      }
    };

    // employee.xml is the external xml file
    xmlhttp.open("GET", "resources/quran-data.xml", true);
    xmlhttp.send();
}

function onItemViewClicked(event) {
    const clickedRow = event.currentTarget;

    if (clickedRow && !clickedRow.classList.contains('table-active')) {
        const rowId = clickedRow.getAttribute("data-id");

        var rows = document.getElementsByClassName("surah_item");
        for (var i = 0; i < rows.length; i++) {
            if(rows[i].classList.contains('table-active')) rows[i].classList.remove('table-active');
        }
        clickedRow.classList.add('table-active');

        // Add your click handling logic here
        loadQuranUthmaniXMLDoc(rowId);
    }
}

function getItemView(name, transliteration, translation, numOfVerses, id) {
    return `
        <tr data-id=${id} class='surah_item'><td>
            <div class='col m-0'>
                <div class='col m-0'>
                    <p class='m-0'><strong>${transliteration}</strong></p>
                    <p class='m-0'><small>${translation}</small></p>
                </div>
            </div>
            <div class='col m-0'>
                <p class='m-0'>${name}</p>
                <p class='m-0'>${numOfVerses}</p>
            </div>
        </td></tr>

    `;
}

function quranDataDetails(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var listView = ``;
    var x = xmlDoc.getElementsByTagName("sura");

    // Start to fetch the data by using TagName
    for (i = 0; i < x.length; i++) {
        listView += getItemView(x[i].getAttribute('name'), x[i].getAttribute('tname')
        , x[i].getAttribute('ename'), x[i].getAttribute('ayas'), x[i].getAttribute('index'));
    }

    // Print the xml data in table form
     document.getElementById("id").innerHTML = listView;

     var rows = document.getElementsByClassName("surah_item");
     for (var i = 0; i < rows.length; i++) {
        rows[i].onclick = onItemViewClicked;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadXMLDoc();
});