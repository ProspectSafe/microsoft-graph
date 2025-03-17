import { fileURLToPath } from "url";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type { DriveId } from "./microsoftGraph/drives/DriveId.js";
import type { DriveItemId } from "./microsoftGraph/drives/driveItem/DriveItemId.js";
import execute from "./microsoftGraph/execute.js";
import openWorkbook from "./microsoftGraph/helpers/openWorkbook.js";
import openWorksheet from "./microsoftGraph/helpers/openWorksheet.js";
import type { SiteId } from "./microsoftGraph/sites/SiteId.js";
import getWorkbookUsedRange from "./microsoftGraph/workbooks/workbookRange/getWorkbookUsedRange.js";
import type { WorkbookWorksheetId } from "./microsoftGraph/workbooks/workbookWorksheet/WorkbookWorksheetId.js";

export type Arguments = {
	siteId: SiteId;
	driveId: DriveId;
	itemId: DriveItemId;
	worksheetId: WorkbookWorksheetId;
};

/** Core logic goes here. But don't call this function directly - use `runNative` or `runCli` instead. */
async function run(args: Arguments): Promise<void> {
	//
	// TODO: Core logic goes here...
	//

	const workbookRef = await openWorkbook({
		siteId: args.siteId,
		driveId: args.driveId,
		itemId: args.itemId,
	});

	const worksheetRef = openWorksheet(workbookRef, args.worksheetId);

	const [usedRange] = await execute(getWorkbookUsedRange(worksheetRef));

	console.info(usedRange.values);
}

/** Called by Flowise during normal use. */
export async function runNative(args: Arguments): Promise<string[]> {
	const info = console.info;
	const warn = console.warn;
	const error = console.error;

	const messages: string[] = [];

	console.info = (message: string): void => {
		messages.push(`[INFO] ${message}`);
		info(message);
	};
	console.warn = (message: string): void => {
		messages.push(`[WARN] ${message}`);
		warn(message);
	};
	console.error = (message: string): void => {
		messages.push(`[ERROR] ${message}`);
		error(message);
	};

	await run(args);
	return messages;
}

/** Called by CLI during development. */
async function runCli(): Promise<void> {
	const args = await yargs(hideBin(process.argv))
		.options({
			siteId: { type: "string", demandOption: true, coerce: (v) => v as SiteId },
			driveId: { type: "string", demandOption: true, coerce: (v) => v as DriveId },
			itemId: { type: "string", demandOption: true, coerce: (v) => v as DriveItemId },
			worksheetId: { type: "string", demandOption: true, coerce: (v) => v as WorkbookWorksheetId },
		})
		.parse();

	await run(args);
}

if (process.argv[1] === fileURLToPath(import.meta.url))
	await runCli();