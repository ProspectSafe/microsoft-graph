import type { DriveItem } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { GraphOptions } from "../../models/GraphOptions.js";
import type { SiteRef } from "../../models/SiteRef.js";
import generatePath from "../../services/generatePath.js";

/** Retrieve the list of Drive resources available for a Site. @see https://learn.microsoft.com/en-us/graph/api/drive-list */
export default function listDrives(siteRef: SiteRef, opts?: GraphOptions): GraphOperation<{ value: DriveItem[] }> {
    return {
        method: "GET",
        path: generatePath("/sites/{site-id}/drives", siteRef),
        headers: {},
        body: null,
        dependsOn: opts?.dependsOn,
    };
}
