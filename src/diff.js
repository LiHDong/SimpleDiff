class Diff {

    diff(oldTree, newTree) {
        const patches = {};  //记录节点差异
        this.dfsWalk(oldTree, newTree, 0, patches);
        return patches;
    }

    // 对两棵树进行深度优先遍历
    dfsWalk(oldNode, newNode, index, patches) {
        // TODO 比较两棵树的不同，并记录下来
        patches[index] = {};
        if(oldNode.children && newNode.children) {
            this.diffChildren(oldNode.children, newNode.children, index, patches);
        }
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
            console.log(currentNodeIndex, leftNode);
            currentNodeIndex = (leftNode && leftNode.count) ?
                currentNodeIndex + leftNode.count + 1 :
                currentNodeIndex + 1;
            this.dfsWalk(child, newChild, currentNodeIndex, patches);
            leftNode = child;
        })
    }
}

export default Diff;