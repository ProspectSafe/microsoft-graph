import type { WorkbookRef } from "../models/WorkbookRef.ts";
import type { WorkbookWorksheetId } from "../models/WorkbookWorksheetId.ts";
import type { WorkbookWorksheetRef } from "../models/WorkbookWorksheetRef.ts";

export const defaultWorkbookWorksheetId = "{00000000-0001-0000-0000-000000000000}" as WorkbookWorksheetId; // Program Manager in Microsoft Office Extensibility team says this ID is used for the first sheet of all workbooks by design, but not documented. https://github.com/OfficeDev/office-js/issues/552#issuecomment-800841930

export function createWorkbookWorksheetRef(workbookRef: WorkbookRef, worksheetId: WorkbookWorksheetId | undefined): WorkbookWorksheetRef {
	if (!worksheetId) {
		throw new Error("WorksheetID is missing");
	}

	return {
		contextId: workbookRef.contextId,
		siteId: workbookRef.siteId,
		driveId: workbookRef.driveId,
		itemId: workbookRef.itemId,
		sessionId: workbookRef.sessionId,
		worksheetId,
	};
}
