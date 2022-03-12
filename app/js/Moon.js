import CelestialBody from "./CelestialBody";

export default class Moon extends CelestialBody {
    constructor(moonconfig) {
        super(moonconfig);
    }

    draw(baseDomElement, displayName) {
        let orbitDomElement = this.orbit.initOrbit(baseDomElement);
        this.setAnimation(orbitDomElement, this.direction, 100);

        orbitDomElement.appendChild(this.domElement);
    }
}
