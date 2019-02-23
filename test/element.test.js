import Element from "../src/element"
import Diff from "../src/diff"
import Patch from "../src/patch"

const tree1 = new Element('div', {'id': 'container'}, [
    new Element('h1', {style: 'color: blue'}, ['simple virtual dom']),
    new Element('p', ['Hello, virtual-dom']),
    new Element('ul', [new Element('li', ["old Tree"])])
]);

const root = tree1.render();
document.body.appendChild(root);

const tree2 = new Element('div', {'id': 'container'}, [
    new Element('h1', {style: 'color: red'}, ['simple virtal dom']),
    new Element('p', ['Hello, virtual-dom']),
    new Element('ul', [new Element('li'), new Element('li')])
]);

const diff = new Diff();
const patches = diff.diff(tree1, tree2);
console.log(patches, 555);
const patch = new Patch();
patch.patch(root, patches);