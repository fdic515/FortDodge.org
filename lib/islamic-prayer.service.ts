import { supabase } from "./supabase";

export type IslamicPrayerSectionConfig<TData = any> = {
  enabled?: boolean | null;
  data?: TData | null;
};

export type IslamicPrayerContentJson = {
  // We support two shapes to stay compatible with any existing rows:
  // 1) Flat:   { page, hero, intro, ... }
  // 2) Nested: { page, data: { hero, intro, ... } }
  page?: string;
  hero?: IslamicPrayerSectionConfig;
  intro?: IslamicPrayerSectionConfig;
  standing?: IslamicPrayerSectionConfig;
  bowing?: IslamicPrayerSectionConfig;
  prostrating?: IslamicPrayerSectionConfig;
  sitting?: IslamicPrayerSectionConfig;
  data?: {
    hero?: IslamicPrayerSectionConfig;
    intro?: IslamicPrayerSectionConfig;
    standing?: IslamicPrayerSectionConfig;
    bowing?: IslamicPrayerSectionConfig;
    prostrating?: IslamicPrayerSectionConfig;
    sitting?: IslamicPrayerSectionConfig;
    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
};

export type IslamicPrayerContent = {
  id: number;
  data: IslamicPrayerContentJson | null;
  created_at?: string | null;
  updated_at?: string | null;

  [key: string]: unknown;
};

const HOME_TABLE = "Home";

export async function getIslamicPrayerContent(): Promise<IslamicPrayerContent | null> {
  const { data, error } = await supabase
    .from(HOME_TABLE)
    .select("*")
    // Prefer the new dedicated `page_name` column, but fall back to JSON `data->>page`
    // for backwards compatibility with older rows.
    .or("page_name.eq.islamic-prayer,data->>page.eq.islamic-prayer")
    .single();

  if (error) {
    console.error(
      "[islamic-prayer.service] Failed to fetch Islamic Prayer content:",
      error
    );
    return null;
  }

  return (data as IslamicPrayerContent) ?? null;
}

export async function updateIslamicPrayerSection(
  sectionKey: string,
  sectionData: IslamicPrayerSectionConfig
): Promise<{ success: boolean; error?: string; data?: IslamicPrayerContent }> {
  try {
    console.log("[islamic-prayer.service] updateIslamicPrayerSection called:", {
      sectionKey,
      sectionData,
    });

    const current = await getIslamicPrayerContent();

    if (!current) {
      // If no Islamic Prayer row yet, create one using the nested { data: { ... } } shape
      const newInner: NonNullable<IslamicPrayerContentJson["data"]> = {
        [sectionKey]: sectionData,
      };
      const newData: IslamicPrayerContentJson = {
        page: "islamic-prayer",
        data: newInner,
      };

      const { data: insertData, error: insertError } = await supabase
        .from(HOME_TABLE)
        // Also persist the page identifier in the dedicated column for easier querying.
        .insert({ data: newData, page_name: "islamic-prayer" })
        .select()
        .single();

      if (insertError) {
        console.error(
          "[islamic-prayer.service] Failed to create Islamic Prayer row:",
          insertError
        );
        return { success: false, error: insertError.message };
      }

      return { success: true, data: insertData as IslamicPrayerContent };
    }

    const currentData: IslamicPrayerContentJson = (current.data ||
      {}) as IslamicPrayerContentJson;

    // Prefer nested `data` object if it exists; otherwise, fall back to flat model.
    const hasNested = currentData.data && typeof currentData.data === "object";

    let updatedData: IslamicPrayerContentJson;

    if (hasNested) {
      const inner = currentData.data || {};
      const updatedInner: NonNullable<IslamicPrayerContentJson["data"]> = {
        ...inner,
        [sectionKey]: sectionData,
      };

      updatedData = {
        ...currentData,
        page: "islamic-prayer",
        data: updatedInner,
      };
    } else {
      updatedData = {
        ...currentData,
        page: "islamic-prayer",
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
        "[islamic-prayer.service] Failed to update Islamic Prayer section:",
        updateError
      );
      return { success: false, error: updateError.message };
    }

    return { success: true, data: updateData as IslamicPrayerContent };
  } catch (error: any) {
    console.error(
      "[islamic-prayer.service] Error updating Islamic Prayer section:",
      error
    );
    return { success: false, error: error?.message ?? String(error) };
  }
}

