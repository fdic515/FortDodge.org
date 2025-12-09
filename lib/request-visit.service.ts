import { supabase } from "./supabase";

export type RequestVisitSectionConfig<TData = any> = {
  enabled?: boolean | null;
  data?: TData | null;
};

export type RequestVisitContentJson = {
  // We support two shapes to stay compatible with any existing rows:
  // 1) Flat:   { page, hero, content, ... }
  // 2) Nested: { page, data: { hero, content, ... } }
  page?: string;
  hero?: RequestVisitSectionConfig;
  content?: RequestVisitSectionConfig;
  data?: {
    hero?: RequestVisitSectionConfig;
    content?: RequestVisitSectionConfig;
    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
};

export type RequestVisitContent = {
  id: number;
  data: RequestVisitContentJson | null;
  created_at?: string | null;
  updated_at?: string | null;

  [key: string]: unknown;
};

const HOME_TABLE = "Home";

export async function getRequestVisitContent(): Promise<RequestVisitContent | null> {
  const { data, error } = await supabase
    .from(HOME_TABLE)
    .select("*")
    // Prefer the new dedicated `page_name` column, but fall back to JSON `data->>page`
    // for backwards compatibility with older rows.
    .or("page_name.eq.request-a-visit,data->>page.eq.request-a-visit")
    .single();

  if (error) {
    console.error(
      "[request-visit.service] Failed to fetch Request Visit content:",
      error
    );
    return null;
  }

  return (data as RequestVisitContent) ?? null;
}

export async function updateRequestVisitSection(
  sectionKey: string,
  sectionData: RequestVisitSectionConfig
): Promise<{ success: boolean; error?: string; data?: RequestVisitContent }> {
  try {
    console.log("[request-visit.service] updateRequestVisitSection called:", {
      sectionKey,
      sectionData,
    });

    const current = await getRequestVisitContent();

    if (!current) {
      // If no Request Visit row yet, create one using the nested { data: { ... } } shape
      const newInner: NonNullable<RequestVisitContentJson["data"]> = {
        [sectionKey]: sectionData,
      };
      const newData: RequestVisitContentJson = {
        page: "request-a-visit",
        data: newInner,
      };

      const { data: insertData, error: insertError } = await supabase
        .from(HOME_TABLE)
        // Also persist the page identifier in the dedicated column for easier querying.
        .insert({ data: newData, page_name: "request-a-visit" })
        .select()
        .single();

      if (insertError) {
        console.error(
          "[request-visit.service] Failed to create Request Visit row:",
          insertError
        );
        return { success: false, error: insertError.message };
      }

      return { success: true, data: insertData as RequestVisitContent };
    }

    const currentData: RequestVisitContentJson = (current.data ||
      {}) as RequestVisitContentJson;

    // Prefer nested `data` object if it exists; otherwise, fall back to flat model.
    const hasNested = currentData.data && typeof currentData.data === "object";

    let updatedData: RequestVisitContentJson;

    if (hasNested) {
      const inner = currentData.data || {};
      const updatedInner: NonNullable<RequestVisitContentJson["data"]> = {
        ...inner,
        [sectionKey]: sectionData,
      };

      updatedData = {
        ...currentData,
        page: "request-a-visit",
        data: updatedInner,
      };
    } else {
      updatedData = {
        ...currentData,
        page: "request-a-visit",
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
        "[request-visit.service] Failed to update Request Visit section:",
        updateError
      );
      return { success: false, error: updateError.message };
    }

    return { success: true, data: updateData as RequestVisitContent };
  } catch (error: any) {
    console.error(
      "[request-visit.service] Error updating Request Visit section:",
      error
    );
    return { success: false, error: error?.message ?? String(error) };
  }
}

