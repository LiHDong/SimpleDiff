import Element from "../src/element"
import Diff from "../src/diff"

const tree1 = new Element('div', {'id': 'container'}, [
    new Element('h1', {style: 'color: blue'}, ['simple virtual dom']),
    new Element('p', ['Hello, virtual-dom']),
    new Element('ul', [new Element('li', ["old Tree"])])
]);

document.body.appendChild(tree1.render());

const tree2 = new Element('div', {'id': 'container'}, [
    new Element('h1', {style: 'color: red'}, ['simple virtal dom']),
    new Element('p', ['Hello, virtual-dom']),
    new Element('ul', [new Element('li'), new Element('li')])
]);

const diff = new Diff();
diff.diff(tree1, tree2);
