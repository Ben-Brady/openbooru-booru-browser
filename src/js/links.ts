export const HOME = "/";
export const ABOUT_US = "/info/about";
export const CONTACT_US = "/info/contact";
export const TOS = "/info/tos";

export const generate_post_link = (id: string|number, booru: string) => `/post/${booru}/${id}`;
export const generate_posts_link = (layout: "column" | "grid" | "" = "") => `/posts/${layout}`;

export default {
    home: HOME,
    generate_post_link,
    generate_posts_link,
    ABOUT_US,
    CONTACT_US,
    TOS,
};
