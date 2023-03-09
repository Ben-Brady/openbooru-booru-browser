export type { Query } from "./query";
import type { Query } from "./query";

export interface Booru {
    name: string
    generate_url: (id: string) => string
    
    is_working: () => Promise<boolean>
    search: (query: Query, index: number) => Promise<Post[]>
    get: (id: string) => Promise<Post|undefined>
    search_tags: (search: string) => Promise<string[]>
}

export type Post = {
    booru: string,
    id: string
    type: MediaType
    created_at: Date
    title: string
    description: string
    tags: string[]
    score: number,
    source: string,
    origin: URL,
    
    thumbnail: Image,
    preview: Image
    full: Media
}

export type MediaType = "image" | "video" | "animation"


export type Image = {
    width: number,
    height: number,
    url: URL,
    mimetype: string,
    type: "image",
}

export type Animation = {
    width: number,
    height: number,
    url: URL,
    mimetype: string,
    type: "animation"
}

export type Video = {
    width: number,
    height: number,
    url: URL,
    mimetype: string,
    type: "video"
}

export type Media = Image | Animation | Video
