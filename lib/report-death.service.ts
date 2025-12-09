import { supabase } from "./supabase";

export type ReportDeathSectionConfig<TData = any> = {
  enabled?: boolean | null;
  data?: TData | null;
};

export type ReportDeathContentJson = {
  // We support two shapes to stay compatible with other pages:
  // 1) Flat:   { page, hero, intro, ... }
  // 2) Nested: { page, data: { hero, intro, ... } }
  page?: string;
  hero?: ReportDeathSectionConfig;
  intro?: ReportDeathSectionConfig;
  guidance?: ReportDeathSectionConfig;
  procedure?: ReportDeathSectionConfig;
  costBreakdown?: ReportDeathSectionConfig;
  data?: {
    hero?: ReportDeathSectionConfig;
    intro?: ReportDeathSectionConfig;
    guidance?: ReportDeathSectionConfig;
    procedure?: ReportDeathSectionConfig;
    costBreakdown?: ReportDeathSectionConfig;
    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
};

export type ReportDeathContent = {
  id: number;
  data: ReportDeathContentJson | null;
  created_at?: string | null;
  updated_at?: string | null;

  [key: string]: unknown;
};

const HOME_TABLE = "Home";

export async function getReportDeathContent(): Promise<ReportDeathContent | null> {
  const { data, error } = await supabase
    .from(HOME_TABLE)
    .select("*")
    // Support both styles:
    // - New pattern:   data.page = "report-death"
    // - Legacy row:    page_name = "report-death" (even if data.page missing)
    .or("data->>page.eq.report-death,page_name.eq.report-death")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  // When no row exists, `maybeSingle` returns `data = null` and `error = null`,
  // which we treat as "no content yet" without logging an error.
  if (error) {
    console.error("[report-death.service] Failed to fetch Report a Death content:", error);
    return null;
  }

  return (data as ReportDeathContent) ?? null;
}

export async function updateReportDeathSection(
  sectionKey: string,
  sectionData: ReportDeathSectionConfig
): Promise<{ success: boolean; error?: string; data?: ReportDeathContent }> {
  try {
    console.log("[report-death.service] updateReportDeathSection called:", {
      sectionKey,
      sectionData,
    });

    const current = await getReportDeathContent();

    if (!current) {
      // If no Report a Death row yet, create one using the nested { data: { ... } } shape
      const newInner: NonNullable<ReportDeathContentJson["data"]> = {
        [sectionKey]: sectionData,
      };
      const newData: ReportDeathContentJson = {
        page: "report-death",
        data: newInner,
      };

      const { data: insertData, error: insertError } = await supabase
        .from(HOME_TABLE)
        .insert({ data: newData, page_name: "report-death" })
        .select()
        .single();

      if (insertError) {
        console.error(
          "[report-death.service] Failed to create Report a Death row:",
          insertError
        );
        return { success: false, error: insertError.message };
      }

      return { success: true, data: insertData as ReportDeathContent };
    }

    const currentData: ReportDeathContentJson = (current.data ||
      {}) as ReportDeathContentJson;

    // Prefer nested `data` object if it exists; otherwise, fall back to flat model.
    const hasNested =
      currentData.data && typeof currentData.data === "object";

    let updatedData: ReportDeathContentJson;

    if (hasNested) {
      const inner = currentData.data || {};
      const updatedInner: NonNullable<ReportDeathContentJson["data"]> = {
        ...inner,
        [sectionKey]: sectionData,
      };

      updatedData = {
        ...currentData,
        page: "report-death",
        data: updatedInner,
      };
    } else {
      updatedData = {
        ...currentData,
        page: "report-death",
        [sectionKey]: sectionData,
      };
    }

    const { data: updateData, error: updateError } = await supabase
      .from(HOME_TABLE)
      .update({
        data: updatedData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", current.id)
      .select()
      .single();

    if (updateError) {
      console.error(
        "[report-death.service] Failed to update Report a Death section:",
        updateError
      );
      return { success: false, error: updateError.message };
    }

    return { success: true, data: updateData as ReportDeathContent };
  } catch (error: any) {
    console.error(
      "[report-death.service] Error updating Report a Death section:",
      error
    );
    return { success: false, error: error?.message ?? String(error) };
  }
}



