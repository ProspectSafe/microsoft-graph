import type { DriveItemPath } from "../../models/DriveItemPath.js";
import type { DriveRef } from "../../models/DriveRef.js";
import type { DriveItem } from "../../models/Dto.js";
import type { GraphOperation } from "../../models/GraphOperation.js";
import type { GraphOptions } from "../../models/GraphOptions.js";
import generatePath from "../../services/generatePath.js";

/** Create folder if it doesn't exist, and return the folder. @see https://learn.microsoft.com/en-us/graph/api/driveitem-post-children */
export default function createFolder(driveRef: DriveRef, folderPath: DriveItemPath, opts?: GraphOptions): GraphOperation<DriveItem> {
    return {
        method: "POST",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/root:${folderPath}:/children`, driveRef),
        headers: {
            'content-type': 'application/json',
        },
        body: {
            name: folderPath,
            folder: {},
            "@microsoft.graph.conflictBehavior": "rename", // Do nothing if already exists
        },
        dependsOn: opts?.dependsOn,
    };
}
