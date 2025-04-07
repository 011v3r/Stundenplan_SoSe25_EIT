const passwort = "sose25";
const eingabe = prompt("Bitte Passwort eingeben:");
if (eingabe !== passwort) {
    document.body.innerHTML = "<h1>Zugriff verweigert</h1>";
} else {
    // Direkt eingebettete JSON-Daten
    const termine = {
        "termine": [
            {
                "uhrzeit": "8:30-10:00",
                "monday": "---",
                "tuesday": {
                    "type": "Vorlesung",
                    "dozent": "Shun-Ping Chen",
                    "title": "V: Digitaltechnik",
                    "raum": "C10/07.01 048.2079",
                    "wochen": "x/y-Woche"
                },
                "wednesday":  {
                    "type": "Labor",
                    "dozent": "Felix Lenders",
                    "title": "Ü: Mathematik 1 ",
                    "raum": "C10/04.02  048.1011",
                    "wochen": "x/y-Woche"
                },
                "thursday": {
                    "type": "Vorlesung",
                    "dozent": "Felix Lenders",
                    "title": "V: Mathematik 1",
                    "raum": "C10/04.02 048.1019",
                    "wochen": "x/y-Woche"
                },
                "friday": {
                    "type": "Vorlesung",
                    "dozent": "Felix Lenders",
                    "title": "V: Mathematik 1",
                    "raum": "C10/04.02 048.1019",
                    "wochen": "x/y-Woche"
                }
            },
            {
                "uhrzeit": "10:15-11:45",
                "monday": {
                    "type": "Labor",
                    "dozent": "Karl-Heinz Lammer, Thomas Schumann",
                    "title": "L: Digitaltechnik",
                    "raum": "D11/1.62 048.2071",
                    "wochen": "y-Woche"
                },
                "tuesday": {
                    "type": "Vorlesung",
                    "dozent": "Shun-Ping Chen",
                    "title": "V: Digitaltechnik",
                    "raum": "C10/07.01 048.2079",
                    "wochen": "x/y-Woche"
                },
                "wednesday": {
                    "type": "Vorlesung",
                    "dozent": "Torsten-Karl Strempel",
                    "title": "V: Physik 1",
                    "raum": "C10/04.02 048.2029",
                    "wochen": "x/y-Woche"
                },
                "thursday": {
                    "type": "Labor",
                    "dozent": "Torsten-Karl Strempel",
                    "title": "Ü: Physik 1",
                    "raum": "C10/04.03 048.2021",
                    "wochen": "x/y-Woche"
                },
                "friday": {
                    "type": "Vorlesung",
                    "dozent": "Felix Lenders",
                    "title": "V: Mathematik 1",
                    "raum": "C10/04.02 048.1019",
                    "wochen": "x/y-Woche"
                }
            },
			{
                "uhrzeit": "12:00-13:30",
                "monday": "---",
                "tuesday": {
                    "type": "Vorlesung",
                    "dozent": "Catia Real Ehrlich",
                    "title": "V: Einführung in die Programmierung",
                    "raum": "C10/03.01 048.1049",
                    "wochen": "x/y-Woche"
                },
                "wednesday": "---",
                "thursday": {
                    "type": "Labor",
                    "dozent": "Felix Lenders",
                    "title": "Ü: Mathematik 1 ",
                    "raum": "C10/04.02  048.1011",
                    "wochen": "x/y-Woche"
                },
                "friday": "---",
            },
			{
                "uhrzeit": "14:15-15:45",
                "monday": {
                    "type": "Vorlesung",
                    "dozent": "Benedikt Schmitz",
                    "title": "V: Grundlagen der Elektrotechnik 1",
                    "raum": "C10/08.03 048.2139",
                    "wochen": "x/y-Woche"
                },
                "tuesday": {
                    "type": "Zusatz",
                    "dozent": "Julia Gahler",
                    "title": "Z: ET-Fit: Elektrotechnik",
                    "raum": "C10/08.03 ET-Fit/1",
                    "wochen": "x/y-Woche"
                },
                "wednesday": {
                    "type": "Vorlesung",
                    "dozent": "Benedikt Schmitz",
                    "title": "V: Grundlagen der Elektrotechnik 1",
                    "raum": "C10/08.03 048.2139",
                    "wochen": "x/y-Woche"
                },
                "thursday": {
                    "type": "Labor",
                    "dozent": "Fettah Marankoz",
                    "title": "Ü: Grundlagen der Elektrotechnik 1 ",
                    "raum": "C10/06.03  048.2131",
                    "wochen": "x/y-Woche"
                },
                "friday": "---",
            },
			{
                "uhrzeit": "16:00-17:30",
                "monday": "---",
                "tuesday": {
                    "type": "Zusatz",
                    "dozent": "Thomas Betz",
                    "title": "Z: An Ingenieurlösungen lernen",
                    "raum": "C10/08.03",
                    "wochen": "x/y-Woche"
                },
                "wednesday": {
                    "type": "Vorlesung",
                    "dozent": "Benedikt Schmitz",
                    "title": "V: Grundlagen der Elektrotechnik 1",
                    "raum": "C10/08.03 048.2139",
                    "wochen": "x/y-Woche"
                },
                "thursday": {
                    "type": "Labor",
                    "dozent": "Fettah Marankoz",
                    "title": "Ü: Grundlagen der Elektrotechnik 1 ",
                    "raum": "C10/06.03  048.2131",
                    "wochen": "x/y-Woche"
                },
                "friday": "---",
            },
			{
                "uhrzeit": "17:45-19:15",
                "monday": "---",
                "tuesday": "---",
                "wednesday": "---",
                "thursday": "---",
                "friday": "---",
            }
            // Weitere Termine hinzufügen...
        ]
    };

    const table = document.querySelector("table");

    // Alle Termine einfügen
    termine.termine.forEach(termin => {
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
            } else {
                cell.classList.add(entry.type);
                cell.innerHTML = `
                    <div>${entry.dozent}</div>
                    <div><span class="highlight">${entry.title}</span></div>
                    <div>${entry.raum}</div>
                    <div><span class="highlight">${entry.wochen}</span></div>
                `;
            }

            row.appendChild(cell);
        });

        table.appendChild(row);
    });
}
