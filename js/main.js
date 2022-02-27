const $configFile = "config/config.json";

var request = new XMLHttpRequest();
request.open("GET", $configFile, false);
request.send(null);
var config = JSON.parse(request.responseText);

console.log({ config });

solarSystem = new SolarSystem(config);

solarSystem.initialize();
