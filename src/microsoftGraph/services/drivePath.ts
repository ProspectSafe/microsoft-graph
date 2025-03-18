import InvalidArgumentError from "../errors/InvalidArgumentError.js";
import type { DriveItemPath } from "../models/DriveItemPath.js";

const segmentPattern = /^[^"*:<>?\\|#]{1,256}$/;

const reservedNames = [
    "CON", "PRN", "AUX", "NUL",
    "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9",
    "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9"
];

/** Create a drive item path from a given set of segments. Ie ["a","b"] => "/a/b" */
export function drivePath(...segments: string[]): DriveItemPath {
    for (const segment of segments) {
        if (segment === "") {
            throw new InvalidArgumentError("Segment cannot be an empty string.");
        }

        if (!segmentPattern.test(segment)) {
            throw new InvalidArgumentError(`Segment '${segment}' does not match required pattern '${segmentPattern}'.`);
        }

        if (reservedNames.includes(segment.toUpperCase())) {
            throw new InvalidArgumentError(`Segment '${segment}' is a reserved name.`);
        }

        if (segment.endsWith(".")) {
            throw new InvalidArgumentError(`Segment '${segment}' cannot end with a period.`);
        }
    }

    let path = `${segments.join('/')}`;

    if (!path.startsWith("/")) {
        path = `/${path}`;
    }

    if (path.includes("//")) {
        throw new InvalidArgumentError("Path cannot contain consecutive slashes.");
    }

    if (path.length > 400) {
        throw new InvalidArgumentError("Path length exceeds 400 characters.");
    }

    return path as DriveItemPath;
}