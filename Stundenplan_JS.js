const passwort = "Sose25";
const eingabe = prompt("Bitte Passwort eingeben:");
if (eingabe !== passwort) {
    document.body.innerHTML = "<h1>Zugriff verweigert</h1>";
} else {
    // Tooltip-Container erstellen
    const tooltipContainer = document.createElement("div");
    tooltipContainer.className = "tooltip";
    tooltipContainer.style.display = "none";
    document.body.appendChild(tooltipContainer);

    fetch('Termine.json')
        .then(response => response.json())
        .then(data => {
            const table = document.querySelector("table");
            // Daten in die Tabelle einfügen
            data.termine.forEach(termin => {
                const row = document.createElement("tr");
                // Uhrzeit hinzufügen
                const timeCell = document.createElement("td");
                timeCell.textContent = termin.uhrzeit;
                row.appendChild(timeCell);
                // Montag bis Freitag hinzufügen
                ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
                    const cell = document.createElement("td");
                    const entry = termin[day];
                    if (entry === "---") {
                        cell.textContent = "---";
                    } else if (entry.type === "Multiple") {
                        // Mehrere Termine in einer Zelle
                        cell.classList.add("multiple-events");

                        // Container für mehrere Ereignisse
                        const eventsContainer = document.createElement("div");
                        eventsContainer.className = "events-container";

                        // Jeden Termin zum Container hinzufügen
                        entry.events.forEach((event, index) => {
                            const eventDiv = document.createElement("div");
                            eventDiv.className = `event ${event.type}`;

                            eventDiv.innerHTML = `
                <div class="event-title"><span class="highlight">${event.title}</span></div>
                <div class="event-details">
                    <div>${event.dozent}</div>
                    <div>${event.raum}</div>
                    <div><span class="highlight">${event.wochen}</span></div>
                </div>
            `;

                            // Trennlinie zwischen Events (außer beim letzten)
                            if (index < entry.events.length - 1) {
                                const divider = document.createElement("hr");
                                divider.className = "event-divider";
                                eventDiv.appendChild(divider);
                            }

                            // Tooltip-Daten hinzufügen
                            if (event.details || event.datum) {
                                eventDiv.setAttribute("data-tooltip", JSON.stringify({
                                    title: event.title,
                                    dozent: event.dozent,
                                    raum: event.raum,
                                    wochen: event.wochen,
                                    details: event.details || "",
                                    datum: event.datum || "",
                                    beschreibung: event.beschreibung || "",
                                    links: event.links || []
                                }));

                                eventDiv.classList.add("has-tooltip");
                            }

                            eventsContainer.appendChild(eventDiv);
                        });

                        cell.appendChild(eventsContainer);
                    } else {
                        cell.classList.add(entry.type);
                        cell.innerHTML = `
                            <div>${entry.dozent}</div>
                            <div><span class="highlight">${entry.title}</span></div>
                            <div>${entry.raum}</div>
                            <div><span class="highlight">${entry.wochen}</span></div>
                        `;

                        // Detaillierte Informationen für den Tooltip vorbereiten
                        if (entry.datum) {
                            cell.setAttribute("data-tooltip", JSON.stringify({
                                title: entry.title,
                                dozent: entry.dozent,
                                raum: entry.raum,
                                wochen: entry.wochen,
                                datum: entry.datum,
                                beschreibung: entry.beschreibung || "",
                                links: entry.links || []
                            }));

                            // Klasse für Tooltip-fähige Zellen hinzufügen
                            cell.classList.add("has-tooltip");
                        }
                    }
                    row.appendChild(cell);
                });
                table.appendChild(row);
            });

            // Event-Listener für Tooltips hinzufügen
            setupTooltips();
        })
        .catch(error => {
            console.error("Fehler beim Laden der JSON-Datei:", error);
            document.body.innerHTML = "<h1>Fehler beim Laden der Daten</h1>";
        });
}

