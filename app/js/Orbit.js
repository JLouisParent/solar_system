export default class Orbit {
    constructor(size, direction) {
        this.size            = size;
        this.lineElement     = this.createElement("orbit-line");
        this.orbitDomElement = this.createElement("orbit");
        this.direction       = direction;
    }

    draw(displayOrbit) {
        if (!displayOrbit) this.lineElement.classList.add("transparent");
        this.baseDomElement.appendChild(this.lineElement);
        this.lineElement.appendChild(this.orbitDomElement);
    }

    initOrbit(systemDomElement) {
        this.baseDomElement = systemDomElement;
        return this.orbitDomElement;
    }

    createElement(cssClass) {
        let orbitGenericElement = document.createElement("div");
        orbitGenericElement.classList.add(cssClass);
        orbitGenericElement.setAttribute("size", this.size);
        orbitGenericElement.style.width  = this.size + "px";
        orbitGenericElement.style.height = this.size + "px";
        return orbitGenericElement;
    }
}
