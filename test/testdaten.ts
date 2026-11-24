// Gemeinsame Testdaten für alle Tests.
// Feste UUIDs im selben Format, das die Services mit randomUUID() erzeugen.
// An der Ziffernfolge erkennt man in einer Fehlermeldung sofort, wer gemeint ist.
import type { Studierende } from '../src/model.ts'

export const annaId = '11111111-1111-4111-8111-111111111111'
export const benId = '22222222-2222-4222-8222-222222222222'
export const unbekannteGruppeId = '99999999-9999-4999-8999-999999999999'
export const unbekanntePersonId = '88888888-8888-4888-8888-888888888888'

export const anna: Studierende = { id: annaId, name: 'Anna', matrikelnummer: '3012345' }
export const ben: Studierende = { id: benId, name: 'Ben', matrikelnummer: '3012346' }
