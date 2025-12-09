import { supabase } from "./supabase";

export type RamadanSectionConfig<TData = any> = {
  enabled?: boolean | null;
  data?: TData | null;
};

export type RamadanContentJson = {
  // We support two shapes to stay compatible with existing rows:
  // 1) Flat:   { page, hero, daily_lessons, ... }
  // 2) Nested: { page, data: { hero, daily_lessons, ... } }
  page?: string;
  heroSection?: RamadanSectionConfig;
  hero?: RamadanSectionConfig;
  daily_lessons?: RamadanSectionConfig;
  zakat_ul_fitr?: RamadanSectionConfig;
  community_iftars?: RamadanSectionConfig;
  data?: {
    heroSection?: RamadanSectionConfig;
    hero?: RamadanSectionConfig;
    daily_lessons?: RamadanSectionConfig;
    zakat_ul_fitr?: RamadanSectionConfig;
    community_iftars?: RamadanSectionConfig;
    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
};

export type RamadanContent = {
  id: number;
  data: RamadanContentJson | null;
  created_at?: string | null;
  updated_at?: string | null;

  [key: string]: unknown;
};

const HOME_TABLE = "Home";

export async function getRamadanContent(): Promise<RamadanContent | null> {
  const { data, error } = await supabase
    .from(HOME_TABLE)
    .select("*")
    // Prefer the new dedicated `page_name` column, but fall back to JSON `data->>page`
    // for backwards compatibility with older rows.
    .or("page_name.eq.ramadan,data->>page.eq.ramadan")
    .single();

  if (error) {
    console.error("[ramadan.service] Failed to fetch Ramadan content:", error);
    return null;
  }

  return (data as RamadanContent) ?? null;
}

export async function updateRamadanSection(
  sectionKey: string,
  sectionData: RamadanSectionConfig
): Promise<{ success: boolean; error?: string; data?: RamadanContent }> {
  try {
    console.log("[ramadan.service] updateRamadanSection called:", {
      sectionKey,
      sectionData,
    });

    const current = await getRamadanContent();

    if (!current) {
      // If no Ramadan row yet, create one using the nested { data: { ... } } shape
      const newInner: NonNullable<RamadanContentJson["data"]> = {
        [sectionKey]: sectionData,
      };
      const newData: RamadanContentJson = {
        page: "ramadan",
        data: newInner,
      };

      const { data: insertData, error: insertError } = await supabase
        .from(HOME_TABLE)
        // Also persist the page identifier in the dedicated column for easier querying.
        .insert({ data: newData, page_name: "ramadan" })
        .select()
        .single();

      if (insertError) {
        console.error(
          "[ramadan.service] Failed to create Ramadan row:",
          insertError
        );
        return { success: false, error: insertError.message };
      }

      return { success: true, data: insertData as RamadanContent };
    }

    const currentData: RamadanContentJson = (current.data || {}) as RamadanContentJson;

    // Prefer nested `data` object if it exists; otherwise, fall back to flat model.
    const hasNested =
      currentData.data && typeof currentData.data === "object";

    let updatedData: RamadanContentJson;

    if (hasNested) {
      const inner = currentData.data || {};
      
      // Remove the opposite hero key to avoid duplicate paths
      // If saving heroSection, remove hero. If saving hero, remove heroSection.
      let cleanedInner: any = { ...inner };
      if (sectionKey === "heroSection") {
        const { hero, ...rest } = cleanedInner;
        cleanedInner = rest;
      } else if (sectionKey === "hero") {
        const { heroSection, ...rest } = cleanedInner;
        cleanedInner = rest;
      }
      
      const updatedInner: NonNullable<RamadanContentJson["data"]> = {
        ...cleanedInner,
        [sectionKey]: sectionData,
      };

      updatedData = {
        ...currentData,
        page: "ramadan",
        data: updatedInner,
      };
    } else {
      // Remove the opposite hero key to avoid duplicate paths
      let cleanedData: any = { ...currentData };
      if (sectionKey === "heroSection") {
        const { hero, ...rest } = cleanedData;
        cleanedData = rest;
      } else if (sectionKey === "hero") {
        const { heroSection, ...rest } = cleanedData;
        cleanedData = rest;
      }
      
      updatedData = {
        ...cleanedData,
        page: "ramadan",
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
        "[ramadan.service] Failed to update Ramadan section:",
        updateError
      );
      return { success: false, error: updateError.message };
    }

    return { success: true, data: updateData as RamadanContent };
  } catch (error: any) {
    console.error("[ramadan.service] Error updating Ramadan section:", error);
    return { success: false, error: error?.message ?? String(error) };
  }
}

