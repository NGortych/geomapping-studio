import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

import { AppShell } from "../../app/layout/AppShell";
import { useFeatureDataset } from "../../entities/geo-feature/hooks/useFeatureDataset";
import type { Feature } from "../../entities/geo-feature/model/types";
import { useDrawingController } from "../../features/drawing/hooks/useDrawingController";
import { GeoJsonExportControl } from "../../features/geojson-export/components/GeoJsonExportControl";
import { useGeoJsonExport } from "../../features/geojson-export/hooks/useGeoJsonExport";
import { GeoJsonImportControl } from "../../features/geojson-import/components/GeoJsonImportControl";
import { useGeoJsonImport } from "../../features/geojson-import/hooks/useGeoJsonImport";
import { SearchControl } from "../../features/search/components/SearchControl";
import { useLocationSearch } from "../../features/search/hooks/useLocationSearch";
import { FeatureTableView } from "../../features/table-view/components/FeatureTableView";
import type { ViewMode } from "../../features/table-view/model/types";
import { StudioControlPanel } from "./components/StudioControlPanel";
import { StudioControlsDrawer } from "./components/StudioControlsDrawer";
import { StudioHeader } from "./components/StudioHeader";
import { StudioMapPanel } from "./components/StudioMapPanel";
import { ViewModeControl } from "./components/ViewModeControl";

export function StudioPage() {
  const theme = useTheme();
  const isDesktopLayout = useMediaQuery(theme.breakpoints.up("lg"));
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [isControlsDrawerOpen, setIsControlsDrawerOpen] = useState(false);
  const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = useState(true);
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>([]);
  const {
    importedFeatures,
    drawnFeatures,
    allFeatures,
    setImportedFeatures,
    addDrawnFeature,
  } = useFeatureDataset();
  const { sourceUrl, setSourceUrl, status, handleImport } = useGeoJsonImport({
    onImportSuccess: setImportedFeatures,
  });
  const { canExport, handleExport } = useGeoJsonExport(drawnFeatures);
  const {
    query,
    setQuery,
    status: searchStatus,
    searchResult,
    handleSearch,
  } = useLocationSearch({
    onSearchSuccess: () => {
      setViewMode("map");
    },
  });
  const {
    positions,
    canFinish,
    isDrawing,
    enableDrawingMode,
    disableDrawingMode,
    clearDraft,
    addPoint,
    finishDrawing,
  } = useDrawingController({
    onDrawComplete: addDrawnFeature,
  });
  const activeSelectedFeatureIds = useMemo(() => {
    const allFeatureIds = new Set(allFeatures.map((feature) => feature.id));

    return selectedFeatureIds.filter((featureId) =>
      allFeatureIds.has(featureId),
    );
  }, [allFeatures, selectedFeatureIds]);

  const selectedFeatures = useMemo<Feature[]>(
    () =>
      allFeatures.filter((feature) =>
        activeSelectedFeatureIds.includes(feature.id),
      ),
    [activeSelectedFeatureIds, allFeatures],
  );

  const controlsPanel = (
    <StudioControlPanel
      viewModeControl={
        <ViewModeControl viewMode={viewMode} onViewModeChange={setViewMode} />
      }
      searchControl={
        <SearchControl
          query={query}
          status={searchStatus}
          onQueryChange={setQuery}
          onSearch={handleSearch}
        />
      }
      importControl={
        <GeoJsonImportControl
          sourceUrl={sourceUrl}
          status={status}
          onSourceUrlChange={setSourceUrl}
          onImport={handleImport}
        />
      }
      exportControl={
        <GeoJsonExportControl disabled={!canExport} onExport={handleExport} />
      }
    />
  );

  return (
    <AppShell
      header={
        <StudioHeader
          showMobileControlsButton={!isDesktopLayout}
          onOpenControls={() => setIsControlsDrawerOpen(true)}
          isDesktopSidebarVisible={isDesktopSidebarVisible}
          onToggleDesktopSidebar={() =>
            setIsDesktopSidebarVisible((currentValue) => !currentValue)
          }
          isDrawingModeEnabled={isDrawing}
          onToggleDrawingMode={() => {
            if (isDrawing) {
              disableDrawingMode();
              return;
            }

            enableDrawingMode();
            setViewMode("map");
          }}
        />
      }
      content={
        <>
          <StudioControlsDrawer
            open={isControlsDrawerOpen}
            onClose={() => setIsControlsDrawerOpen(false)}
          >
            {controlsPanel}
          </StudioControlsDrawer>

          <Container
            maxWidth={false}
            sx={{
              height: "100%",
              px: { xs: 2, md: 3 },
              py: { xs: 2, md: 3 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "stretch",
                height: "calc(100dvh - 120px)",
                minHeight: 520,
              }}
            >
              {isDesktopLayout && isDesktopSidebarVisible ? (
                <Box
                  sx={{
                    width: 360,
                    flexShrink: 0,
                    height: "100%",
                    overflow: "auto",
                    pr: 0.5,
                  }}
                >
                  {controlsPanel}
                </Box>
              ) : null}

              <Box
                sx={{
                  position: "relative",
                  flex: 1,
                  minWidth: 0,
                  minHeight: 0,
                  transition: "width 180ms ease",
                }}
              >
                <StudioMapPanel
                  importedFeatures={importedFeatures}
                  drawnFeatures={drawnFeatures}
                  selectedFeatures={selectedFeatures}
                  searchResult={searchResult}
                  isDrawingModeEnabled={isDrawing}
                  canFinishDrawing={canFinish}
                  drawingPositions={positions}
                  onMapClick={addPoint}
                  onCancelDrawingDraft={clearDraft}
                  onFinishDrawing={finishDrawing}
                  isVisible={viewMode === "map"}
                />

                {viewMode === "table" ? (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                    }}
                  >
                    <FeatureTableView
                      features={allFeatures}
                      selectedFeatureIds={activeSelectedFeatureIds}
                      onSelectedFeatureIdsChange={setSelectedFeatureIds}
                    />
                  </Box>
                ) : null}
              </Box>
            </Box>
          </Container>
        </>
      }
    />
  );
}
