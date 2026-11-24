// Diese Tests prüfen nur die öffentlichen Operationen von MitgliederService.
// Sie gelten unabhängig davon, wie Sie Mitgliedschaften intern speichern.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GruppenService } from '../src/gruppen-service.ts'
import { MitgliederService } from '../src/mitglieder-service.ts'
import { Tabelle } from '../src/tabelle.ts'
import type { Gruppe, Studierende } from '../src/model.ts'
import { anna, ben, annaId, benId, unbekannteGruppeId, unbekanntePersonId } from './testdaten.ts'

function aufbauen() {
  const gruppenTabelle = new Tabelle<Gruppe>()
  const gruppen = new GruppenService(gruppenTabelle)
  const mitglieder = new MitgliederService(gruppenTabelle, new Tabelle([anna, ben]))
  const gruppe = gruppen.anlegen('Algorithmenrunde', '')
  return { gruppen, mitglieder, gruppe }
}

function namen(liste: Studierende[]): string[] {
  return liste.map(s => s.name).sort()
}

test('eine neue Gruppe hat keine Mitglieder', () => {
  const { mitglieder, gruppe } = aufbauen()
  assert.deepEqual(mitglieder.anzeigen(gruppe.id), [])
})

test('nach dem Beitritt erscheint die Person in der Mitgliederliste', () => {
  const { mitglieder, gruppe } = aufbauen()
  mitglieder.beitreten(annaId, gruppe.id)
  mitglieder.beitreten(benId, gruppe.id)
  assert.deepEqual(namen(mitglieder.anzeigen(gruppe.id)), ['Anna', 'Ben'])
})

test('ein erneuter Beitritt erzeugt keine doppelte Mitgliedschaft', () => {
  const { mitglieder, gruppe } = aufbauen()
  mitglieder.beitreten(annaId, gruppe.id)
  mitglieder.beitreten(annaId, gruppe.id)
  assert.deepEqual(namen(mitglieder.anzeigen(gruppe.id)), ['Anna'])
})

test('nach dem Verlassen ist die Person kein Mitglied mehr', () => {
  const { mitglieder, gruppe } = aufbauen()
  mitglieder.beitreten(annaId, gruppe.id)
  mitglieder.beitreten(benId, gruppe.id)
  mitglieder.verlassen(annaId, gruppe.id)
  assert.deepEqual(namen(mitglieder.anzeigen(gruppe.id)), ['Ben'])
})

test('verlassen ohne Mitgliedschaft ändert nichts', () => {
  const { mitglieder, gruppe } = aufbauen()
  mitglieder.verlassen(annaId, gruppe.id)
  assert.deepEqual(mitglieder.anzeigen(gruppe.id), [])
})

test('Mitgliedschaften gelten nur für ihre eigene Gruppe', () => {
  const { gruppen, mitglieder, gruppe } = aufbauen()
  const andere = gruppen.anlegen('Datenbanken', '')
  mitglieder.beitreten(annaId, gruppe.id)
  assert.deepEqual(mitglieder.anzeigen(andere.id), [])
})

test('unbekannte Gruppen und Personen werden abgewiesen', () => {
  const { mitglieder, gruppe } = aufbauen()
  assert.throws(() => mitglieder.beitreten(annaId, unbekannteGruppeId), /nicht gefunden/)
  assert.throws(() => mitglieder.beitreten(unbekanntePersonId, gruppe.id), /nicht gefunden/)
  assert.throws(() => mitglieder.anzeigen(unbekannteGruppeId), /nicht gefunden/)
})
