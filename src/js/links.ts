import type { Query } from "js/booru/types"
import { encode_query } from "js/booru/query"

export const HOME = "/";
export const INFO = "/info";
export const ABOUT_US = "/info/about";
export const CONTACT_US = "/info/contact";
export const TOS = "/info/tos";

export const generate_post_link = (id: string|number, booru: string) => `/post/${booru}/${id}`;
export function generate_posts_link(layout: "column" | "grid" | "" = "", query: Query = {}) {
    if (!query) {
        return `/posts/${layout}`
    }

    let query_param = encode_query(query);
    if (query_param.length === 0) {
        return `/posts/${layout}`
    }
     
    return `/posts/${layout}?query=${encodeURIComponent(query_param)}`
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
