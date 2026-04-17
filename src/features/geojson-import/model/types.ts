import type { Feature } from "../../../entities/geo-feature/model/types";

export type GeoJsonImportResult = {
  features: Feature[];
};

export type GeoJsonImportStatus =
  | { state: "idle" }
  | { state: "loading" }
  | {
      state: "success";
      message: string;
    }
  | { state: "error"; message: string };
