export default class Orbit {
    constructor(size, direction) {
        this.size = size;
        this.wrapperElement = this.createElement("orbit-wrapper");
        this.element = this.createElement("orbit");
        this.direction = direction;
    }

    draw() {
        this.baseElement.appendChild(this.wrapperElement);
        this.wrapperElement.appendChild(this.element);
    }

    initOrbit(element) {
        this.baseElement = element;
        this.draw();
        return this.element;
    }

    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    createElement(cssClass) {
        let orbitDomElement = document.createElement("div");
        orbitDomElement.classList.add(cssClass);
        orbitDomElement.setAttribute("size", this.size);
        orbitDomElement.style.width = this.size + "px";
        orbitDomElement.style.height = this.size + "px";
        return orbitDomElement;
    }
}
