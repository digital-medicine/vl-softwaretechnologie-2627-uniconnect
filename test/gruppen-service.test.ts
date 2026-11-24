import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GruppenService } from '../src/gruppen-service.ts'
import { Tabelle } from '../src/tabelle.ts'
import type { Gruppe } from '../src/model.ts'
import { unbekannteGruppeId } from './testdaten.ts'

function neuerService(): GruppenService {
  return new GruppenService(new Tabelle<Gruppe>())
}

test('anlegen liefert eine Gruppe, die sich anzeigen lässt', () => {
  const service = neuerService()
  const gruppe = service.anlegen(' Algorithmenrunde ', 'Gemeinsam lernen')
  assert.equal(gruppe.name, 'Algorithmenrunde')
  assert.deepEqual(service.anzeigen(gruppe.id), gruppe)
})

test('anlegen ohne Namen wird abgewiesen', () => {
  assert.throws(() => neuerService().anlegen('  ', 'x'), /darf nicht leer sein/)
})

test('jede Gruppe erhält eine eigene id', () => {
  const service = neuerService()
  assert.notEqual(service.anlegen('A', '').id, service.anlegen('A', '').id)
})

test('anzeigen einer unbekannten Gruppe meldet einen Fehler', () => {
  assert.throws(() => neuerService().anzeigen(unbekannteGruppeId), /nicht gefunden/)
})

test('loeschen entfernt die Gruppe', () => {
  const service = neuerService()
  const gruppe = service.anlegen('Mathe', '')
  service.loeschen(gruppe.id)
  assert.throws(() => service.anzeigen(gruppe.id), /nicht gefunden/)
  assert.throws(() => service.loeschen(gruppe.id), /nicht gefunden/)
})
