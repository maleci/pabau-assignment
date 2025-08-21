import fs from "fs";
import path from "path";

export async function getTranslations(cookieHeader: string, page: string) {
    const match = cookieHeader
            .split("; ")
            .find((row) => row.startsWith("lang="));

    if (!match) {
        return JSON.parse(await fs.promises.readFile(`app/assets/locales/${page}/en.json`, "utf-8"));
    }

    const filePath = path.join(process.cwd(), `app/assets/locales/${page}/`, `${match.split("=")[1]}.json`);
    const raw = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(raw);
}