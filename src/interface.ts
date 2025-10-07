export interface ApiResponse {
    items: []
    links: object
    meta: object
}

export interface Personaje {
    name: string
    race: string
    gender: string
    ki: string
    maxKi: string
    description: string
    affiliation: string
    originPlanet: string
    image: string
}

export interface Planeta {
    id: number
    name: string
    isDestroyed: boolean
    description: string
    image: string
}