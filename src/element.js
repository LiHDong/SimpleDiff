/**
 * To use js object yield dom tree
 * @param {String} tagName
 * @param {Object} props
 * @param {Array<Element|String>} children
 * */

class Element {

    constructor(tagName, props, children) {
        this.tagName = tagName;
        // 考虑到不输入props的情况，进行相应的判断
        if(Array.isArray(props)) {
            children = props;
            props = {};
        }
        // 初始化key
        this.key = props
            ? props.key
            : void 0;
        this.props = props || {};
        this.children = children || [];
        /**
         * 初始化count
         * count表征的是子节点的数目
         * 如：仅含文本节点的节点count为1，含Element节点则为Σ(Element.count + 1) + 文本节点个数
         * */
        let count = 0;
        this.children.forEach((child, i) => {
            if(child instanceof Element) {
                count += child.count;
            } else {
                this.children[i] = '' + child;
            }
            count++;
        });
        this.count = count;
    }

    render() {
        const ele = document.createElement(this.tagName);
        // set the property of tag element
        Object.getOwnPropertyNames(this.props).forEach(key => {
            ele.setAttribute(key, this.props[key]);
        });

        this.children.forEach(child => {
            const node = (child instanceof Element) ? child.render() : document.createTextNode(child);
            ele.appendChild(node);
        });

        return ele;
    }
}

export default Element;