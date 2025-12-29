'use client'

import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useCountries } from '../lib/getCountries'

// Fix for default marker icons
delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: () => string })._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Component to recenter the map when location changes
function ReCenter({ latLang }: { latLang: [number, number] }) {
    const map = useMap()
    
    useEffect(() => {
        if (latLang) {
            map.setView(latLang, 8)
        }
    }, [latLang, map])
    
    return null
}

const Map = ({ locationValue }: {locationValue?: string}) => {
    const { getCountryByValue } = useCountries();

    const latLang = getCountryByValue(locationValue ?? '')?.latLang

    return (
        <MapContainer
            center={latLang ?? [51.505, -0.09]}
            zoom={8}
            scrollWheelZoom={false}
            className="h-[50vh] rounded-lg relative z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {latLang && (
                <>
                    <ReCenter latLang={latLang} />
                    <Marker position={latLang}>
                        <Popup>
                            Selected location
                        </Popup>
                    </Marker>
                </>
            )}
        </MapContainer>
    )
}

export default Map