// Kleines Programm zum Ausprobieren: npm start
// Es legt eine Gruppe an, lässt zwei Personen beitreten und eine wieder austreten.
import { GruppenService } from './gruppen-service.ts'
import { MitgliederService } from './mitglieder-service.ts'
import { Tabelle } from './tabelle.ts'
import type { Gruppe, Studierende } from './model.ts'

// Feste UUIDs für die beiden Beispielpersonen.
const annaId = '11111111-1111-4111-8111-111111111111'
const benId = '22222222-2222-4222-8222-222222222222'

const gruppenTabelle = new Tabelle<Gruppe>()
const studierende = new Tabelle<Studierende>([
  { id: annaId, name: 'Anna', matrikelnummer: '3012345' },
  { id: benId, name: 'Ben', matrikelnummer: '3012346' },
])
const gruppen = new GruppenService(gruppenTabelle)
const mitglieder = new MitgliederService(gruppenTabelle, studierende)

const namen = (liste: Studierende[]) => liste.map(s => s.name).join(', ') || '(keine)'

try {
  const gruppe = gruppen.anlegen('Algorithmenrunde', 'Gemeinsam für die Klausur lernen')
  console.log(`Gruppe angelegt: ${gruppe.name}`)

  mitglieder.beitreten(annaId, gruppe.id)
  mitglieder.beitreten(benId, gruppe.id)
  console.log(`Mitglieder: ${namen(mitglieder.anzeigen(gruppe.id))}`)

  mitglieder.verlassen(benId, gruppe.id)
  console.log(`Nach dem Austritt von Ben: ${namen(mitglieder.anzeigen(gruppe.id))}`)
} catch (fehler) {
  // Solange E1 offen ist, endet das Programm hier mit der TODO-Meldung.
  console.error(`Abbruch: ${fehler instanceof Error ? fehler.message : String(fehler)}`)
  process.exitCode = 1
}
