import { supabase } from "./supabase";

export type IslamicSchoolSectionConfig<TData = any> = {
  enabled?: boolean | null;
  data?: TData | null;
};

export type IslamicSchoolContentJson = {
  // We support two shapes to stay compatible with any existing rows:
  // 1) Flat:   { page, hero, intro, ... }
  // 2) Nested: { page, data: { hero, intro, ... } }
  page?: string;
  hero?: IslamicSchoolSectionConfig;
  intro?: IslamicSchoolSectionConfig;
  vision?: IslamicSchoolSectionConfig;
  mission?: IslamicSchoolSectionConfig;
  principal?: IslamicSchoolSectionConfig;
  administration?: IslamicSchoolSectionConfig;
  data?: {
    hero?: IslamicSchoolSectionConfig;
    intro?: IslamicSchoolSectionConfig;
    vision?: IslamicSchoolSectionConfig;
    mission?: IslamicSchoolSectionConfig;
    principal?: IslamicSchoolSectionConfig;
    administration?: IslamicSchoolSectionConfig;
    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
};

export type IslamicSchoolContent = {
  id: number;
  data: IslamicSchoolContentJson | null;
  created_at?: string | null;
  updated_at?: string | null;

  [key: string]: unknown;
};

const HOME_TABLE = "Home";

export async function getIslamicSchoolContent(): Promise<IslamicSchoolContent | null> {
  const { data, error } = await supabase
    .from(HOME_TABLE)
    .select("*")
    // Prefer the new dedicated `page_name` column, but fall back to JSON `data->>page`
    // for backwards compatibility with older rows.
    .or("page_name.eq.islamic-school,data->>page.eq.islamic-school")
    .single();

  if (error) {
    console.error(
      "[islamic-school.service] Failed to fetch Islamic School content:",
      error
    );
    return null;
  }

  return (data as IslamicSchoolContent) ?? null;
}

export async function updateIslamicSchoolSection(
  sectionKey: string,
  sectionData: IslamicSchoolSectionConfig
): Promise<{ success: boolean; error?: string; data?: IslamicSchoolContent }> {
  try {
    console.log("[islamic-school.service] updateIslamicSchoolSection called:", {
      sectionKey,
      sectionData,
    });

    const current = await getIslamicSchoolContent();

    if (!current) {
      // If no Islamic School row yet, create one using the nested { data: { ... } } shape
      const newInner: NonNullable<IslamicSchoolContentJson["data"]> = {
        [sectionKey]: sectionData,
      };
      const newData: IslamicSchoolContentJson = {
        page: "islamic-school",
        data: newInner,
      };

      const { data: insertData, error: insertError } = await supabase
        .from(HOME_TABLE)
        // Also persist the page identifier in the dedicated column for easier querying.
        .insert({ data: newData, page_name: "islamic-school" })
        .select()
        .single();

      if (insertError) {
        console.error(
          "[islamic-school.service] Failed to create Islamic School row:",
          insertError
        );
        return { success: false, error: insertError.message };
      }

      return { success: true, data: insertData as IslamicSchoolContent };
    }

    const currentData: IslamicSchoolContentJson = (current.data ||
      {}) as IslamicSchoolContentJson;

    // Prefer nested `data` object if it exists; otherwise, fall back to flat model.
    const hasNested = currentData.data && typeof currentData.data === "object";

    let updatedData: IslamicSchoolContentJson;

    if (hasNested) {
      const inner = currentData.data || {};
      const updatedInner: NonNullable<IslamicSchoolContentJson["data"]> = {
        ...inner,
        [sectionKey]: sectionData,
      };

      updatedData = {
        ...currentData,
        page: "islamic-school",
        data: updatedInner,
      };
    } else {
      updatedData = {
        ...currentData,
        page: "islamic-school",
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
        "[islamic-school.service] Failed to update Islamic School section:",
        updateError
      );
      return { success: false, error: updateError.message };
    }

    return { success: true, data: updateData as IslamicSchoolContent };
  } catch (error: any) {
    console.error(
      "[islamic-school.service] Error updating Islamic School section:",
      error
    );
    return { success: false, error: error?.message ?? String(error) };
  }
}

