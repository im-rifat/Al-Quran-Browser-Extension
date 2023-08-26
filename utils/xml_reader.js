export async function readXmlAsync(xmlFile) {
    return new Promise((resolve, reject) => {
        if(xmlFile) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
            // Request finished and response
            // is ready and Status is "OK"
            console.log(this.readyState + " " + this.status);
            if (this.readyState == 4 && this.status == 200) {
                resolve(this);
            } else {
              //  reject(`Could not read ${xmlFile}`);
            }
        }

        xmlhttp.open("GET", xmlFile, true);
        xmlhttp.send();
        } else {
            reject("No xml file selected");
        }
    });
}