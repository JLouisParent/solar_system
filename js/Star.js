class Star {
    constructor(starconfig = null) {
        if (starconfig) {
            this.name = starconfig.name;
            this.size = starconfig.size;
        } else {
            this.name = "Star";
            this.size = this.getRandom(100, 400);
        }
    }

    draw(baseDomElement) {
        let starDomElement = document.createElement("div");
        starDomElement.classList.add("star");
        starDomElement.id = this.name;
        starDomElement.setAttribute("size", this.size);
        starDomElement.style.width = this.size + "px";
        starDomElement.style.height = this.size + "px";
        baseDomElement.appendChild(starDomElement);
    }

    static getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getCss() {
        return {
            width: this.size,
            height: this.size,
        };
    }
}
