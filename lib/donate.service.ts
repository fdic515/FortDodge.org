import { supabase } from "./supabase";

export type DonateSectionConfig<TData = any> = {
  enabled?: boolean | null;
  data?: TData | null;
};

export type DonateContentJson = {
  // We support two shapes to stay compatible with existing rows:
  // 1) Flat:   { page, hero, intro, ... }
  // 2) Nested: { page, data: { hero, intro, ... } }
  page?: string;
  hero?: DonateSectionConfig;
  intro?: DonateSectionConfig;
  need?: DonateSectionConfig;
  options?: DonateSectionConfig;
  closing?: DonateSectionConfig;
  giveToday?: DonateSectionConfig;
  data?: {
    hero?: DonateSectionConfig;
    intro?: DonateSectionConfig;
    need?: DonateSectionConfig;
    options?: DonateSectionConfig;
    closing?: DonateSectionConfig;
    giveToday?: DonateSectionConfig;
    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
};

export type DonateContent = {
  id: number;
  data: DonateContentJson | null;
  created_at?: string | null;
  updated_at?: string | null;

  [key: string]: unknown;
};

const HOME_TABLE = "Home";

/**
 * Retry a Supabase query with exponential backoff on timeout errors
 */
async function retrySupabaseQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<{ data: T | null; error: any }> {
  let lastError: any = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = await queryFn();
    
    // If no error, return the result
    if (!result.error) {
      return result;
    }
    
    lastError = result.error;
    
    // Check if it's a timeout or connection error
    const isTimeoutError = 
      result.error?.message?.includes("timeout") ||
      result.error?.message?.includes("ConnectTimeoutError") ||
      result.error?.message?.includes("fetch failed") ||
      result.error?.details?.includes("timeout") ||
      result.error?.details?.includes("ConnectTimeoutError");
    
    // Don't retry on the last attempt or if it's not a timeout error
    if (attempt === maxRetries - 1 || !isTimeoutError) {
      return result;
    }
    
    // Exponential backoff: wait longer between retries
    const delay = initialDelay * Math.pow(2, attempt);
    console.warn(
      `[donate.service] Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms delay`,
      { error: result.error?.message || result.error?.details }
    );
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  return { data: null, error: lastError };
}

export async function getDonateContent(): Promise<DonateContent | null> {
  const { data, error } = await retrySupabaseQuery(async () => {
    return await supabase
      .from(HOME_TABLE)
      .select("*")
      // Prefer the new dedicated `page_name` column, but fall back to JSON `data->>page`
      // for backwards compatibility with older rows.
      .or("page_name.eq.donate,data->>page.eq.donate")
      .single();
  });

  if (error) {
    // Check if it's a timeout error specifically
    const isTimeoutError = 
      error?.message?.includes("timeout") ||
      error?.message?.includes("ConnectTimeoutError") ||
      error?.message?.includes("fetch failed") ||
      error?.details?.includes("timeout") ||
      error?.details?.includes("ConnectTimeoutError");
    
    if (isTimeoutError) {
      console.error(
        "[donate.service] Connection timeout after retries. This may indicate network issues or Supabase service problems.",
        {
          message: error?.message,
          details: error?.details,
        }
      );
    } else {
      console.error("[donate.service] Failed to fetch Donate content:", error);
    }
    return null;
  }

  return data ? (data as DonateContent) : null;
}

export async function updateDonateSection(
  sectionKey: string,
  sectionData: DonateSectionConfig
): Promise<{ success: boolean; error?: string; data?: DonateContent }> {
  try {
    console.log("[donate.service] updateDonateSection called:", {
      sectionKey,
      sectionData,
    });

    const current = await getDonateContent();

    if (!current) {
      // If no Donate row yet, create one using the nested { data: { ... } } shape
      const newInner: NonNullable<DonateContentJson["data"]> = {
        [sectionKey]: sectionData,
      };
      const newData: DonateContentJson = {
        page: "donate",
        data: newInner,
      };
      
      // Ensure old format keys are not included
      const oldKeysToRemove = [
        "hero_section",
        "introduction",
        "donation_options",
        "give_today", 
        "closing_message",
        "need",
      ];
      
      oldKeysToRemove.forEach(key => {
        delete (newData.data as any)[key];
      });

      const { data: insertData, error: insertError } = await supabase
        .from(HOME_TABLE)
        // Also persist the page identifier in the dedicated column for easier querying.
        .insert({ data: newData, page_name: "donate" })
        .select()
        .single();

      if (insertError) {
        console.error(
          "[donate.service] Failed to create Donate row:",
          insertError
        );
        return { success: false, error: insertError.message };
      }

      return { success: true, data: insertData as DonateContent };
    }

    const currentData: DonateContentJson = (current.data || {}) as DonateContentJson;

    // Prefer nested `data` object if it exists; otherwise, fall back to flat model.
    const hasNested =
      currentData.data && typeof currentData.data === "object";

    let updatedData: DonateContentJson;

    if (hasNested) {
      const inner = currentData.data || {};
      const updatedInner: NonNullable<DonateContentJson["data"]> = {
        ...inner,
        [sectionKey]: sectionData,
      };

      // Remove old format keys to prevent duplicates
      const oldKeysToRemove = [
        "hero_section",
        "introduction", 
        "donation_options",
        "give_today",
        "closing_message",
        "need", // old "need" key if exists
      ];
      
      oldKeysToRemove.forEach(key => {
        delete updatedInner[key];
      });

      updatedData = {
        ...currentData,
        page: "donate",
        data: updatedInner,
      };
    } else {
      updatedData = {
        ...currentData,
        page: "donate",
        [sectionKey]: sectionData,
      };

      // Remove old format keys to prevent duplicates
      const oldKeysToRemove = [
        "hero_section",
        "introduction",
        "donation_options", 
        "give_today",
        "closing_message",
        "need", // old "need" key if exists
      ];
      
      oldKeysToRemove.forEach(key => {
        delete updatedData[key];
      });
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
        "[donate.service] Failed to update Donate section:",
        updateError
      );
      return { success: false, error: updateError.message };
    }

    return { success: true, data: updateData as DonateContent };
  } catch (error: any) {
    console.error("[donate.service] Error updating Donate section:", error);
    return { success: false, error: error?.message ?? String(error) };
  }
}

