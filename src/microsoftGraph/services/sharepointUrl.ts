import InvalidArgumentError from "../errors/InvalidArgumentError.js";
import type { DriveItemPath } from "../models/DriveItemPath.js";
import type { HostName } from "../models/HostName.js";
import type { SiteName } from "../models/SiteName.js";

const sharepointUrlPattern = /^\/sites\/([^\/]+)/;

/** Get the site name and item path from a given SharePoint URL. (ie https://lachlandev.sharepoint.com/sites/Nexus-Test/Shared%20Documents/Forms/AllItems.aspx?newTargetListUrl=%2Fsites%2FNexus%2DTest%2FShared%20Documents)) */
export function parseSharepointUrl(uiUrl: URL): { hostname: HostName; siteName: SiteName; itemPath: DriveItemPath } { // TODO: Move to service
    if (!uiUrl.hostname.endsWith(".sharepoint.com")) {
        throw new InvalidArgumentError("Invalid SharePoint URL. Must end with '.sharepoint.com'.");
    }
    const hostname = uiUrl.hostname as HostName;

    const pathMatch = uiUrl.pathname.match(sharepointUrlPattern);
    if (!pathMatch) {
        throw new InvalidArgumentError("Invalid SharePoint URL. Must start with '/sites/'.");
    }
    const siteName = pathMatch[1] as SiteName;

    const itemPath = (uiUrl.searchParams.get("viewPath") || uiUrl.searchParams.get("newTargetListUrl") || null) as DriveItemPath | null;
    if (!itemPath) {
        throw new InvalidArgumentError("Invalid SharePoint URL. Path not found in parameters.");
    }

    return {
        hostname,
        siteName,
        itemPath,
    };
}