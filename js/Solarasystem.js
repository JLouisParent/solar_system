class SolarSystem {
    constructor(config) {
        this.config = config;

        this.domElement = null;

        this.star = this.generateStar();
        this.planets = this.generatePlanets();
    }

    initialize(element = null) {
        this.domElement = this.getElement(element);

        if (!Array.isArray(this.planets)) {
            this.planets = this.generatePlanets(this.planets);
        }

        this.star = this.getStar();

        console.log(this.planets);

        this.draw(this.domElement);
    }

    draw(element) {
        this.drawStar(element);
        this.drawPlanets(element);
    }

    generateStar() {
        return new Star(this.config.star);
    }

    generatePlanets() {
        console.log(this.config.planets);
        if (Array.isArray(this.config.planets)) {
            var planets = [];
            this.config.planets.forEach((el) => {
                console.log(el);
                planets.push(new Planet(el));
            });
            return planets;
        }

        return this.generateRandomPlanets();
    }

    generateRandomPlanets() {
        var planets = [];
        for (let i = 0; i < this.config.planets; i++) {
            planets[i] = Planet.generateRandomPlanet();
        }
        return planets;
    }

    getElement(element) {
        if (!element) {
            var element = document.createElement("div");
            element.classList.add("solarSystem");
            element.id = "solarSystem";
            document.querySelector("body").appendChild(element);
        }
        return element;
    }

    drawPlanets(element) {
        if (Array.isArray(this.planets)) {
            this.planets.forEach((el) => el.draw(element));
        }
    }

    drawStar(element) {
        this.star.draw(element);
    }

    getStar() {
        if (this.config.star) {
            return new Star(this.config.star);
        }
        return new Star();
    }
}
