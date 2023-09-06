import {createElement, findElement} from "../utils/node_utils.js";

function searchView(id, placeholder, searchListener) {
    const template = `
        <div class="form-outline">
            <input
              type="search"
              id="${id}"
              class="form-control"
              placeholder="${placeholder}"
              aria-label="Search"
            />
          </div>
            `;

            const content = createElement(template);
            let parsed = findElement(content, (node) => {
                return node && node.id == id;
            });

            if(!parsed) return content;
            
            parsed.oninput = (event) => {
                let key = event.target.value;

                if(key) key = key.trim();

                searchListener(key);
            }

            return content;
};

export default searchView;