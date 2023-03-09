import type { Post, Image, Media } from "./types";

export function parse_xml(xml: string, booru: string): Post[] {
    const parser = new DOMParser().parseFromString(xml, "application/xml");
    let post_nodes = parser.getElementsByTagName("post");
    
    return Array.from(post_nodes)
        .map(node => parse_post_node(node, booru))
        .filter(v => !!v)
}

function parse_post_node(node: Element, booru: string): Post {
    let full: Media = {
        //@ts-ignore
        url: new URL(node.getAttribute("file_url")),
        width: Number(node.getAttribute("width")),
        height: Number(node.getAttribute("height")),
    }

    let preview: Media = {
        //@ts-ignore
        url: new URL(node.getAttribute("sample_url")),
        width: Number(node.getAttribute("sample_width")),
        height: Number(node.getAttribute("sample_height")),
    }

    let thumbnail: Image = {
        //@ts-ignore
        url: new URL(node.getAttribute("preview_url")),
        width: Number(node.getAttribute("preview_width")),
        height: Number(node.getAttribute("preview_height")),
    }

    //@ts-ignore
    let id = Number(node.getAttribute("id")).toString()

    //@ts-ignore
    let tags = node.getAttribute("tags").split(" ").filter(v => v != "")

    //@ts-ignore
    const IMAGE_EXTENTIONS = ["png", "jpeg", "jpg", "webp"]
    const ANIMATION_EXTENTIONS = ["gif"]
    const VIDEO_EXTENTIONS = ["webm", "mp4"]
    
    let extention = full.url.pathname.split('.').pop();
    let type: "image" | "animation" | "video";
    if (extention === undefined) {
        throw new Error("Invalid Post Type")
    } else if (IMAGE_EXTENTIONS.includes(extention)) {
        type = "image"
    } else if (ANIMATION_EXTENTIONS.includes(extention)) {
        type = "animation"
    } else if (VIDEO_EXTENTIONS.includes(extention)) {
        type = "video"
    } else {
        throw new Error("Invalid Post Type")
    }
    

    //@ts-ignore
    let score = Number(node.getAttribute("score"));

    //@ts-ignore
    let created_at = new Date(node.getAttribute("created_at"));

    return {
        id,
        booru: booru,
        tags,
        type,
        score,
        title: "",
        description: "",
        created_at,
        full,
        preview,
        thumbnail,
    }

}