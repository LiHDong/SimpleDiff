import Element from "../src/element"

const ul = new Element('ul', {id: "list"}, [
    new Element("li", {class: "item"}, ["Item1"]),
    new Element("li", {class: "item"}, ["Item2"]),
    new Element("li", {class: "item"}, ["Item3"]),
]);

document.body.appendChild(ul.render());