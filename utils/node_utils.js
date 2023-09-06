function createElement(htmlStr) {
    let template = document.createElement('template');
    template.innerHTML = htmlStr.trim();
    //console.log(template.content.childNodes);

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