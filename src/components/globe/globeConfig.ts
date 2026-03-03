export interface GlobeConfig {
    isMobile: boolean
    isTablet: boolean
    scale: number
    globeRadius: number
    latStep: number
    lngStep: number
    latSegments: number
    latPointInterval: number
    lngLatStep: number
    lngPointInterval: number
    mainLineOpacity: number
    subLineOpacity: number
    mainGlowOpacity: number
    subGlowOpacity: number
    connectionPointSkip: number
    pointSize: number
    markerSize: number
    markerGlowSize: number
    particleCount: number
    particleSize: number
    networkConnections: number
    cameraZ: number
    markerSegments: number
}

/** Returns responsive scaling factors based on container width */
export const getResponsiveConfig = (containerWidth: number): GlobeConfig => {
    const isMobile = containerWidth < 480
    const isTablet = containerWidth >= 480 && containerWidth < 768
    const scale = containerWidth / 500 // 500 is the desktop reference size

    return {
        isMobile,
        isTablet,
        scale: Math.min(scale, 1),
        globeRadius: isMobile ? 2.4 : isTablet ? 2.6 : 2.8,
        latStep: isMobile ? 20 : 10,
        lngStep: isMobile ? 20 : 10,
        latSegments: isMobile ? 32 : 64,
        latPointInterval: isMobile ? 16 : 8,
        lngLatStep: isMobile ? 12 : 6,
        lngPointInterval: isMobile ? 30 : 15,
        mainLineOpacity: isMobile ? 0.5 : 0.8,
        subLineOpacity: isMobile ? 0.3 : 0.5,
        mainGlowOpacity: isMobile ? 0.2 : 0.4,
        subGlowOpacity: isMobile ? 0.1 : 0.2,
        connectionPointSkip: isMobile ? 5 : 3,
        pointSize: isMobile ? 0.015 : 0.02,
        markerSize: isMobile ? 0.06 : 0.08,
        markerGlowSize: isMobile ? 0.09 : 0.12,
        particleCount: isMobile ? 8 : 20,
        particleSize: isMobile ? 0.01 : 0.015,
        networkConnections: isMobile ? 8 : 15,
        cameraZ: isMobile ? 6.5 : 6,
        markerSegments: isMobile ? 8 : 16,
    }
}
