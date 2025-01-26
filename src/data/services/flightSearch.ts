import path from "path";
import { promises as fs } from "fs";
import type { Airport } from "../../types";

export async function getAirports(): Promise<Airport[]> {
  try {
    const airportsJson = path.join(process.cwd(), "src/data", "airports.json");
    const airportsFileData = await fs.readFile(airportsJson, "utf8");

    return JSON.parse(airportsFileData)?.Airports || [];
  } catch (error) {
    console.error("Error fetching airports:", error);
    throw error;
  }
}