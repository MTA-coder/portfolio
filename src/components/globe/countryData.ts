export interface CountryData {
    name: string
    flag: string
    lat: number
    lng: number
    capital?: string
}

export const countries: CountryData[] = [
    {
        name: 'Syria',
        flag: 'SY',
        lat: 34.8021,
        lng: 38.9968,
        capital: 'Damascus',
    },
    {
        name: 'Germany',
        flag: '🇩🇪',
        lat: 51.1657,
        lng: 10.4515,
        capital: 'Berlin',
    },
    {
        name: 'Finland',
        flag: '🇫🇮',
        lat: 61.9241,
        lng: 25.7482,
        capital: 'Helsinki',
    },
    {
        name: 'UAE',
        flag: '🇦🇪',
        lat: 23.4241,
        lng: 53.8478,
        capital: 'Abu Dhabi',
    },
    {
        name: 'Saudi Arabia',
        flag: '🇸🇦',
        lat: 23.8859,
        lng: 45.0792,
        capital: 'Riyadh',
    },
    {
        name: 'Malaysia',
        flag: '🇲🇾',
        lat: 4.2105,
        lng: 101.9758,
        capital: 'Kuala Lumpur',
    },
    { name: 'France', flag: '🇫🇷', lat: 46.2276, lng: 2.2137, capital: 'Paris' },
    {
        name: 'Jordan',
        flag: '🇯🇴',
        lat: 30.5852,
        lng: 36.2384,
        capital: 'Amman',
    },
    {
        name: 'Japan',
        flag: '🇯🇵',
        lat: 36.2048,
        lng: 138.2529,
        capital: 'Tokyo',
    },
    {
        name: 'Turkey',
        flag: '🇹🇷',
        lat: 38.9637,
        lng: 35.2433,
        capital: 'Ankara',
    },
    {
        name: 'Iraq',
        flag: '🇮🇶',
        lat: 33.2232,
        lng: 43.6793,
        capital: 'Baghdad',
    },
]
