class SolarSystem {
    constructor() {
        this.config = SolarSystem.getConfig();
        this.star = this.generateStar();
        this.planets = this.generatePlanets();
    }

    draw(element) {
        this.drawElement = this.getElement(element);
        this.setElement();
        if (!this.config.size) {
            this.convertDistance();
        }
        this.drawStar();
        this.drawPlanets();
    }

    generateStar() {
        return new Star(this.config.star ?? null);
    }

    generatePlanets() {
        if (!Array.isArray(this.config.planets)) {
            return this.generateRandomPlanets();
        }
        this.config.planets.forEach((el) => {
            planets.push(new Planet(el));
        });
        return planets;
    }

    generateRandomPlanets() {
        let planets = [];
        for (let i = 0; i < this.config.planets; i++) {
            planets.push(
                Planet.generateRandomPlanet(this.star.size, this.config.size)
            );
        }
        return planets;
    }

    getElement(element = null) {
        if (!element || !element.isString()) {
            return this.createElement();
        } else {
            return document.querySelector(element);
        }
    }

    createElement() {
        var element = document.createElement("div");
        element.classList.add("solarSystem");
        element.id = this.config.name ?? "solarSystem";
        document.querySelector("body").prepend(element);
        return element;
    }

    setElement() {
        this.drawElement.style.width = this.config.size + "px";
        this.drawElement.style.height = this.config.size + "px";
    }

    drawPlanets() {
        if (Array.isArray(this.planets)) {
            this.planets.forEach((el) => el.draw(this.drawElement));
        }
    }

    drawStar() {
        this.star.draw(this.drawElement);
    }

    static getConfig() {
        let configFile = "config/config.json";
        try {
            var request = new XMLHttpRequest();
            request.open("GET", configFile, false);
            request.send(null);
            var config = JSON.parse(request.responseText);

            return config;
        } catch (error) {
            console.error(error.message);
        }
    }

    convertDistance() {
        let maxDistance = this.getMaxDistance();
        this.planets.forEach((el) => {
            el.distance =
                this.config.size *
                (el.distance / (maxDistance + this.star.size));
        });
    }

    getMaxDistance() {
        let distance = 0;
        this.planets.forEach((el) => {
            distance = el.distance >= distance ? el.distance : distance;
        });
        return distance;
    }
}
