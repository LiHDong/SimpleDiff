class Patch {
    static REPLACE = 0;
    static REORDER = 1;
    static PROPS = 2;
    static TEXT = 3;

    patch(node, patches) {
        const walker = { index: 0};
        this.dfsWalk(node, walker, patches);
    }

    dfsWalk(node, walker, patches) {
        const currentPatch = patches[walker.index];

        if(node.childNodes) {
            node.childNodes.forEach(item => {
                walker.index++;
                this.dfsWalk(item, walker, patches);
            });
        }

        if(currentPatch) {
            this.applyPatches(node, currentPatch)
        }
    }

    applyPatches(node, patches) {
        patches.forEach(item => {
            switch (item.type) {
                case Patch.REPLACE:
                    node.parentNode.replaceChild((typeof item.node === "string") ?
                        document.createTextNode(item.node) :
                        item.node.render(), node
                    );
                    break;
                case Patch.REORDER:
                    this.reorderChildren(node, item.moves);
                    break;
                case Patch.PROPS:
                    this.setProps(node, item.props);
                    break;
                case Patch.TEXT:
                    if(node.textContent) {
                        node.textContent = item.content;
                    } else {
                        node.nodeValue = item.content;
                    }
                    break;
                default:
                    throw new Error("Unknown patch type:" + item.type)
            }
        })
    }

    reorderChildren(node, moves) {
        const staticNodeList = node.childNodes ? Array.from(node.childNodes) : [];
        const maps = {};

        staticNodeList.forEach(child => {
            if(child.nodeType === 1) {
                const key = child.getAttribute("key");
                if(key) {
                    maps[key] = child;
                }
            }
        });

        moves.forEach(move => {
            const index = move.index;
            if(move.type === 0) {
                // 类型是删除，并且该节点还未移除
                if(staticNodeList[index] === node.childNodes[index]) {
                    node.removeChild(node.childNodes[index]);
                }
                staticNodeList.splice(index, 1);
            } else if (move.type === 1) {
                // 插入
                const insertNode = maps[move.item.key] ?
                    map[move.item.key].cloneNode(true) :
                    (typeof move.item === "object") ?
                        move.item.render() :
                        document.createTextNode(move.item);
                staticNodeList.splice(index, 0, insertNode);
                node.insertBefore(insertNode, node.childNodes[index] || null)
            }
        })
    }

    setProps(node, props) {
        Object.keys(props).forEach(key => {
            if(props[key] === void 0) {
                node.removeAttribute(key);
            } else {
                node.setAttribute(key, props[key]);
            }
        })
    }
}

export default Patch;