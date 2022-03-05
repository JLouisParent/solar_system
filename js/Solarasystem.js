class SolarSystem {
    constructor(element, configFile) {
        this.config = this.getConfig(configFile);
        if (this.config) {
            this.displayName = this.config.displayNames;
            this.drawElement = this.getElement(element);
            this.star = this.generateStar();
            this.planets = this.generatePlanets();
        }
    }

    draw() {
        if (this.config && this.drawElement) {
            this.drawStar();
            this.drawPlanets();
        }
    }

    generateStar() {
        return new Star(this.config.star ?? null);
    }

    generatePlanets() {
        if (!Array.isArray(this.config.planets)) {
            return Planet.generateRandomPlanets(
                this.config.planets,
                this.star.size,
                this.config.size
            );
        } else {
            let planets = [];
            this.config.planets.forEach((el) => {
                planets.push(new Planet(el));
            });
            return planets;
        }
    }

    getElement(element = null) {
        let el = document.querySelector(element);
        if (!el) {
            el = document.createElement("div");
            el.id = element ?? "solarSystem";
        }
        return this.drawElement(el);
    }

    drawElement(el) {
        el.classList.add("solarSystem");
        el.style.width = this.config.size + "px";
        el.style.height = this.config.size + "px";
        document.querySelector("body").prepend(el);
        return el;
    }

    drawPlanets() {
        this.planets.forEach((el) =>
            el.draw(this.drawElement, this.displayName)
        );
    }

    drawStar() {
        this.star.draw(this.drawElement);
    }

    getConfig(configFile = null) {
        let file = configFile || "config/config.json";
        try {
            var request = new XMLHttpRequest();
            request.open("GET", file, false);
            request.send(null);
            var config = JSON.parse(request.responseText);
            config = this.initializeConfig(config);
            return config;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    initializeConfig(config) {
        let mandatoryElements = ["planets", "star"];
        mandatoryElements.forEach((el) => {
            if (!config.hasOwnProperty(el)) {
                throw new Error(`Missing config field : ${el}`);
            }
        });
        return config;
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
