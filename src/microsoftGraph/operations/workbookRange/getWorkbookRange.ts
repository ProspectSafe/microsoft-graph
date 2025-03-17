import type { GraphOptions } from "../../GraphOptions.js";
import type { GraphRequest } from "../../GraphRequest.js";
import type { WorkbookRange } from "../../model/models.js";
import type { WorkbookRangeRef } from "../../model/WorkbookRangeRef.js";
import generatePath from "../../utils/generatePath.js";

/** Fetch a range, including values and formatting. @see https://learn.microsoft.com/en-us/graph/api/range-get */
export default function getWorkbookRange(rangeRef: WorkbookRangeRef, opts?: GraphOptions): GraphRequest<WorkbookRange> {
    return {
        method: "GET",
        path: generatePath(`/sites/{site-id}/drives/{drive-id}/items/{item-id}/workbook/worksheets/{worksheet-id}/range(address='{address}')`, rangeRef),
        headers: {
            'workbook-session-id': rangeRef.sessionId,
        },
        body: null,
        dependsOn: opts?.dependsOn,
    };
}