// Funktion zum Einrichten der Tooltips
function setupTooltips() {
    const tooltipContainer = document.querySelector(".tooltip");
    const tooltipElements = document.querySelectorAll(".has-tooltip");
    const nestedTooltipElements = document.querySelectorAll(".event.has-tooltip");

    // const allTooltipElements = [...tooltipElements, ...nestedTooltipElements];

    // Für Desktop (Hover)
    tooltipElements.forEach(element => {
        element.addEventListener("mouseenter", showTooltip);
        element.addEventListener("mouseleave", hideTooltip);
    });

    // Für Touch-Geräte
    tooltipElements.forEach(element => {
        element.addEventListener("touchstart", handleTouch);
    });

    // Schließen-Button für Touch-Geräte
    document.addEventListener("touchstart", function (event) {
        if (!event.target.closest(".has-tooltip") &&
            !event.target.closest(".tooltip")) {
            hideTooltip();
        }
    });

    function handleTouch(event) {
        event.preventDefault();

        // Wenn ein anderer Tooltip bereits geöffnet ist, diesen zuerst schließen
        if (tooltipContainer.style.display === "block") {
            hideTooltip();
            // Wenn dieser Klick den aktuellen Tooltip schließt, nicht sofort einen neuen öffnen
            if (tooltipContainer.dataset.currentCell === this.cellIndex + "-" + this.parentNode.rowIndex) {
                tooltipContainer.dataset.currentCell = "";
                return;
            }
        }

        showTooltip.call(this, event);
        tooltipContainer.dataset.currentCell = this.cellIndex + "-" + this.parentNode.rowIndex;
    }

    function showTooltip(event) {
        if (!this.hasAttribute("data-tooltip")) return;

        const data = JSON.parse(this.getAttribute("data-tooltip"));
        let tooltipContent = `
            <div class="tooltip-header">
                <h3>${data.title}</h3>
                <span class="tooltip-close">×</span>
            </div>
            <div class="tooltip-content">
                <p><strong>Dozent:</strong> ${data.dozent}</p>
                <p><strong>Raum:</strong> ${data.raum}</p>
                <p><strong>Wochen:</strong> ${data.wochen}</p>
        `;

        if (data.datum) {
            tooltipContent += `<p><strong>Datum:</strong> ${data.datum}</p>`;
        }

        if (data.beschreibung) {
            tooltipContent += `<p>${data.beschreibung}</p>`;
        }

        if (data.links && data.links.length > 0) {
            tooltipContent += `<div class="tooltip-links"><strong>Links:</strong><ul>`;
            data.links.forEach(link => {
                tooltipContent += `<li><a href="${link.url}" target="_blank">${link.title}</a></li>`;
            });
            tooltipContent += `</ul></div>`;
        }

        tooltipContent += `</div>`;

        tooltipContainer.innerHTML = tooltipContent;
        tooltipContainer.style.display = "block";

        // Position berechnen
        const rect = this.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        // Prüfen, ob genug Platz über dem Element ist
        const tooltipHeight = tooltipContainer.offsetHeight;
        const spaceAbove = rect.top;
        const spaceBelow = window.innerHeight - rect.bottom;

        if (spaceBelow > tooltipHeight || spaceBelow > spaceAbove) {
            // Unter dem Element anzeigen
            tooltipContainer.style.top = (rect.bottom + scrollTop) + "px";
        } else {
            // Über dem Element anzeigen
            tooltipContainer.style.top = (rect.top + scrollTop - tooltipHeight) + "px";
        }

        // Horizontale Position berechnen
        const tooltipWidth = tooltipContainer.offsetWidth;
        let leftPos = rect.left + scrollLeft + (rect.width / 2) - (tooltipWidth / 2);

        // Sicherstellen, dass der Tooltip nicht über den Bildschirmrand hinausragt
        if (leftPos < 10) leftPos = 10;
        if (leftPos + tooltipWidth > window.innerWidth - 10) {
            leftPos = window.innerWidth - tooltipWidth - 10;
        }

        tooltipContainer.style.left = leftPos + "px";

        // Event-Listener für den Schließen-Button
        const closeButton = tooltipContainer.querySelector(".tooltip-close");
        if (closeButton) {
            closeButton.addEventListener("click", hideTooltip);
        }
    }

    function hideTooltip() {
        tooltipContainer.style.display = "none";
        tooltipContainer.dataset.currentCell = "";
    }
}
