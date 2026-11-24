// Einfacher Speicher im Arbeitsspeicher. Beim Beenden des Programms sind alle Daten weg.

export class Tabelle<T extends { id: string }> {
  private eintraege = new Map<string, T>()

  constructor(anfangswerte: T[] = []) {
    for (const eintrag of anfangswerte) this.speichern(eintrag)
  }

  // Legt einen Eintrag an oder ersetzt den Eintrag mit derselben id.
  speichern(eintrag: T): void {
    this.eintraege.set(eintrag.id, eintrag)
  }

  finden(id: string): T | undefined {
    return this.eintraege.get(id)
  }

  alle(): T[] {
    return [...this.eintraege.values()]
  }

  entfernen(id: string): boolean {
    return this.eintraege.delete(id)
  }
}
