import type { Booru, Post, Query, Image, Media } from "./types";
import { Sort } from "./query";
import { parse_xml } from "./gelbooru_2";

export const Rule34: Booru = {
    name: "r34",
    
    async is_working() {
        return true
    },

    async search(query: Query, index: number = 0): Promise<Post[]> {
        let url = "https://api.rule34.xxx/index.php?page=dapi&s=post&q=index";
        let params = new URLSearchParams({ "pid": index / 100, "limit": 100 });

        let search = query.search;
        if (query.sort == Sort.HighestRated) { search += "sort:score" }
        else if (query.sort == Sort.LowestRated) { search += "sort:score:asc"}
        else if (query.sort == Sort.Hotest) { search += "sort:score"}
        else if (query.sort == Sort.Newest) { search += "sort:id"}
        params.set("tags", search)

        let r = await fetch(url + "&" + params.toString());
        let body = await r.text();
        let posts = parse_xml(body, self.name);
        console.log(posts)
        return posts
    },

    async get(id: string): Promise<Post | undefined> {
        let posts = await this.search({ search: `id:${id}` })
        if (posts.length == 1) {
            return posts[0]
        } else {
            return undefined
        }
    },

    async search_tags(search: string): Promise<string[]> {
        type Tag = {
            label: string,
            value: string
        };
    
        const URL = "https://rule34.xxx/autocomplete.php"
        let params = new URLSearchParams({ "q": search });
        let r = await fetch(URL + "?" + params.toString())
        let tags: Tag[] = await r.json();
        return tags.map(tag => tag.value)
    },
}
