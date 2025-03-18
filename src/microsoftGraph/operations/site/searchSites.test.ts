import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import searchSites from "./searchSites.js";

describe("searchSites", () => {
    it("can find sites matching the search keyword", async () => {
        const searchKeyword = "a";
        const result = await executeSingle(searchSites(searchKeyword));

        expect(result.value).toBeInstanceOf(Array);
        expect(result.value.length).toBeGreaterThan(0);
    });

    it("returns an empty array when no sites match the search keyword", async () => {
        const searchKeyword = "non-existent-keyword";
        const result = await executeSingle(searchSites(searchKeyword));

        expect(result.value).toBeInstanceOf(Array);
        expect(result.value.length).toBe(0);
    });
});
