const showMapBtn = document.getElementById("showMapBtn");
const mapContainer = document.getElementById("mapContainer");
const backBtn = document.getElementById("backBtn");

let map; // Leaflet-Kartenvariable

// Button klick → Karte anzeigen
showMapBtn.addEventListener("click", () => {
    document.body.scrollTop = 0; // Scroll nach oben
    document.documentElement.scrollTop = 0;

    mapContainer.style.display = "block";
    showMapBtn.style.display = "none";

    // Leaflet-Karte initialisieren, falls noch nicht geschehen
    if (!map) {
        map = L.map('map').setView([20, 0], 2); // Mitte der Welt

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Beispielmarker
        const marker = L.marker([51.505, -0.09]).addTo(map);
        marker.bindPopup("<b>Hallo!</b><br>Das ist ein Marker.").openPopup();
    }
});

// Zurück-Button → Startseite
backBtn.addEventListener("click", () => {
    mapContainer.style.display = "none";
    showMapBtn.style.display = "inline-block";
});