import Patch from "./patch"
import listDiff from "../lib/diff"

class Diff {

    diff(oldTree, newTree) {
        const patches = {};  //记录节点差异
        this.dfsWalk(oldTree, newTree, 0, patches);
        return patches;
    }

    // 对两棵树进行深度优先遍历
    dfsWalk(oldNode, newNode, index, patches) {
        const currentPatch = [];
        // 节点被删除
        if(newNode === null) {
            // 重排时节点会被移除，所以此处不进行处理
            // 文本节点替换
        } else if (typeof oldNode === "string" && typeof newNode === "string") {
            if(oldNode !== newNode) {
                currentPatch.push({type: Patch.TEXT, content: newNode})
            }
            // 节点相同，但与原节点的props和children不同
        } else if (
            oldNode.tagName === newNode.tagName &&
            oldNode.key === newNode.key
        ) {
            // diff props
            const patchProps = this.diffProps(oldNode, newNode);
            if(patchProps) {
                currentPatch.push({type: Patch.PROPS, props: patchProps});
            }
            // diff children, 如果节点有ignore属性，则不比较children
            if(!newNode.props || !newNode.props.hasOwnProperty("ignore")) {
                this.diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
            }
            // 节点不同，则直接替换节点
        } else {
            currentPatch.push({type: Patch.REPLACE, node: newNode})
        }
        if(currentPatch.length) {
            patches[index] = currentPatch;
        }
    }

    diffProps(oldNode, newNode) {

    }

    diffChildren(oldChildren, newChildren, index, patches) {
        let leftNode = null;
        let currentNodeIndex = index;
        /**
         * index的计算规则如下：
         * 1.根节点为0
         * 2.对子节点:
         * 2.1. 第一个子节点为父节点索引+1
         * 2.2. 第二个子节点为第一个节点索引+第一个节点count+1
         * 备注：因为count的含义为子节点的数目，故通过这种方法，能将顺序按深度优先遍历来实现
         * */
        oldChildren.forEach((child, i) => {
            const newChild = newChildren[i];

            currentNodeIndex = (leftNode && leftNode.count) ?
                currentNodeIndex + leftNode.count + 1 :
                currentNodeIndex + 1;
            this.dfsWalk(child, newChild, currentNodeIndex, patches);
            leftNode = child;
        })
    }
}

export default Diff;