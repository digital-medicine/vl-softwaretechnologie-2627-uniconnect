# UniConnect: Gruppen-Subsystem

[![Open in EduIDE](https://eduide.github.io/Docs/img/open-in-eduide.svg)](https://bonn.eduide.aet.cit.tum.de/?appDef=javascript-standalone&gitUri=https%3A%2F%2Fgithub.com%2Fdigital-medicine%2Fvl-softwaretechnologie-2627-uniconnect&title=Object+Design)

Übungsprojekt zur Gastvorlesung „Object Design II“ in Softwaretechnologie, Universität Bonn. Das Projekt setzt das Gruppen-Subsystem von UniConnect in TypeScript um. Gruppen lassen sich bereits anlegen, anzeigen und löschen. Mitgliedschaften fehlen noch: Niemand kann einer Gruppe beitreten.

## In EduIDE starten

1. [bonn.eduide.aet.cit.tum.de](https://bonn.eduide.aet.cit.tum.de/) öffnen und anmelden. Auf Ihrem Zettel steht nur der Benutzername, zum Beispiel `user`. Melden Sie sich mit `user@eduide.org` und dem Passwort vom Zettel an.
2. Oben auf „Open in EduIDE“ klicken. EduIDE öffnet das Projekt direkt.
3. Im Terminal `npm test` ausführen.

## Ausführen

Voraussetzung ist Node.js 22.18 oder neuer (bei Version 23 ab 23.6). Node.js führt TypeScript-Dateien dann direkt aus.

```sh
npm test
npm start
```

`npm test` führt die Tests aus, `npm start` ein kleines Beispielprogramm (`src/main.ts`). Beides läuft ohne Installation.

Zu Beginn sind 5 Tests grün und 7 rot, und `npm start` bricht mit „TODO: beitreten implementieren“ ab. Ziel von E1: Alle Tests sind grün, und `npm start` zeigt die Mitglieder der Beispielgruppe. Für die Typprüfung installieren Sie einmalig die Entwicklungswerkzeuge:

```sh
npm install
npm run typecheck
```

In EduIDE und VS Code stehen dieselben Befehle als Tasks bereit (`.vscode/tasks.json`): Menü „Terminal“, dann „Run Task…“, zum Beispiel „Tests ausführen“ oder „Programm starten“.

## Aufbau

| Datei | Inhalt |
|---|---|
| `src/model.ts` | Entities `Gruppe`, `Studierende` und die noch leere `Mitgliedschaft`, ID-Typen |
| `src/gruppen-service.ts` | Control `GruppenService`: Gruppen anlegen, anzeigen, löschen (fertig) |
| `src/mitglieder-service.ts` | Control `MitgliederService`: beitreten, verlassen, Mitglieder anzeigen (offen) |
| `src/tabelle.ts` | Einfacher Speicher im Arbeitsspeicher |
| `src/index.ts` | Öffentliche Schnittstelle des Subsystems |
| `src/main.ts` | Kleines Beispielprogramm für `npm start` |
| `test/` | Tests für beide Services, gemeinsame Testdaten mit festen UUIDs in `test/testdaten.ts` |

## E1: Mitgliedschaften umsetzen

**INDIVIDUELLE AUFGABE** im persönlichen Repository.

**Lernziel:** Sie können ein Klassenmodell in TypeScript umsetzen und Ihre Umsetzung mit vorgegebenen Tests prüfen.

In der Vorlesung haben wir zwei Varianten für Mitgliedschaften verglichen: eine Liste der Mitglieder in `Gruppe` oder eine eigene Entity `Mitgliedschaft`, die eine Gruppe mit einer Person verbindet. Wir setzen die Variante mit der eigenen Entity `Mitgliedschaft` um.

1. Ergänzen Sie die Entity `Mitgliedschaft` in `src/model.ts`. Sie verweist über IDs auf eine Gruppe und eine Person.
2. Implementieren Sie in `src/mitglieder-service.ts` zuerst `beitreten` und `anzeigen`, danach `verlassen`. Speichern Sie die Mitgliedschaften in einer eigenen `Tabelle`. Die Signaturen der drei Operationen bleiben unverändert. Der fertige `GruppenService` zeigt, wie Speicher und Fehler verwendet werden.
3. Führen Sie `npm test` aus, bis alle Tests grün sind. Mit `npm start` probieren Sie Ihr Ergebnis aus.

Jede Stelle, an der Sie etwas ergänzen, ist im Code mit `// TODO:` und dem Auftrag markiert.

**Tipp:** `Tabelle<T>` in `src/tabelle.ts` bietet schon `speichern`, `finden`, `alle` und `entfernen`. Schauen Sie dort hinein, bevor Sie selbst etwas bauen.

**Ergebnis:** Ihre Änderungen an `src/model.ts` und `src/mitglieder-service.ts`, alle Tests grün.

## Syntaxhilfe TypeScript

| Schreibweise | Bedeutung |
|---|---|
| `interface Gruppe { id: GruppenId }` | Datentyp mit Feldern |
| `type GruppenId = string` | Neuer Name für einen vorhandenen Typ |
| `Studierende \| undefined` | Entweder ein Wert vom Typ `Studierende` oder `undefined` |
| `{ ...gruppe, name: 'Neu' }` | Kopie von `gruppe` mit geändertem Feld |
| `liste.filter(x => ...)`, `.map(...)`, `.find(...)`, `.includes(...)` | Liste filtern, umwandeln, ein Element suchen, Enthaltensein prüfen |
| `private x = new Tabelle<T>()` | Privates Feld, das beim Erzeugen des Objekts angelegt wird |
| `throw new Error('Gruppe nicht gefunden.')` | Fehler melden und die Methode abbrechen |
