import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SyriaFlag from './SyriaFlag'
import { countries } from './globe/countryData'
import type { CountryData } from './globe/countryData'
import { getResponsiveConfig } from './globe/globeConfig'

const DigitalGlobe = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)
  const rendererRef = useRef<any>(null)
  const globeRef = useRef<any>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const previousMouseRef = useRef({ x: 0, y: 0 })
  const autoRotationRef = useRef({ enabled: true, speed: 0.002 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!mountRef.current) return

    const initThreeJS = async () => {
      const THREE = await import('three')

      // Scene setup with transparent background
      const scene = new THREE.Scene()

      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
      })

      const getSize = () => {
        const containerWidth = mountRef.current?.clientWidth || 300
        return Math.min(500, containerWidth)
      }

      const size = getSize()
      const config = getResponsiveConfig(size)
      renderer.setSize(size, size)
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, config.isMobile ? 1.5 : 2),
      )
      renderer.setClearColor(0x000000, 0)
      mountRef.current?.appendChild(renderer.domElement)

      // Create globe wireframe group
      const globeGroup = new THREE.Group()
      const globeRadius = config.globeRadius
      const connectionPoints: any[] = []
      const countryMarkers: any[] = []
      const dataFlows: any[] = []

      // Enhanced latitude lines - responsive density
      for (let lat = -80; lat <= 80; lat += config.latStep) {
        const radius = globeRadius
        const y = radius * Math.sin((lat * Math.PI) / 180)
        const circleRadius = radius * Math.cos((lat * Math.PI) / 180)

        const points = []
        const connectionPointsOnLine = []

        for (let i = 0; i <= config.latSegments; i++) {
          const angle = (i / config.latSegments) * Math.PI * 2
          const x = circleRadius * Math.cos(angle)
          const z = circleRadius * Math.sin(angle)
          points.push(new THREE.Vector3(x, y, z))

          if (i % config.latPointInterval === 0) {
            connectionPointsOnLine.push(new THREE.Vector3(x, y, z))
          }
        }

        connectionPoints.push(...connectionPointsOnLine)

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const isMainLine = lat % 20 === 0
        const material = new THREE.LineBasicMaterial({
          color: 0x9b87f5,
          transparent: true,
          opacity: isMainLine ? config.mainLineOpacity : config.subLineOpacity,
          linewidth: isMainLine ? 2 : 1,
        })
        const line = new THREE.LineLoop(geometry, material)
        globeGroup.add(line)

        const glowMaterial = new THREE.LineBasicMaterial({
          color: 0x9b87f5,
          transparent: true,
          opacity: isMainLine ? config.mainGlowOpacity : config.subGlowOpacity,
          linewidth: isMainLine ? 3 : 2,
        })
        const glowLine = new THREE.LineLoop(geometry.clone(), glowMaterial)
        globeGroup.add(glowLine)
      }

      // Enhanced longitude lines - responsive density
      for (let lng = 0; lng < 360; lng += config.lngStep) {
        const points = []
        const connectionPointsOnLine = []

        for (let lat = -90; lat <= 90; lat += config.lngLatStep) {
          const phi = (90 - lat) * (Math.PI / 180)
          const theta = lng * (Math.PI / 180)

          const x = globeRadius * Math.sin(phi) * Math.cos(theta)
          const y = globeRadius * Math.cos(phi)
          const z = globeRadius * Math.sin(phi) * Math.sin(theta)

          points.push(new THREE.Vector3(x, y, z))

          if (lat % config.lngPointInterval === 0) {
            connectionPointsOnLine.push(new THREE.Vector3(x, y, z))
          }
        }

        connectionPoints.push(...connectionPointsOnLine)

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const isMainLine = lng % 30 === 0
        const material = new THREE.LineBasicMaterial({
          color: 0x9b87f5,
          transparent: true,
          opacity: isMainLine ? config.mainLineOpacity : config.subLineOpacity,
          linewidth: isMainLine ? 2 : 1,
        })
        const line = new THREE.Line(geometry, material)
        globeGroup.add(line)

        const glowMaterial = new THREE.LineBasicMaterial({
          color: 0x9b87f5,
          transparent: true,
          opacity: isMainLine ? config.mainGlowOpacity : config.subGlowOpacity,
          linewidth: isMainLine ? 3 : 2,
        })
        const glowLine = new THREE.Line(geometry.clone(), glowMaterial)
        globeGroup.add(glowLine)
      }

      // Add connection points as glowing spheres
      const pointGeometry = new THREE.SphereGeometry(config.pointSize, 8, 8)
      const pointMaterial = new THREE.MeshBasicMaterial({
        color: 0x9b87f5,
        transparent: true,
        opacity: 0.8,
      })

      connectionPoints.forEach((point, index) => {
        if (index % config.connectionPointSkip === 0) {
          const sphere = new THREE.Mesh(pointGeometry, pointMaterial)
          sphere.position.copy(point)
          globeGroup.add(sphere)
        }
      })

      // Create country markers with responsive size
      const markerGeometry = new THREE.SphereGeometry(
        config.markerSize,
        config.markerSegments,
        config.markerSegments,
      )
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0x1eaedb,
        transparent: true,
        opacity: 0.9,
      })

      const countryPositions: any[] = []

      countries.forEach((country, index) => {
        // Convert lat/lng to 3D coordinates
        const phi = (90 - country.lat) * (Math.PI / 180)
        const theta = (country.lng + 180) * (Math.PI / 180)

        const x = globeRadius * Math.sin(phi) * Math.cos(theta)
        const y = globeRadius * Math.cos(phi)
        const z = globeRadius * Math.sin(phi) * Math.sin(theta)

        const position = new THREE.Vector3(x, y, z)
        countryPositions.push(position)

        const marker = new THREE.Mesh(markerGeometry, markerMaterial.clone())
        marker.position.copy(position)
        marker.userData = { country, index }

        // Add pulsing glow effect with responsive size
        const glowGeometry = new THREE.SphereGeometry(
          config.markerGlowSize,
          config.markerSegments,
          config.markerSegments,
        )
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: 0x6366f1, // Using website's secondary blue color
          transparent: true,
          opacity: 0.3,
        })
        const glow = new THREE.Mesh(glowGeometry, glowMaterial)
        glow.position.copy(marker.position)

        globeGroup.add(marker)
        globeGroup.add(glow)
        countryMarkers.push({ marker, glow, country })
      })

      // Create data flow animations between country markers
      const createDataFlows = () => {
        for (let i = 0; i < countryPositions.length; i++) {
          for (let j = i + 1; j < countryPositions.length; j++) {
            // Create curved path between two points
            const start = countryPositions[i]
            const end = countryPositions[j]

            // Calculate midpoint elevated above the globe surface
            const midpoint = new THREE.Vector3()
              .addVectors(start, end)
              .multiplyScalar(0.5)
              .normalize()
              .multiplyScalar(globeRadius + 0.5)

            const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end)
            const points = curve.getPoints(100)
            const geometry = new THREE.BufferGeometry().setFromPoints(points)

            // Create flowing particles along the path - responsive count
            const particleCount = config.particleCount
            const particleGeometry = new THREE.SphereGeometry(
              config.particleSize,
              8,
              8,
            )
            const particleMaterial = new THREE.MeshBasicMaterial({
              color: 0x00ffff,
              transparent: true,
              opacity: 0.8,
            })

            const flowParticles: any[] = []
            for (let k = 0; k < particleCount; k++) {
              const particle = new THREE.Mesh(
                particleGeometry,
                particleMaterial.clone(),
              )
              particle.userData = {
                progress: k / particleCount + Math.random() * 0.1,
                curve: curve,
                speed: 0.005 + Math.random() * 0.003,
                delay: Math.random() * 2000,
              }
              globeGroup.add(particle)
              flowParticles.push(particle)
            }

            dataFlows.push(flowParticles)
          }
        }
      }

      createDataFlows()

      // Create network connections between random points - responsive count
      const createNetworkConnections = () => {
        const numConnections = config.networkConnections
        for (let i = 0; i < numConnections; i++) {
          const point1 =
            connectionPoints[
              Math.floor(Math.random() * connectionPoints.length)
            ]
          const point2 =
            connectionPoints[
              Math.floor(Math.random() * connectionPoints.length)
            ]

          if (point1 !== point2) {
            const curve = new THREE.QuadraticBezierCurve3(
              point1,
              new THREE.Vector3(
                (point1.x + point2.x) / 2 + (Math.random() - 0.5) * 0.5,
                (point1.y + point2.y) / 2 + (Math.random() - 0.5) * 0.5,
                (point1.z + point2.z) / 2 + (Math.random() - 0.5) * 0.5,
              ),
              point2,
            )

            const points = curve.getPoints(50)
            const geometry = new THREE.BufferGeometry().setFromPoints(points)
            const material = new THREE.LineBasicMaterial({
              color: 0x6366f1,
              transparent: true,
              opacity: 0.3,
              linewidth: 1,
            })

            const connection = new THREE.Line(geometry, material)
            globeGroup.add(connection)
          }
        }
      }

      createNetworkConnections()
      scene.add(globeGroup)

      // Enhanced lighting
      const ambientLight = new THREE.AmbientLight(0x9b87f5, 0.6)
      scene.add(ambientLight)

      const pointLight = new THREE.PointLight(0x9b87f5, 0.8, 20)
      pointLight.position.set(5, 5, 5)
      scene.add(pointLight)

      const pointLight2 = new THREE.PointLight(0x6366f1, 0.6, 15)
      pointLight2.position.set(-5, -5, 5)
      scene.add(pointLight2)

      camera.position.set(0, 0, config.cameraZ)

      // Raycaster for mouse interaction
      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()

      // Enhanced mouse interaction (mouse + touch)
      const handleMouseMove = (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect()
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

        // Update mouse position for tooltip
        setMousePosition({ x: event.clientX, y: event.clientY })

        if (isDraggingRef.current) {
          // Handle dragging
          const deltaX = event.clientX - previousMouseRef.current.x
          const deltaY = event.clientY - previousMouseRef.current.y

          globeGroup.rotation.y += deltaX * 0.01
          globeGroup.rotation.x += deltaY * 0.01

          // Disable auto rotation while dragging
          autoRotationRef.current.enabled = false

          previousMouseRef.current = { x: event.clientX, y: event.clientY }
        } else {
          // Handle hover detection
          raycaster.setFromCamera(mouse, camera)
          const markers = countryMarkers.map((cm) => cm.marker)
          const intersects = raycaster.intersectObjects(markers)

          if (intersects.length > 0) {
            const intersectedMarker = intersects[0].object
            const countryData = intersectedMarker.userData.country
            setHoveredCountry(countryData)
            renderer.domElement.style.cursor = 'pointer'
          } else {
            setHoveredCountry(null)
            renderer.domElement.style.cursor = 'grab'
          }
        }
      }

      const handleMouseDown = (event: MouseEvent) => {
        isDraggingRef.current = true
        previousMouseRef.current = { x: event.clientX, y: event.clientY }
        renderer.domElement.style.cursor = 'grabbing'
      }

      const handleMouseUp = () => {
        isDraggingRef.current = false
        renderer.domElement.style.cursor = 'grab'

        // Re-enable auto rotation after a delay
        setTimeout(() => {
          if (!isDraggingRef.current) {
            autoRotationRef.current.enabled = true
          }
        }, 2000)
      }

      // Touch event handlers for mobile
      const handleTouchStart = (event: TouchEvent) => {
        if (event.touches.length === 1) {
          const touch = event.touches[0]
          isDraggingRef.current = true
          previousMouseRef.current = { x: touch.clientX, y: touch.clientY }
          autoRotationRef.current.enabled = false
        }
      }

      const handleTouchMove = (event: TouchEvent) => {
        if (event.touches.length === 1 && isDraggingRef.current) {
          event.preventDefault()
          const touch = event.touches[0]
          const deltaX = touch.clientX - previousMouseRef.current.x
          const deltaY = touch.clientY - previousMouseRef.current.y

          globeGroup.rotation.y += deltaX * 0.01
          globeGroup.rotation.x += deltaY * 0.01

          previousMouseRef.current = { x: touch.clientX, y: touch.clientY }
        }
      }

      const handleTouchEnd = () => {
        isDraggingRef.current = false
        setTimeout(() => {
          if (!isDraggingRef.current) {
            autoRotationRef.current.enabled = true
          }
        }, 2000)
      }

      renderer.domElement.addEventListener('mousemove', handleMouseMove)
      renderer.domElement.addEventListener('mousedown', handleMouseDown)
      renderer.domElement.addEventListener('mouseup', handleMouseUp)
      renderer.domElement.addEventListener('mouseleave', handleMouseUp)
      renderer.domElement.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      })
      renderer.domElement.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      })
      renderer.domElement.addEventListener('touchend', handleTouchEnd, {
        passive: true,
      })
      renderer.domElement.style.cursor = 'grab'
      renderer.domElement.style.touchAction = 'none'

      // Store references
      sceneRef.current = scene
      rendererRef.current = renderer
      globeRef.current = {
        globeGroup,
        connectionPoints,
        countryMarkers,
        dataFlows,
      }

      // Animation loop with auto rotation, cursor interaction, and data flow
      let animationId: number
      const animate = () => {
        animationId = requestAnimationFrame(animate)

        const time = Date.now() * 0.001

        // Auto rotation when not dragging
        if (autoRotationRef.current.enabled && !isDraggingRef.current) {
          globeGroup.rotation.y += autoRotationRef.current.speed
        }

        // Animate data flow particles
        dataFlows.forEach((flowParticles) => {
          flowParticles.forEach((particle: any) => {
            if (time * 1000 > particle.userData.delay) {
              particle.userData.progress += particle.userData.speed

              if (particle.userData.progress > 1) {
                particle.userData.progress = 0
                particle.userData.delay = time * 1000 + Math.random() * 3000
              }

              const point = particle.userData.curve.getPoint(
                particle.userData.progress,
              )
              particle.position.copy(point)

              // Fade effect based on progress
              const fadeIn = Math.min(particle.userData.progress * 5, 1)
              const fadeOut = Math.min((1 - particle.userData.progress) * 5, 1)
              particle.material.opacity = Math.min(fadeIn, fadeOut) * 0.8

              // Scale effect for light speed
              const scale =
                1 + Math.sin(particle.userData.progress * Math.PI) * 0.3
              particle.scale.setScalar(scale)
            } else {
              particle.material.opacity = 0
            }
          })
        })

        // Enhanced pulsing effect with proper type checking
        globeGroup.children.forEach((child, index) => {
          // Type guard to check if child has material property
          if (
            'material' in child &&
            child.material &&
            typeof child.material === 'object'
          ) {
            const material = child.material as THREE.Material
            const isGlow = index % 2 === 1

            // Check if material has color property
            if ('color' in material && material.color instanceof THREE.Color) {
              const colorHex = material.color.getHex()
              const isConnection = colorHex === 0x6366f1
              const isMarker = colorHex === 0x1eaedb

              if (isConnection) {
                material.opacity = 0.2 + Math.sin(time * 2 + index * 0.5) * 0.3
              } else if (isMarker) {
                material.opacity = 0.7 + Math.sin(time * 3 + index * 0.8) * 0.3
              } else {
                const baseOpacity = isGlow ? 0.3 : 0.6
                material.opacity =
                  baseOpacity + Math.sin(time * 1.5 + index * 0.3) * 0.2
              }
            }
          }
        })

        renderer.render(scene, camera)
      }

      animate()
      setIsLoaded(true)

      return () => {
        if (animationId) cancelAnimationFrame(animationId)
        renderer.domElement.removeEventListener('mousemove', handleMouseMove)
        renderer.domElement.removeEventListener('mousedown', handleMouseDown)
        renderer.domElement.removeEventListener('mouseup', handleMouseUp)
        renderer.domElement.removeEventListener('mouseleave', handleMouseUp)
        renderer.domElement.removeEventListener('touchstart', handleTouchStart)
        renderer.domElement.removeEventListener('touchmove', handleTouchMove)
        renderer.domElement.removeEventListener('touchend', handleTouchEnd)
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement)
        }
        renderer.dispose()
      }
    }

    const cleanup = initThreeJS()

    return () => {
      cleanup.then((cleanupFn) => cleanupFn && cleanupFn())
    }
  }, [])

  // Handle resize with responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (rendererRef.current && mountRef.current) {
        const containerWidth = mountRef.current.clientWidth
        const size = Math.min(500, containerWidth)
        rendererRef.current.setSize(size, size)

        if (sceneRef.current) {
          const camera = sceneRef.current.children.find(
            (child: any) => child.type === 'PerspectiveCamera',
          )
          if (camera) {
            camera.aspect = 1
            camera.updateProjectionMatrix()
          }
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative w-full">
      {/* Loading state */}
      {!isLoaded && (
        <div className="w-full aspect-square bg-transparent rounded-lg flex items-center justify-center">
          <div className="text-tech-purple animate-pulse text-lg">
            Loading Globe...
          </div>
        </div>
      )}

      {/* 3D Globe Container */}
      <div
        ref={mountRef}
        className={`relative bg-transparent rounded-lg overflow-hidden transition-opacity duration-500 w-full ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ aspectRatio: '1:1' }}
      />

      {/* Country Tooltip */}
      {hoveredCountry && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y - 10,
            transform: 'translate(0, -100%)',
          }}
        >
          <div className="bg-secondary/95 backdrop-blur-sm border border-tech-purple/30 rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-2xl"
                style={{ fontSize: '1.5rem', lineHeight: '1' }}
              >
                {hoveredCountry.flag === 'SY' ? (
                  <SyriaFlag size={28} />
                ) : (
                  hoveredCountry.flag
                )}
              </span>
              <span className="font-semibold text-foreground">
                {hoveredCountry.name}
              </span>
            </div>
            {hoveredCountry.capital && (
              <div className="text-sm text-muted-foreground">
                Capital: {hoveredCountry.capital}
              </div>
            )}
            <div className="w-3 h-3 bg-secondary/95 border-r border-b border-tech-purple/30 absolute -bottom-1.5 left-4 transform rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DigitalGlobe
