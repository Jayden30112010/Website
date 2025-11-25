const showMapBtn = document.getElementById("showMapBtn");
const mapContainer = document.getElementById("mapContainer");
const backBtn = document.getElementById("backBtn");

let map; // Leaflet-Kartenvariable

showMapBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    mapContainer.style.display = "block";
    showMapBtn.style.display = "none";

    if (!map) {
        map = L.map('map').setView([51, 10], 5); // Zoom auf Mitteleuropa

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // GeoJSON laden
        fetch('convert.json')
            .then(res => res.json())
            .then(data => {
                L.geoJSON(data, {
                    style: { fillOpacity: 0, color: null },
                    onEachFeature: function(feature, layer) {
                        layer.on('click', function(e) {
                            let info = "";
                            let flagUrl = "";

                            // Popups für bestimmte Länder
                            switch (feature.properties.ADMIN) {
                                case "Germany":
                                    info = "Hauptstadt: Berlin<br>Einwohner: ca. 83 Mio";
                                    flagUrl = "https://flagcdn.com/16x12/de.png";
                                    break;
                                case "France":
                                    info = "Hauptstadt: Paris<br>Einwohner: ca. 67 Mio";
                                    flagUrl = "https://flagcdn.com/16x12/fr.png";
                                    break;
                                case "Belgium":
                                    info = "Hauptstadt: Brüssel<br>Einwohner: ca. 11,5 Mio";
                                    flagUrl = "https://flagcdn.com/16x12/be.png";
                                    break;
                                case "Luxembourg":
                                    info = "Hauptstadt: Luxemburg<br>Einwohner: ca. 0,6 Mio";
                                    flagUrl = "https://flagcdn.com/16x12/lu.png";
                                    break;
                                case "Netherlands":
                                    info = "Hauptstadt: Amsterdam<br>Einwohner: ca. 17,5 Mio";
                                    flagUrl = "https://flagcdn.com/16x12/nl.png";
                                    break;
                                case
                                    "Spain":
                                    info = "Hauptstadt: Madrid<br>Einwohner: ca. 48 Mio";
                                    flagUrl = "https://flagcdn.com/16x12/es.png";
                                    break;
                                case
                                "Portugal":
                                    info = "Hauptstadt: Lissabon<br>Einwohner: ca. 10,7 Mio";
                                    flagUrl = "https://flagcdn.com/16x12/pt.png";
                                    break;
                                case
                                    "Denmark":
                                    info = "Hauptstadt: kopenhagen<br>Einwohner: ca. 5,9 Mio";
                                    flagUrl = "https://flagcdn.com/16x12/dk.png";
                                    break;
                                case
                                    "Andorra":
                                    info = "Hauptstadt: Andorra la Vella<br>Einwohner: ca. 0,81 Mio";
                                    flagUrl = "https://flagcdn.com/16x12/ad.png";
                                    break;
                                default:
                                    info = "Keine Infos verfügbar";
                                    flagUrl = "";
                            }

                            L.popup()
                             .setLatLng(e.latlng)
                             .setContent(`
                                 <div style="text-align:center;">
                                     <b>${feature.properties.ADMIN}</b><br>
                                     ${info}<br>
                                     ${flagUrl ? `<img src="${flagUrl}" width="32" height="24" alt="${feature.properties.ADMIN}">` : ""}
                                 </div>
                             `)
                             .openOn(map);
                        });
                    }
                }).addTo(map);
            });
    }
});

// Zurück-Button → Startseite
backBtn.addEventListener("click", () => {
    mapContainer.style.display = "none";
    showMapBtn.style.display = "inline-block";
});