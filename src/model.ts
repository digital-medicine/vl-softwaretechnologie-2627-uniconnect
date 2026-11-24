// Fachliche Typen des Gruppen-Subsystems.
// Die privaten Attribute aus dem Klassenmodell sind hier einfache Felder.
// Andere Subsysteme ändern sie nicht direkt, sondern nur über die Services.

export type GruppenId = string

export type StudiId = string

export interface Gruppe {
  id: GruppenId
  name: string
  beschreibung: string
}

export interface Studierende {
  id: StudiId
  name: string
  matrikelnummer: string
}

// Entity Mitgliedschaft: verbindet eine Gruppe mit einer Person.
export interface Mitgliedschaft {
  // TODO: Ein Feld id für die Mitgliedschaft selbst ergänzen (Typ string).

  // TODO: Über die ID auf die Gruppe verweisen (Typ GruppenId).

  // TODO: Über die ID auf die Person verweisen (Typ StudiId).
}
