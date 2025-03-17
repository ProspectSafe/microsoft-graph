import generatePath from "../../generatePath.js";
import type { GraphOptions } from "../../GraphOptions.js";
import type { GraphRequest } from "../../GraphRequest.js";
import type { DriveItemRef } from "./DriveItemRef.js";

/** Initiate an asyncronous copy of an item. NOTE: The copied file may not be immediately available and polling is required. @see https://learn.microsoft.com/en-us/graph/api/driveitem-copy */
export default function copyDriveItem(srcFileRef: DriveItemRef, dstFolderRef: DriveItemRef, dstFileName: string, opts?: GraphOptions): GraphRequest<void> {
    return {
        method: "POST",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/copy`, srcFileRef),
        headers: {
            'content-type': 'application/json',
        },
        body: {
            name: dstFileName,
            parentReference: {
                siteId: dstFolderRef.siteId,
                driveId: dstFolderRef.driveId,
                id: dstFolderRef.itemId,
            },
        },
        dependsOn: opts?.dependsOn,
    };
}
