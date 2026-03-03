import { describe, it, expect } from 'vitest'
import { getResponsiveConfig } from './globeConfig'

describe('getResponsiveConfig', () => {
    it('returns mobile config for narrow containers', () => {
        const config = getResponsiveConfig(320)
        expect(config.isMobile).toBe(true)
        expect(config.isTablet).toBe(false)
        expect(config.globeRadius).toBe(2.4)
        expect(config.latStep).toBe(20)
        expect(config.particleCount).toBe(8)
        expect(config.cameraZ).toBe(6.5)
    })

    it('returns tablet config for medium containers', () => {
        const config = getResponsiveConfig(600)
        expect(config.isMobile).toBe(false)
        expect(config.isTablet).toBe(true)
        expect(config.globeRadius).toBe(2.6)
    })

    it('returns desktop config for wide containers', () => {
        const config = getResponsiveConfig(1024)
        expect(config.isMobile).toBe(false)
        expect(config.isTablet).toBe(false)
        expect(config.globeRadius).toBe(2.8)
        expect(config.latStep).toBe(10)
        expect(config.particleCount).toBe(20)
        expect(config.cameraZ).toBe(6)
    })

    it('clamps scale to max 1.0', () => {
        const config = getResponsiveConfig(1200)
        expect(config.scale).toBeLessThanOrEqual(1)
    })
})
