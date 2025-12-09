import { supabase } from "./supabase";

export type VisitorGuideSectionConfig<TData = any> = {
  enabled?: boolean | null;
  data?: TData | null;
};

export type VisitorGuideContentJson = {
  // We support two shapes to stay compatible with any existing rows:
  // 1) Flat:   { page, hero, content, ... }
  // 2) Nested: { page, data: { hero, content, ... } }
  page?: string;
  hero?: VisitorGuideSectionConfig;
  intro?: VisitorGuideSectionConfig;
  dressCode?: VisitorGuideSectionConfig;
  enteringCenter?: VisitorGuideSectionConfig;
  multipurposeRoom?: VisitorGuideSectionConfig;
  prayerHall?: VisitorGuideSectionConfig;
  closing?: VisitorGuideSectionConfig;
  data?: {
    hero?: VisitorGuideSectionConfig;
    intro?: VisitorGuideSectionConfig;
    dressCode?: VisitorGuideSectionConfig;
    enteringCenter?: VisitorGuideSectionConfig;
    multipurposeRoom?: VisitorGuideSectionConfig;
    prayerHall?: VisitorGuideSectionConfig;
    closing?: VisitorGuideSectionConfig;
    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
};

export type VisitorGuideContent = {
  id: number;
  data: VisitorGuideContentJson | null;
  created_at?: string | null;
  updated_at?: string | null;

  [key: string]: unknown;
};

const HOME_TABLE = "Home";

export async function getVisitorGuideContent(): Promise<VisitorGuideContent | null> {
  const { data, error } = await supabase
    .from(HOME_TABLE)
    .select("*")
    // Prefer the new dedicated `page_name` column, but fall back to JSON `data->>page`
    // for backwards compatibility with older rows.
    .or("page_name.eq.visitor-guide,data->>page.eq.visitor-guide")
    .single();

  if (error) {
    console.error(
      "[visitor-guide.service] Failed to fetch Visitor Guide content:",
      error
    );
    return null;
  }

  return (data as VisitorGuideContent) ?? null;
}

export async function updateVisitorGuideSection(
  sectionKey: string,
  sectionData: VisitorGuideSectionConfig
): Promise<{ success: boolean; error?: string; data?: VisitorGuideContent }> {
  try {
    console.log("[visitor-guide.service] updateVisitorGuideSection called:", {
      sectionKey,
      sectionData,
    });

    const current = await getVisitorGuideContent();

    if (!current) {
      // If no Visitor Guide row yet, create one using the nested { data: { ... } } shape
      const newInner: NonNullable<VisitorGuideContentJson["data"]> = {
        [sectionKey]: sectionData,
      };
      const newData: VisitorGuideContentJson = {
        page: "visitor-guide",
        data: newInner,
      };

      const { data: insertData, error: insertError } = await supabase
        .from(HOME_TABLE)
        // Also persist the page identifier in the dedicated column for easier querying.
        .insert({ data: newData, page_name: "visitor-guide" })
        .select()
        .single();

      if (insertError) {
        console.error(
          "[visitor-guide.service] Failed to create Visitor Guide row:",
          insertError
        );
        return { success: false, error: insertError.message };
      }

      return { success: true, data: insertData as VisitorGuideContent };
    }

    const currentData: VisitorGuideContentJson = (current.data ||
      {}) as VisitorGuideContentJson;

    // Prefer nested `data` object if it exists; otherwise, fall back to flat model.
    const hasNested = currentData.data && typeof currentData.data === "object";

    let updatedData: VisitorGuideContentJson;

    if (hasNested) {
      const inner = currentData.data || {};
      const updatedInner: NonNullable<VisitorGuideContentJson["data"]> = {
        ...inner,
        [sectionKey]: sectionData,
      };

      updatedData = {
        ...currentData,
        page: "visitor-guide",
        data: updatedInner,
      };
    } else {
      updatedData = {
        ...currentData,
        page: "visitor-guide",
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
        "[visitor-guide.service] Failed to update Visitor Guide section:",
        updateError
      );
      return { success: false, error: updateError.message };
    }

    return { success: true, data: updateData as VisitorGuideContent };
  } catch (error: any) {
    console.error(
      "[visitor-guide.service] Error updating Visitor Guide section:",
      error
    );
    return { success: false, error: error?.message ?? String(error) };
  }
}

