import { randomUUID } from 'node:crypto'
import type { Gruppe, GruppenId, Mitgliedschaft, StudiId, Studierende } from './model.ts'
import { Tabelle } from './tabelle.ts'

// Control: verwaltet, wer Mitglied welcher Gruppe ist.
// Die öffentlichen Operationen sind vorgegeben, ihre Signaturen bleiben unverändert.
// Alle Imports, die Sie brauchen, stehen schon oben.
export class MitgliederService {
  private gruppen: Tabelle<Gruppe>

  private studierende: Tabelle<Studierende>

  // TODO: Ein privates Feld mitgliedschaften mit einer neuen Tabelle<Mitgliedschaft> anlegen.
  // Tipp: Tabelle<T> in tabelle.ts bietet speichern, finden, alle und entfernen.

  constructor(gruppen: Tabelle<Gruppe>, studierende: Tabelle<Studierende>) {
    this.gruppen = gruppen
    this.studierende = studierende
  }

  // Studierende treten einer Gruppe bei. Ein erneuter Beitritt ändert nichts.
  beitreten(studiId: StudiId, gruppeId: GruppenId): void {
    // TODO: Prüfen, ob es die Gruppe gibt.
    // Wenn nicht: throw new Error('Gruppe nicht gefunden.')

    // TODO: Prüfen, ob es die Person gibt.
    // Wenn nicht: throw new Error('Person nicht gefunden.')

    // TODO: Prüfen, ob die Person schon Mitglied dieser Gruppe ist.
    // Wenn ja: nichts tun (return).

    // TODO: Eine neue Mitgliedschaft mit id: randomUUID() anlegen und speichern.

    // Diese Zeile löschen, sobald die Methode fertig ist.
    throw new Error('TODO: beitreten implementieren')
  }

  // Studierende verlassen eine Gruppe. Ohne Mitgliedschaft passiert nichts.
  verlassen(studiId: StudiId, gruppeId: GruppenId): void {
    // TODO: Die Mitgliedschaft dieser Person in dieser Gruppe suchen.

    // TODO: Gibt es eine, sie aus der Tabelle entfernen. Gibt es keine, nichts tun.

    // Diese Zeile löschen, sobald die Methode fertig ist.
    throw new Error('TODO: verlassen implementieren')
  }

  // Liefert alle Mitglieder einer Gruppe.
  anzeigen(gruppeId: GruppenId): Studierende[] {
    // TODO: Prüfen, ob es die Gruppe gibt.
    // Wenn nicht: throw new Error('Gruppe nicht gefunden.')

    // TODO: Alle Mitgliedschaften dieser Gruppe heraussuchen.

    // TODO: Zu jeder Mitgliedschaft die Person aus this.studierende holen
    // und die Liste der Personen zurückgeben.

    // Diese Zeile löschen, sobald die Methode fertig ist.
    throw new Error('TODO: anzeigen implementieren')
  }
}
