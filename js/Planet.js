class Planet {
    constructor(planetconfig) {
        this.name = planetconfig.name;
        this.size = planetconfig.size;
        this.distance = planetconfig.distance;
        this.orbit = new Orbit(planetconfig.distance, this);
        this.moon = null;
    }

    draw(baseDomElement) {
        let orbitDomElement = this.orbit.draw(baseDomElement);

        let planetDomElement = document.createElement("div");
        planetDomElement.classList.add("planet");
        planetDomElement.id = this.name;
        planetDomElement.setAttribute("size", this.size);
        planetDomElement.style.width = this.size + "px";
        planetDomElement.style.height = this.size + "px";
        orbitDomElement.appendChild(planetDomElement);
    }

    static getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static generateRandomPlanet() {
        //@todo find an api to generate random name
        let planetEl = {};
        planetEl.name = "Planet " + this.getRandom(0, 10);
        planetEl.size = this.getRandom(10, 40);
        planetEl.distance = this.getRandom(170, 1500);
        return new this(planetEl);
    }

    getCss() {
        return {
            width: this.size,
            height: this.size,
        };
    }
}
