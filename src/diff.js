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

        this.diffChildren(oldNode.children, newNode.children, index, patches);
    }

    diffChildren(oldChildren, newChildren, index, patches) {

    }
}