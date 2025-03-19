import { describe, expect, it } from "vitest";
import { executeSingle } from "../../graphApi.js";
import { defaultDriveRef } from "../../services/configuration.js";
import { driveItemPath, driveItemRef } from "../../services/driveItem.js";
import { generateTempFileName } from "../../services/temporaryFiles.js";
import { workbookWorksheetRef } from "../../services/workbookWorksheet.js";
import { deleteDriveItemWithRetry } from "../../tasks/deleteDriveItemWithRetry.js";
import createWorkbook from "../workbook/createWorkbook.js";
import createWorkbookWorksheet from "./createWorkbookWorksheet.js";
import updateWorkbookWorksheet from "./updateWorkbookWorksheet.js";

describe("updateWorkbookWorksheet", () => {
    it("can update the name of an existing worksheet", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await executeSingle(createWorkbook(defaultDriveRef, workbookPath));
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet = await executeSingle(createWorkbookWorksheet(workbookRef));
            const worksheetRef = workbookWorksheetRef(workbookRef, worksheet.id);

            const newName = "UpdatedSheet";
            const updatedWorksheet = await executeSingle(updateWorkbookWorksheet(worksheetRef, { name: newName }));
            expect(updatedWorksheet.name).toBe(newName);
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });

    it("can update the visibility of an existing worksheet", { timeout: 10000 }, async () => {
        const workbookName = generateTempFileName("xlsx");
        const workbookPath = driveItemPath(workbookName);
        const workbook = await executeSingle(createWorkbook(defaultDriveRef, workbookPath));
        const workbookRef = driveItemRef(defaultDriveRef, workbook.id);

        try {
            const worksheet = await executeSingle(createWorkbookWorksheet(workbookRef));
            const worksheetRef = workbookWorksheetRef(workbookRef, worksheet.id);

            const updatedWorksheet = await executeSingle(updateWorkbookWorksheet(worksheetRef, { visibility: "Hidden" }));
            expect(updatedWorksheet.visibility).toBe("Hidden");
        } finally {
            await deleteDriveItemWithRetry(workbookRef);
        }
    });
});
