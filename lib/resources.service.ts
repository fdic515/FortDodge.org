import { supabase } from "./supabase";

export type ResourcesSectionConfig<TData = any> = {
  enabled?: boolean | null;
  data?: TData | null;
};

export type ResourcesContentJson = {
  // We support two shapes to stay compatible with any existing rows:
  // 1) Flat:   { page, hero, mainContent, ... }
  // 2) Nested: { page, data: { hero, mainContent, ... } }
  page?: string;
  hero?: ResourcesSectionConfig;
  mainContent?: ResourcesSectionConfig;
  header?: ResourcesSectionConfig;
  requestSpeaker?: ResourcesSectionConfig;
  requestVisit?: ResourcesSectionConfig;
  visitorsGuide?: ResourcesSectionConfig;
  islamicPrayer?: ResourcesSectionConfig;
  islamicSchool?: ResourcesSectionConfig;
  electionsNominations?: ResourcesSectionConfig;
  applyRenewMembership?: ResourcesSectionConfig;
  byLaws?: ResourcesSectionConfig;
  fundraisingPolicy?: ResourcesSectionConfig;
  meetingMinutes?: ResourcesSectionConfig;
  financialAssistance?: ResourcesSectionConfig;
  requestDoorAccess?: ResourcesSectionConfig;
  reserveBasement?: ResourcesSectionConfig;
  data?: {
    hero?: ResourcesSectionConfig;
    mainContent?: ResourcesSectionConfig;
    header?: ResourcesSectionConfig;
    requestSpeaker?: ResourcesSectionConfig;
    requestVisit?: ResourcesSectionConfig;
    visitorsGuide?: ResourcesSectionConfig;
    islamicPrayer?: ResourcesSectionConfig;
    islamicSchool?: ResourcesSectionConfig;
    electionsNominations?: ResourcesSectionConfig;
    applyRenewMembership?: ResourcesSectionConfig;
    byLaws?: ResourcesSectionConfig;
    fundraisingPolicy?: ResourcesSectionConfig;
    meetingMinutes?: ResourcesSectionConfig;
    financialAssistance?: ResourcesSectionConfig;
    requestDoorAccess?: ResourcesSectionConfig;
    reserveBasement?: ResourcesSectionConfig;
    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
};

export type ResourcesContent = {
  id: number;
  data: ResourcesContentJson | null;
  created_at?: string | null;
  updated_at?: string | null;

  [key: string]: unknown;
};

const HOME_TABLE = "Home";

export async function getResourcesContent(): Promise<ResourcesContent | null> {
  const { data, error } = await supabase
    .from(HOME_TABLE)
    .select("*")
    // Prefer the new dedicated `page_name` column, but fall back to JSON `data->>page`
    // for backwards compatibility with older rows.
    .or("page_name.eq.resources,data->>page.eq.resources")
    .single();

  if (error) {
    console.error(
      "[resources.service] Failed to fetch Resources content:",
      error
    );
    return null;
  }

  return (data as ResourcesContent) ?? null;
}

export async function updateResourcesSection(
  sectionKey: string,
  sectionData: ResourcesSectionConfig
): Promise<{ success: boolean; error?: string; data?: ResourcesContent }> {
  try {
    console.log("[resources.service] updateResourcesSection called:", {
      sectionKey,
      sectionData,
    });

    const current = await getResourcesContent();

    if (!current) {
      // If no Resources row yet, create one using the nested { data: { ... } } shape
      const newInner: NonNullable<ResourcesContentJson["data"]> = {
        [sectionKey]: sectionData,
      };
      const newData: ResourcesContentJson = {
        page: "resources",
        data: newInner,
      };

      const { data: insertData, error: insertError } = await supabase
        .from(HOME_TABLE)
        // Also persist the page identifier in the dedicated column for easier querying.
        .insert({ data: newData, page_name: "resources" })
        .select()
        .single();

      if (insertError) {
        console.error(
          "[resources.service] Failed to create Resources row:",
          insertError
        );
        return { success: false, error: insertError.message };
      }

      return { success: true, data: insertData as ResourcesContent };
    }

    const currentData: ResourcesContentJson = (current.data ||
      {}) as ResourcesContentJson;

    // Prefer nested `data` object if it exists; otherwise, fall back to flat model.
    const hasNested = currentData.data && typeof currentData.data === "object";

    let updatedData: ResourcesContentJson;

    if (hasNested) {
      const inner = currentData.data || {};
      const updatedInner: NonNullable<ResourcesContentJson["data"]> = {
        ...inner,
        [sectionKey]: sectionData,
      };

      updatedData = {
        ...currentData,
        page: "resources",
        data: updatedInner,
      };
    } else {
      updatedData = {
        ...currentData,
        page: "resources",
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
        "[resources.service] Failed to update Resources section:",
        updateError
      );
      return { success: false, error: updateError.message };
    }

    return { success: true, data: updateData as ResourcesContent };
  } catch (error: any) {
    console.error(
      "[resources.service] Error updating Resources section:",
      error
    );
    return { success: false, error: error?.message ?? String(error) };
  }
}

