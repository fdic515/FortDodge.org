import { supabase } from "./supabase";

export type ElectionNominationSectionConfig<TData = any> = {
  enabled?: boolean | null;
  data?: TData | null;
};

export type ElectionNominationContentJson = {
  // We support two shapes to stay compatible with any existing rows:
  // 1) Flat:   { page, hero, election, ... }
  // 2) Nested: { page, data: { hero, election, ... } }
  page?: string;
  hero?: ElectionNominationSectionConfig;
  election?: ElectionNominationSectionConfig;
  membership?: ElectionNominationSectionConfig;
  questions?: ElectionNominationSectionConfig;
  data?: {
    hero?: ElectionNominationSectionConfig;
    election?: ElectionNominationSectionConfig;
    membership?: ElectionNominationSectionConfig;
    questions?: ElectionNominationSectionConfig;
    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
};

export type ElectionNominationContent = {
  id: number;
  data: ElectionNominationContentJson | null;
  created_at?: string | null;
  updated_at?: string | null;

  [key: string]: unknown;
};

const HOME_TABLE = "Home";

export async function getElectionNominationContent(): Promise<ElectionNominationContent | null> {
  const { data, error } = await supabase
    .from(HOME_TABLE)
    .select("*")
    // Prefer the new dedicated `page_name` column, but fall back to JSON `data->>page`
    // for backwards compatibility with older rows.
    .or("page_name.eq.election-nomination,data->>page.eq.election-nomination")
    .single();

  if (error) {
    console.error(
      "[election-nomination.service] Failed to fetch Election Nomination content:",
      error
    );
    return null;
  }

  return (data as ElectionNominationContent) ?? null;
}

export async function updateElectionNominationSection(
  sectionKey: string,
  sectionData: ElectionNominationSectionConfig
): Promise<{ success: boolean; error?: string; data?: ElectionNominationContent }> {
  try {
    console.log("[election-nomination.service] updateElectionNominationSection called:", {
      sectionKey,
      sectionData,
    });

    const current = await getElectionNominationContent();

    if (!current) {
      // If no Election Nomination row yet, create one using the nested { data: { ... } } shape
      const newInner: NonNullable<ElectionNominationContentJson["data"]> = {
        [sectionKey]: sectionData,
      };
      const newData: ElectionNominationContentJson = {
        page: "election-nomination",
        data: newInner,
      };

      const { data: insertData, error: insertError } = await supabase
        .from(HOME_TABLE)
        // Also persist the page identifier in the dedicated column for easier querying.
        .insert({ data: newData, page_name: "election-nomination" })
        .select()
        .single();

      if (insertError) {
        console.error(
          "[election-nomination.service] Failed to create Election Nomination row:",
          insertError
        );
        return { success: false, error: insertError.message };
      }

      return { success: true, data: insertData as ElectionNominationContent };
    }

    const currentData: ElectionNominationContentJson = (current.data ||
      {}) as ElectionNominationContentJson;

    // Prefer nested `data` object if it exists; otherwise, fall back to flat model.
    const hasNested = currentData.data && typeof currentData.data === "object";

    let updatedData: ElectionNominationContentJson;

    if (hasNested) {
      const inner = currentData.data || {};
      const updatedInner: NonNullable<ElectionNominationContentJson["data"]> = {
        ...inner,
        [sectionKey]: sectionData,
      };

      updatedData = {
        ...currentData,
        page: "election-nomination",
        data: updatedInner,
      };
    } else {
      updatedData = {
        ...currentData,
        page: "election-nomination",
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
        "[election-nomination.service] Failed to update Election Nomination section:",
        updateError
      );
      return { success: false, error: updateError.message };
    }

    return { success: true, data: updateData as ElectionNominationContent };
  } catch (error: any) {
    console.error(
      "[election-nomination.service] Error updating Election Nomination section:",
      error
    );
    return { success: false, error: error?.message ?? String(error) };
  }
}

