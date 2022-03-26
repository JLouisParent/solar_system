import Star from "./Star.js";
import Planet from "./Planet.js";

export default class SolarSystem {
    constructor(mainArgument) {
        this.config  = this.initializeConfig(mainArgument);
        this.star    = this.initStar();
        this.planets = this.initPlanets();
    }

    // Load config
    initializeConfig(mainArgument) {
        try {
            let config =
                typeof mainArgument === "object"
                    ? mainArgument
                    : this.loadConfigFile(mainArgument);
            return this.checkMandatoryConfig(config);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    loadConfigFile(configFilePath) {
        try {
            var request = new XMLHttpRequest();
            request.open("GET", configFilePath, false);
            request.send(null);
            return JSON.parse(request.responseText);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    checkMandatoryConfig(configJson) {
        let mandatoryElements = ["planets", "star"];
        mandatoryElements.forEach((mandatoryElement) => {
            if (!configJson.hasOwnProperty(mandatoryElement)) {
                throw new Error(`Missing config field : ${mandatoryElement}`);
            }
        });
        return configJson;
    }

    // Draw
    draw(elementArgument) {
        this.drawElement = this.initElement(elementArgument);
        if (this.config && this.planets && this.star && this.drawElement) {
            this.drawStar();
            this.drawPlanets();
        }
    }

    drawPlanets() {
        this.planets.forEach((planet) =>
            planet.draw(this.drawElement, this.config.global)
        );
    }

    drawStar() {
        this.star.draw(this.drawElement);
    }

    // init

    initElement(elementArgument = null) {
        let drawElement = document.querySelector(elementArgument);
        if (!drawElement) {
            drawElement    = document.createElement("div");
            drawElement.id = elementArgument ?? "solarSystem";
        }
        return this.drawElement(drawElement);
    }

    drawElement(drawElement) {
        drawElement.classList.add("solarSystem");
        drawElement.style.width  = this.config.global.size + "px";
        drawElement.style.height = this.config.global.size + "px";
        document.querySelector("body").prepend(drawElement);
        return drawElement;
    }

    initStar() {
        return new Star(this.config.star);
    }

    initPlanets() {
        return Array.isArray(this.config.planets)
            ? this.config.planets.map((planet) => new Planet(planet))
            : Planet.generateRandomPlanets(
                  this.config.planets,
                  this.star.size,
                  this.config.global.size
              );
    }

    // Helpers

    // convertDistance() {
    //     let maxDistance = this.getMaxDistance();
    //     this.planets.forEach((el) => {
    //         el.distance =
    //             this.config.size *
    //             (el.distance / (maxDistance + this.star.size));
    //     });
    // }

    // getMaxDistance() {
    //     let distance = 0;
    //     this.planets.forEach((el) => {
    //         distance = el.distance >= distance ? el.distance : distance;
    //     });
    //     return distance;
    // }
}
