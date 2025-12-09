import { supabase } from "./supabase";

export type AboutSectionConfig<TData = any> = {
  enabled?: boolean | null;
  data?: TData | null;
};

export type AboutContentJson = {
  // We support two shapes to stay compatible with any existing rows:
  // 1) Flat:   { page, hero, introduction, ... }
  // 2) Nested: { page, data: { hero, introduction, ... } }
  page?: string;
  hero?: AboutSectionConfig;
  introduction?: AboutSectionConfig;
  programs?: AboutSectionConfig;
  governance?: AboutSectionConfig;
  boardDirectors?: AboutSectionConfig;
  boardTrustees?: AboutSectionConfig;
  formation?: AboutSectionConfig;
  data?: {
    hero?: AboutSectionConfig;
    introduction?: AboutSectionConfig;
    programs?: AboutSectionConfig;
    governance?: AboutSectionConfig;
    boardDirectors?: AboutSectionConfig;
    boardTrustees?: AboutSectionConfig;
    formation?: AboutSectionConfig;
    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
};

export type AboutContent = {
  id: number;
  data: AboutContentJson | null;
  created_at?: string | null;
  updated_at?: string | null;

  [key: string]: unknown;
};

const HOME_TABLE = "Home";

export async function getAboutContent(): Promise<AboutContent | null> {
  const { data, error } = await supabase
    .from(HOME_TABLE)
    .select("*")
    // Prefer the new dedicated `page_name` column, but fall back to JSON `data->>page`
    // for backwards compatibility with older rows.
    .or("page_name.eq.about,data->>page.eq.about")
    .single();

  if (error) {
    console.error(
      "[about.service] Failed to fetch About content:",
      error
    );
    return null;
  }

  return (data as AboutContent) ?? null;
}

export async function updateAboutSection(
  sectionKey: string,
  sectionData: AboutSectionConfig
): Promise<{ success: boolean; error?: string; data?: AboutContent }> {
  try {
    console.log("[about.service] updateAboutSection called:", {
      sectionKey,
      sectionData,
    });

    const current = await getAboutContent();

    if (!current) {
      // If no About row yet, create one using the nested { data: { ... } } shape
      const newInner: NonNullable<AboutContentJson["data"]> = {
        [sectionKey]: sectionData,
      };
      const newData: AboutContentJson = {
        page: "about",
        data: newInner,
      };

      const { data: insertData, error: insertError } = await supabase
        .from(HOME_TABLE)
        // Also persist the page identifier in the dedicated column for easier querying.
        .insert({ data: newData, page_name: "about" })
        .select()
        .single();

      if (insertError) {
        console.error(
          "[about.service] Failed to create About row:",
          insertError
        );
        return { success: false, error: insertError.message };
      }

      return { success: true, data: insertData as AboutContent };
    }

    const currentData: AboutContentJson = (current.data ||
      {}) as AboutContentJson;

    // Prefer nested `data` object if it exists; otherwise, fall back to flat model.
    const hasNested = currentData.data && typeof currentData.data === "object";

    let updatedData: AboutContentJson;

    if (hasNested) {
      const inner = currentData.data || {};
      const updatedInner: NonNullable<AboutContentJson["data"]> = {
        ...inner,
        [sectionKey]: sectionData,
      };

      updatedData = {
        ...currentData,
        page: "about",
        data: updatedInner,
      };
    } else {
      updatedData = {
        ...currentData,
        page: "about",
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
        "[about.service] Failed to update About section:",
        updateError
      );
      return { success: false, error: updateError.message };
    }

    return { success: true, data: updateData as AboutContent };
  } catch (error: any) {
    console.error(
      "[about.service] Error updating About section:",
      error
    );
    return { success: false, error: error?.message ?? String(error) };
  }
}

