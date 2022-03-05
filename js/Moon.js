class Moon extends Planet {
    constructor(moonconfig) {
        super(moonconfig);
    }

    draw(baseDomElement, displayName) {
        let orbitDomElement = this.orbit.initOrbit(baseDomElement);
        this.setAnimation(orbitDomElement, this.direction, null);
        if (displayName) {
            this.domElement.appendChild(this.getPlanetNameElement());
        }
        orbitDomElement.appendChild(this.domElement);
    }
}
