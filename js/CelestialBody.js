import Orbit from "./Orbit.js";

export default class CelestialBody {
    constructor(planetconfig) {
        this.name = planetconfig.name;
        this.size = planetconfig.size;
        this.distance = planetconfig.distance;
        this.direction = planetconfig.orbitDirection;
        this.orbit = new Orbit(planetconfig.distance);
        this.domElement = this.getPlanetDomElement();
    }

    draw(baseDomElement, displayName) {
        let orbitDomElement = this.orbit.initOrbit(baseDomElement);
        this.setAnimation(orbitDomElement, this.direction, 100);
        if (displayName) {
            this.domElement.appendChild(this.getPlanetNameElement());
        }
        if (this.moons) {
            this.moons.forEach((el) => el.draw(this.domElement, displayName));
        }
        orbitDomElement.appendChild(this.domElement);
    }

    getPlanetDomElement() {
        let domElement = document.createElement("div");
        domElement.classList.add("planet");
        domElement.id = this.name;
        domElement.setAttribute("size", this.size);
        domElement.style.width = this.size + "px";
        domElement.style.height = this.size + "px";
        domElement.style.left = -this.size / 2 + "px";

        this.setAnimation(domElement, -this.direction, 100);
        return domElement;
    }

    getPlanetNameElement() {
        let content = document.createTextNode(this.name);
        let domElement = document.createElement("div");
        domElement.classList.add("planet-name");
        domElement.id = this.name;
        domElement.appendChild(content);

        return domElement;
    }

    static getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static generateRandomPlanets(nbPlanets, starSize, systemSize) {
        let planets = [];
        for (let i = 0; i < nbPlanets; i++) {
            planets.push(
                new this({
                    name: "Planet " + this.getRandom(0, 10),
                    size: this.getRandom(10, 40),
                    distance: this.getRandom(starSize, systemSize),
                    moon: null,
                })
            );
        }
        return planets;
    }

    setAnimation(element, direction, speed) {
        let time = this.distance / speed;
        let animationName = direction === 1 ? "clockwise" : "counterclockwise";
        element.style.animation = time + "s linear infinite " + animationName;
    }
}