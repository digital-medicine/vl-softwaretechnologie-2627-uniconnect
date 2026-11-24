import { randomUUID } from 'node:crypto'
import type { Gruppe, GruppenId } from './model.ts'
import type { Tabelle } from './tabelle.ts'

// Control: legt Gruppen an, zeigt sie an und löscht sie.
export class GruppenService {
  private gruppen: Tabelle<Gruppe>

  constructor(gruppen: Tabelle<Gruppe>) {
    this.gruppen = gruppen
  }

  anlegen(name: string, beschreibung: string): Gruppe {
    const gruppe: Gruppe = {
      id: randomUUID(),
      name: this.pflichttext(name, 'Gruppenname'),
      beschreibung: beschreibung.trim(),
    }
    this.gruppen.speichern(gruppe)
    return gruppe
  }

  anzeigen(gruppeId: GruppenId): Gruppe {
    const gruppe = this.gruppen.finden(gruppeId)
    if (!gruppe) throw new Error('Gruppe nicht gefunden.')
    return gruppe
  }

  loeschen(gruppeId: GruppenId): void {
    if (!this.gruppen.entfernen(gruppeId)) {
      throw new Error('Gruppe nicht gefunden.')
    }
  }

  private pflichttext(wert: string, feld: string): string {
    if (!wert.trim()) throw new Error(`${feld} darf nicht leer sein.`)
    return wert.trim()
  }
}
