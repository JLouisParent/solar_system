import CelestialBody from "./CelestialBody.js";
import Moon from "./Moon.js";

export default class Planet extends CelestialBody {
    constructor(planetJson) {
        super(planetJson);
        this.moons = planetJson.moons
            ? planetJson.moons.map((moon) => new Moon(moon))
            : null;
    }

    draw(systemDomElement, configGlobalJson) {
        super.draw(
            systemDomElement,
            configGlobalJson.displayName,
            configGlobalJson.speed,
            configGlobalJson.displayOrbit
        );
        if (this.moons) {
            this.moons.forEach((moon) =>
                moon.draw(
                    this.domElement,
                    false,
                    configGlobalJson.speed,
                    configGlobalJson.displayMoonOrbit
                )
            );
        }
    }

    static generateRandomPlanets(nbPlanets, starSize, systemSize) {
        if (nbPlanets) {
            let planets = [];
            for (let i = 0; i < nbPlanets; i++) {
                planets.push(
                    new this({
                        name          : "Planet " + _.random(0, 10),
                        size          : _.random(10, 40),
                        distance      : _.random(starSize, systemSize),
                        moon          : null,
                        orbitDirection: 1,
                    })
                );
            }
            return _.sortBy(planets, ["distance"]);
        }
        return false;
    }
}
