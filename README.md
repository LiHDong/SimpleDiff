# SimpleDiff
a simple virtualDom diff, realized with https://www.zhihu.com/question/29504639?sort=created

# Compile
> npm run build

# 虚拟DOM实现步骤
1. 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
2. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
3. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了

# 文件结构
+ src/element.js 由javaScript对象模拟DOM树