import type { Post, Booru, Query } from "js/booru/types";


export class Search {
    pid: number;
    finished: boolean;
    loading: boolean;
    posts: Post[];
    query: Query;
    booru: Booru;

    constructor(query: Query, booru: Booru) {
        this.pid = 0;
        this.finished = false;
        this.loading = false;
        this.posts = [];
        this.query = query;
        this.booru = booru;
    }

    async search() {
        let posts = await this.booru.search(this.query, this.pid)
        return this;
    }
}
