/**
 * To use js object yield dom tree
 * */

class Element {

    constructor(tagName, props, children) {
        this.tagName = tagName;
        this.props = props;
        this.children = children;
    }

    render() {
        const ele = document.createElement(this.tagName);
        // set the property of tag element
        Object.getOwnPropertyNames(this.props).forEach(key => {
            ele.setAttribute(key, this.props[key]);
        });

        const children = this.children || [];
        children.forEach(child => {
            const node = (child instanceof Element) ? child.render() : document.createTextNode(child);
            ele.appendChild(node);
        });

        return ele;
    }
}

export default Element;