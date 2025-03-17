import BadTemplateError from "./errors/BadTemplateError.js";
import type { GraphPath } from "./GraphRequest.js";
import { kebabToCamelCase } from "./stringCaseConversion.js";

/** Create a GraphAPI path based on a given template and arguments. Escaping is automatically handeld */
export default function generatePath(template: string, args: Record<string, string>): GraphPath {
    if (!template.startsWith("/")) throw new BadTemplateError("Path template must start with a slash.");
    if (template.includes("\n")) throw new BadTemplateError("Path template must not contain newlines.");

    return template.replace(/{(\w+)}/g, (key: string): string => {
        const camelCaseKey = kebabToCamelCase(key);
        const value = args[camelCaseKey as keyof typeof args];
        if (value === undefined) throw new BadTemplateError(`Path template references argument '${camelCaseKey}' however no such argument provided.`);
        return encodeURIComponent(value);
    }) as GraphPath;
}
