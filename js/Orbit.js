class Orbit {
    constructor(size, planet) {
        this.size = size;
        this.planet = planet;
    }

    draw(baseDomElement) {
        let orbitDomElement = document.createElement("div");

        let orbitWrapperElement = this.createBlankElement(baseDomElement);

        orbitDomElement.classList.add("orbit");
        orbitDomElement.setAttribute("planet", this.planet.name);
        orbitDomElement.setAttribute("size", this.size);
        orbitDomElement.style.width = this.size + "px";
        orbitDomElement.style.height = this.size + "px";

        let time = this.getTime();
        orbitDomElement.style.animation = time + "s linear infinite spin";

        orbitWrapperElement.appendChild(orbitDomElement);

        return orbitDomElement;
    }

    getTime() {
        let max = 1500;

        return this.size / 300 + 1;
    }

    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    createBlankElement(baseDomElement) {
        let orbitDomElement = document.createElement("div");
        orbitDomElement.classList.add("orbit-wrapper");
        orbitDomElement.setAttribute("size", this.size);
        orbitDomElement.style.width = this.size + "px";
        orbitDomElement.style.height = this.size + "px";
        baseDomElement.appendChild(orbitDomElement);
        return orbitDomElement;
    }
}
