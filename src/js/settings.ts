import { browser } from "$app/environment";
import { Rule34, booru_from_string } from "js/booru";
import type { Booru } from "./booru/types";

type Layout = "grid" | "column"

function genericGet<T>(key: string, default_value: T): T{
    if (!browser) return default_value

    let stored_value = sessionStorage.getItem(key)
    if (stored_value === null) {
        return default_value
    } else {
        return JSON.parse(stored_value)
    }
}

function genericSet(key: string, value: any) {
    if (!browser) return
    let data = JSON.stringify(value);
    sessionStorage.setItem(key, data)
}

class Settings {
    public get last_layout(): Layout {
        return genericGet<Layout>("layout", "grid");
    }

    public set last_layout(value: Layout) {
        genericSet("layout", value)
    }

    public get current_booru(): Booru {
        let booru_name = genericGet("booru_name", Rule34.short_name);
        return booru_from_string(booru_name)
    }
    
    public set current_booru(value: Booru) {
        genericSet("booru_name", value.short_name)
    }
    
    public get tracking_cookies(): boolean {
        return genericGet("tracking-cookies", false);
    }
    
    public set tracking_cookies(value: boolean) {
        genericSet("tracking-cookies", value);
    }
}

export default new Settings();