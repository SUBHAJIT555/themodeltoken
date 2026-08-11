"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import {
  CONTEXT_STOPS,
  modelsCatalog,
  type ModelItem,
} from "@/data/models";
import { ModelCard } from "@/components/models/ModelCard";
import { ModelDetailsDrawer } from "@/components/models/ModelDetailsDrawer";
import {
  ModelsFilters,
  type ModelsFilterState,
} from "@/components/models/ModelsFilters";
import "@/components/models/models.css";

const emptySubscribe = () => () => {};

const PAGE_SIZE = 12;

const initialFilters: ModelsFilterState = {
  inputs: [],
  outputs: [],
  providers: [],
  contextIndex: 0,
  search: "",
};

function filterModels(models: ModelItem[], filters: ModelsFilterState) {
  const q = filters.search.trim().toLowerCase();
  const minContext = CONTEXT_STOPS[filters.contextIndex]?.tokens ?? 0;

  return models.filter((model) => {
    if (filters.inputs.length) {
      if (!filters.inputs.every((m) => model.inputTypes.includes(m))) {
        return false;
      }
    }
    if (filters.outputs.length) {
      if (!filters.outputs.every((m) => model.outputTypes.includes(m))) {
        return false;
      }
    }
    if (filters.providers.length) {
      if (!filters.providers.includes(model.provider)) return false;
    }
    if (filters.contextIndex > 0) {
      if (model.contextTokens < minContext) return false;
    }
    if (q) {
      const hay = [
        model.name,
        model.provider,
        model.description,
        ...model.capabilities,
      ]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function countActiveFilters(filters: ModelsFilterState) {
  let n = filters.inputs.length + filters.outputs.length + filters.providers.length;
  if (filters.contextIndex > 0) n += 1;
  return n;
}

export function ModelsExplorer() {
  const [filters, setFilters] = useState<ModelsFilterState>(initialFilters);
  const [pages, setPages] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelItem | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const filterKey = JSON.stringify(filters);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const filtered = useMemo(
    () => filterModels(modelsCatalog, filters),
    [filters],
  );

  const visibleCount = pages * PAGE_SIZE;
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const activeFilterCount = countActiveFilters(filters);

  const updateFilters = (next: ModelsFilterState) => {
    setFilters(next);
    setPages(1);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setPages(1);
  };

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || loadingMore) return;
        setLoadingMore(true);
        window.setTimeout(() => {
          setPages((n) => n + 1);
          setLoadingMore(false);
        }, 280);
      },
      { root: listRef.current, rootMargin: "160px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [filterKey, filtered.length, hasMore, loadingMore, visible.length]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("th-models-filters-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("th-models-filters-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  // Close sheet if viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="th-models-root">
      <div className="th-models-inner">
        <div className="th-models-layout">
          <aside className="th-models-sidebar-wrap hidden lg:block">
            <ModelsFilters
              value={filters}
              onChange={updateFilters}
              onReset={resetFilters}
              modelCount={filtered.length}
            />
          </aside>

          <div className="th-models-content">
            <div className="th-models-toolbar">
              <div className="th-models-search">
                <Search className="size-4 shrink-0 text-black/35" aria-hidden />
                <input
                  value={filters.search}
                  onChange={(e) =>
                    updateFilters({ ...filters, search: e.target.value })
                  }
                  placeholder="Search"
                  className="min-w-0 flex-1 border-none bg-transparent text-sm text-black outline-none placeholder:text-black/35"
                />
              </div>
              <button
                type="button"
                className="th-models-filter-btn lg:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <SlidersHorizontal className="size-4" />
                <span className="th-models-filter-btn-label">Filters</span>
                {activeFilterCount > 0 ? (
                  <span className="th-models-filter-badge">
                    {activeFilterCount}
                  </span>
                ) : null}
              </button>
              <button
                type="button"
                aria-label="Reset search and filters"
                title="Reset"
                onClick={resetFilters}
                className="th-models-reset-btn"
              >
                <RotateCcw className="size-4" />
              </button>
            </div>

            <div ref={listRef} className="th-models-cardlist">
              <div className="flex flex-col gap-3 sm:gap-4">
                {visible.map((model) => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    selected={selectedModel?.id === model.id}
                    onSelect={() => setSelectedModel(model)}
                  />
                ))}
              </div>

              {!filtered.length ? (
                <p className="py-10 text-center text-[13px] text-black/40">
                  No models match the current filters.
                </p>
              ) : null}

              {hasMore || loadingMore ? (
                <div
                  ref={sentinelRef}
                  className="py-4 text-center text-[13px] text-black/30"
                >
                  Loading…
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {mounted && mobileOpen
        ? createPortal(
            <div className="th-models-mobile-sheet">
              <div className="th-models-mobile-sheet-panel">
                <ModelsFilters
                  value={filters}
                  onChange={updateFilters}
                  onReset={resetFilters}
                  modelCount={filtered.length}
                  mobile
                  onCloseMobile={() => setMobileOpen(false)}
                />
              </div>
              <button
                type="button"
                aria-label="Close filter overlay"
                className="min-w-0 flex-1"
                onClick={() => setMobileOpen(false)}
              />
            </div>,
            document.body,
          )
        : null}

      <ModelDetailsDrawer
        model={selectedModel}
        open={!!selectedModel}
        onClose={() => setSelectedModel(null)}
      />
    </div>
  );
}
