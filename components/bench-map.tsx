'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Link from 'next/link'
import type { Bench } from '@/lib/benches'
import 'leaflet/dist/leaflet.css'

function pinIcon(isTest: boolean) {
  const fill = isTest ? '#c98a1a' : '#2f6b45'
  const dash = isTest ? 'stroke-dasharray="3 3" stroke="#7a5410" stroke-width="1.5"' : ''
  return L.divIcon({
    className: 'bench-pin',
    html: `
      <svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M15 1C7.3 1 1 7.2 1 15c0 9.5 12 24.5 13.1 25.8a1.2 1.2 0 0 0 1.8 0C17 39.5 29 24.5 29 15 29 7.2 22.7 1 15 1Z" fill="${fill}" ${dash}/>
        <circle cx="15" cy="15" r="5.5" fill="#fff"/>
      </svg>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -38],
  })
}

type Props = {
  benches: Bench[]
  center?: [number, number]
}

export default function BenchMap({ benches, center = [53.405, -2.94] }: Props) {
  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      className="rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {benches.map((b) => {
        const isTest = b.status === 'test'
        return (
          <Marker key={b.id} position={[b.location.lat, b.location.lng]} icon={pinIcon(isTest)}>
            <Popup>
              <div style={{ minWidth: 180 }}>
                <strong style={{ fontSize: '1rem' }}>{b.location.name}</strong>
                <div>Bench {b.id}</div>
                <div style={{ color: '#555' }}>
                  from {b.source.building}, {b.source.place}
                </div>
                    {isTest && (
                  <div
                    style={{
                      marginTop: 6,
                      padding: '4px 6px',
                      borderRadius: 6,
                      background: '#fbeccb',
                      color: '#7a5410',
                      fontWeight: 600,
                    }}
                    >
                    Test pin, no bench here yet
                  </div>
                )}
                <div style={{ marginTop: 6 }}>
                  <Link href={`/b/${b.id}`} style={{ color: '#2f6b45', fontWeight: 600 }}>
                    See this bench&apos;s question →
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
