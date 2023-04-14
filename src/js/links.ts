import type { Query } from "js/booru/types"
import { encode_query } from "js/booru/query"

export const HOME = "/";
export const INFO = "/info";
export const ABOUT_US = "/info/about";
export const CONTACT_US = "/info/contact";
export const TOS = "/info/tos";

export const generate_post_link = (id: string|number, booru: string) => `/post/${booru}/${id}`;
export function generate_posts_link(layout: "column" | "grid" |  "" = "", query: Query = {}) {
    if (!query) {
        return `/posts/${layout}`
    }

    let params = encode_query(query);

    if (params.toString() === "") {
        return `/posts/${layout}`;
    } else {
        return `/posts/${layout}?${params.toString()}`;
    }
}

export default {
    home: HOME,
    generate_post_link,
    generate_posts_link,
    ABOUT_US,
    CONTACT_US,
    TOS,
    INFO,
};
