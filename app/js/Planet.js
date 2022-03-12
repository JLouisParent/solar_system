import CelestialBody from "./CelestialBody";
import Moon from "./Moon.js";

export default class Planet extends CelestialBody {
    constructor(planetconfig) {
        super(planetconfig);
        if (planetconfig.moons) {
            this.moons = this.setMoons(planetconfig.moons);
        }
    }

    setMoons(moonsconfig) {
        let moons = [];
        moonsconfig.forEach((el) => {
            moons.push(new Moon(el));
        });
        return moons;
    }
}
