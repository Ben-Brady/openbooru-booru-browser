export const home = () => "/home";
export const tags = () => "/tags";
export const post = (id: string, booru: string) => `/post/${booru}/${id}`;
export const posts = (layout: "column" | "grid" | "" = "") => `/posts/${layout}`;

export default { home, tags, post, posts };
