function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function createElement(htmlStr) {
    let template = document.createElement('template');

    const result = htmlStr.split(/\r?\n/);
    let normalizeStr = '';

    result.forEach((element, index) => {
        if(!isEmptyOrSpaces(element)) {
            normalizeStr += element.trim();
        }
    });

    template.innerHTML = normalizeStr.trim();

    return template.content.firstChild;
}

function findElement(node, equals) {
    let data = undefined;

    if(!node) return data;

    if(equals(node)) {
        data = node;
    } else {
        for(let i = 0; node.childNodes && i < node.childNodes.length; i++) {
            data = data || findElement(node.childNodes[i], equals);
        }
    }

    return data;
}

export {createElement, findElement};