import { supabase } from "./supabase";

export type RequestSpeakerSectionConfig<TData = any> = {
  enabled?: boolean | null;
  data?: TData | null;
};

export type RequestSpeakerContentJson = {
  // We support two shapes to stay compatible with any existing rows:
  // 1) Flat:   { page, hero, content, ... }
  // 2) Nested: { page, data: { hero, content, ... } }
  page?: string;
  hero?: RequestSpeakerSectionConfig;
  content?: RequestSpeakerSectionConfig;
  data?: {
    hero?: RequestSpeakerSectionConfig;
    content?: RequestSpeakerSectionConfig;
    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
};

export type RequestSpeakerContent = {
  id: number;
  data: RequestSpeakerContentJson | null;
  created_at?: string | null;
  updated_at?: string | null;

  [key: string]: unknown;
};

const HOME_TABLE = "Home";

export async function getRequestSpeakerContent(): Promise<RequestSpeakerContent | null> {
  const { data, error } = await supabase
    .from(HOME_TABLE)
    .select("*")
    // Prefer the new dedicated `page_name` column, but fall back to JSON `data->>page`
    // for backwards compatibility with older rows.
    .or("page_name.eq.request-a-speaker,data->>page.eq.request-a-speaker")
    .single();

  if (error) {
    console.error(
      "[request-speaker.service] Failed to fetch Request Speaker content:",
      error
    );
    return null;
  }

  return (data as RequestSpeakerContent) ?? null;
}

export async function updateRequestSpeakerSection(
  sectionKey: string,
  sectionData: RequestSpeakerSectionConfig
): Promise<{ success: boolean; error?: string; data?: RequestSpeakerContent }> {
  try {
    console.log("[request-speaker.service] updateRequestSpeakerSection called:", {
      sectionKey,
      sectionData,
    });

    const current = await getRequestSpeakerContent();

    if (!current) {
      // If no Request Speaker row yet, create one using the nested { data: { ... } } shape
      const newInner: NonNullable<RequestSpeakerContentJson["data"]> = {
        [sectionKey]: sectionData,
      };
      const newData: RequestSpeakerContentJson = {
        page: "request-a-speaker",
        data: newInner,
      };

      const { data: insertData, error: insertError } = await supabase
        .from(HOME_TABLE)
        // Also persist the page identifier in the dedicated column for easier querying.
        .insert({ data: newData, page_name: "request-a-speaker" })
        .select()
        .single();

      if (insertError) {
        console.error(
          "[request-speaker.service] Failed to create Request Speaker row:",
          insertError
        );
        return { success: false, error: insertError.message };
      }

      return { success: true, data: insertData as RequestSpeakerContent };
    }

    const currentData: RequestSpeakerContentJson = (current.data ||
      {}) as RequestSpeakerContentJson;

    // Prefer nested `data` object if it exists; otherwise, fall back to flat model.
    const hasNested = currentData.data && typeof currentData.data === "object";

    let updatedData: RequestSpeakerContentJson;

    if (hasNested) {
      const inner = currentData.data || {};
      const updatedInner: NonNullable<RequestSpeakerContentJson["data"]> = {
        ...inner,
        [sectionKey]: sectionData,
      };

      updatedData = {
        ...currentData,
        page: "request-a-speaker",
        data: updatedInner,
      };
    } else {
      updatedData = {
        ...currentData,
        page: "request-a-speaker",
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
        "[request-speaker.service] Failed to update Request Speaker section:",
        updateError
      );
      return { success: false, error: updateError.message };
    }

    return { success: true, data: updateData as RequestSpeakerContent };
  } catch (error: any) {
    console.error(
      "[request-speaker.service] Error updating Request Speaker section:",
      error
    );
    return { success: false, error: error?.message ?? String(error) };
  }
}

