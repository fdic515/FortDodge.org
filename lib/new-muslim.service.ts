import { supabase } from "./supabase";

export type NewMuslimSectionConfig<TData = any> = {
  enabled?: boolean | null;
  data?: TData | null;
};

export type NewMuslimContentJson = {
  // We support two shapes to stay compatible with any existing rows:
  // 1) Flat:   { page, hero, journeyIntro, ... }
  // 2) Nested: { page, data: { hero, journeyIntro, ... } }
  page?: string;
  hero?: NewMuslimSectionConfig;
  journeyIntro?: NewMuslimSectionConfig;
  foundations?: NewMuslimSectionConfig;
  support?: NewMuslimSectionConfig;
  resources?: NewMuslimSectionConfig;
  explore?: NewMuslimSectionConfig;
  data?: {
    hero?: NewMuslimSectionConfig;
    journeyIntro?: NewMuslimSectionConfig;
    foundations?: NewMuslimSectionConfig;
    support?: NewMuslimSectionConfig;
    resources?: NewMuslimSectionConfig;
    explore?: NewMuslimSectionConfig;
    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
};

export type NewMuslimContent = {
  id: number;
  data: NewMuslimContentJson | null;
  created_at?: string | null;
  updated_at?: string | null;

  [key: string]: unknown;
};

const HOME_TABLE = "Home";

export async function getNewMuslimContent(): Promise<NewMuslimContent | null> {
  const { data, error } = await supabase
    .from(HOME_TABLE)
    .select("*")
    // Prefer the new dedicated `page_name` column, but fall back to JSON `data->>page`
    // for backwards compatibility with older rows.
    .or("page_name.eq.new-muslim,data->>page.eq.new-muslim")
    .single();

  if (error) {
    console.error(
      "[new-muslim.service] Failed to fetch New Muslim content:",
      error
    );
    return null;
  }

  return (data as NewMuslimContent) ?? null;
}

export async function updateNewMuslimSection(
  sectionKey: string,
  sectionData: NewMuslimSectionConfig
): Promise<{ success: boolean; error?: string; data?: NewMuslimContent }> {
  try {
    console.log("[new-muslim.service] updateNewMuslimSection called:", {
      sectionKey,
      sectionData,
    });

    const current = await getNewMuslimContent();

    if (!current) {
      // If no New Muslim row yet, create one using the nested { data: { ... } } shape
      const newInner: NonNullable<NewMuslimContentJson["data"]> = {
        [sectionKey]: sectionData,
      };
      const newData: NewMuslimContentJson = {
        page: "new-muslim",
        data: newInner,
      };

      const { data: insertData, error: insertError } = await supabase
        .from(HOME_TABLE)
        // Also persist the page identifier in the dedicated column for easier querying.
        .insert({ data: newData, page_name: "new-muslim" })
        .select()
        .single();

      if (insertError) {
        console.error(
          "[new-muslim.service] Failed to create New Muslim row:",
          insertError
        );
        return { success: false, error: insertError.message };
      }

      return { success: true, data: insertData as NewMuslimContent };
    }

    const currentData: NewMuslimContentJson = (current.data ||
      {}) as NewMuslimContentJson;

    // Prefer nested `data` object if it exists; otherwise, fall back to flat model.
    const hasNested = currentData.data && typeof currentData.data === "object";

    let updatedData: NewMuslimContentJson;

    if (hasNested) {
      const inner = currentData.data || {};
      const updatedInner: NonNullable<NewMuslimContentJson["data"]> = {
        ...inner,
        [sectionKey]: sectionData,
      };

      updatedData = {
        ...currentData,
        page: "new-muslim",
        data: updatedInner,
      };
    } else {
      updatedData = {
        ...currentData,
        page: "new-muslim",
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
        "[new-muslim.service] Failed to update New Muslim section:",
        updateError
      );
      return { success: false, error: updateError.message };
    }

    return { success: true, data: updateData as NewMuslimContent };
  } catch (error: any) {
    console.error(
      "[new-muslim.service] Error updating New Muslim section:",
      error
    );
    return { success: false, error: error?.message ?? String(error) };
  }
}


