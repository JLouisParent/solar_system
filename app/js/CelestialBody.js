import Orbit from "./Orbit.js";
export default class CelestialBody {
    constructor(planetJson) {
        this.name      = planetJson.name;
        this.size      = planetJson.size;
        this.distance  = planetJson.distance;
        this.direction = planetJson.orbitDirection;
        this.orbit     = new Orbit(planetJson.distance);
    }

    draw(baseDomElement, displayName, speed, displayOrbit) {
            this.domElement = this.getPlanetDomElement(speed);
        let orbitDomElement = this.orbit.initOrbit(baseDomElement);
        this.setAnimation(orbitDomElement, this.direction, speed);
        if (displayName) {
            this.domElement.appendChild(this.getPlanetNameElement());
        }
        orbitDomElement.appendChild(this.domElement);
        this.orbit.draw(displayOrbit);
    }

    getPlanetDomElement(speed) {
        let domElement = document.createElement("div");
        domElement.classList.add("planet");
        domElement.id = this.name;
        domElement.setAttribute("size", this.size);
        domElement.style.width  = this.size + "px";
        domElement.style.height = this.size + "px";
        domElement.style.left   = -this.size / 2 + "px";

        this.setAnimation(domElement, -this.direction, speed);
        return domElement;
    }

    getPlanetNameElement() {
        let content    = document.createTextNode(this.name);
        let domElement = document.createElement("div");
        domElement.classList.add("planet-name");
        domElement.id = this.name;
        domElement.appendChild(content);

        return domElement;
    }

    setAnimation(element, direction, speed) {
        let time = this.distance / speed;
        let animationName = direction === 1 ? "clockwise" : "counterclockwise";
        element.style.animation = time + "s linear infinite " + animationName;
    }
}
