import { describe, it, expect } from 'vitest'
import { countries } from './countryData'

describe('countryData', () => {
    it('exports a non-empty array of countries', () => {
        expect(countries.length).toBeGreaterThan(0)
    })

    it('each country has required fields', () => {
        for (const country of countries) {
            expect(country.name).toBeTruthy()
            expect(country.flag).toBeTruthy()
            expect(typeof country.lat).toBe('number')
            expect(typeof country.lng).toBe('number')
        }
    })

    it('latitude values are within valid range', () => {
        for (const country of countries) {
            expect(country.lat).toBeGreaterThanOrEqual(-90)
            expect(country.lat).toBeLessThanOrEqual(90)
        }
    })

    it('longitude values are within valid range', () => {
        for (const country of countries) {
            expect(country.lng).toBeGreaterThanOrEqual(-180)
            expect(country.lng).toBeLessThanOrEqual(180)
        }
    })

    it('includes Syria as the first country', () => {
        expect(countries[0].name).toBe('Syria')
        expect(countries[0].flag).toBe('SY')
    })
})
