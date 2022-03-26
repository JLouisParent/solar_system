export default class Star {
    constructor(starJson = null) {
        this.name = starJson.name || "Star";
        this.size = starJson.size || _.random(100, 400);
    }

    draw(systemDomElement) {
        let starDomElement = document.createElement("div");
        starDomElement.classList.add("star");
        starDomElement.id = this.name;
        starDomElement.setAttribute("size", this.size);
        starDomElement.style.width = this.size + "px";
        starDomElement.style.height = this.size + "px";
        systemDomElement.appendChild(starDomElement);
    }
}
