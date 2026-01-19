"use client";

import { useEffect, useState } from "react";
import PageEditorLayout from "../components/PageEditorLayout";
import SectionEditor from "../components/SectionEditor";
import VisibilityToggle from "../components/VisibilityToggle";
import { SectionField } from "@/lib/home-default-sections";
import { getRamadanDefaultSections } from "@/lib/ramadan-default-sections";
import { toast } from "@/app/components/Toaster";

export default function RamadanPageEditor() {
  const [sections, setSections] = useState<Record<string, SectionField[]>>(
    getRamadanDefaultSections()
  );
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  // Restore active tab from localStorage after hydration (client-side only)
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab-ramadan");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  useEffect(() => {
    async function fetchRamadanData() {
      try {
        const response = await fetch("/api/ramadan");
        const result = await response.json();

        if (result.ok && result.ramadan?.data) {
          const data = result.ramadan.data;

          // Support both shapes:
          // 1) { page, hero, ... }
          // 2) { page, data: { hero, ... } }
          const sectionsSource =
            data.data && typeof data.data === "object" ? data.data : data;
          const transformed = getRamadanDefaultSections();

          // Map existing Daily Lessons data from Supabase into editor fields
          const lessonsSource = sectionsSource.daily_lessons ?? null;
          if (lessonsSource?.data) {
            const lessonsData = lessonsSource.data as any;
            transformed.daily_lessons = transformed.daily_lessons.map(
              (field) => {
                switch (field.id) {
                  case "lessons-image":
                    return {
                      ...field,
                      value: lessonsData.image || field.value,
                    };
                  case "lessons-title":
                    return {
                      ...field,
                      value: lessonsData.title || field.value,
                    };
                  case "lessons-description":
                    return {
                      ...field,
                      value: lessonsData.description || field.value,
                    };
                  case "lessons-location":
                    return {
                      ...field,
                      value: lessonsData.location || field.value,
                    };
                  case "lessons-time":
                    return {
                      ...field,
                      value: lessonsData.time || field.value,
                    };
                  case "lessons-bullet-1":
                    return {
                      ...field,
                      value: lessonsData.bullet1 || field.value,
                    };
                  case "lessons-bullet-2":
                    return {
                      ...field,
                      value: lessonsData.bullet2 || field.value,
                    };
                  case "lessons-bullet-3":
                    return {
                      ...field,
                      value: lessonsData.bullet3 || field.value,
                    };
                  case "lessons-cta-label":
                    return {
                      ...field,
                      value: lessonsData.ctaLabel || field.value,
                    };
                  case "lessons-cta-url":
                    return {
                      ...field,
                      value: lessonsData.ctaUrl || field.value,
                    };
                  default:
                    return field;
                }
              }
            );
          }

          // Map existing Hero data from Supabase into editor fields
          const heroSource = sectionsSource.hero ?? null;
          if (heroSource?.data) {
            const heroData = heroSource.data as any;
            transformed.hero = transformed.hero.map((field) => {
              switch (field.id) {
                case "hero-image":
                  return {
                    ...field,
                    value: heroData.heroImage || field.value,
                  };
                case "hero-announcement-text":
                  return {
                    ...field,
                    value: heroData.announcementText || field.value,
                  };
                case "hero-eid-text":
                  return {
                    ...field,
                    value: heroData.eidText || field.value,
                  };
                default:
                  return field;
              }
            });
          }

          // Map existing Zakat-ul-Fitr data from Supabase into editor fields
          const zakatSource = sectionsSource.zakat_ul_fitr ?? null;
          if (zakatSource?.data) {
            const zakatData = zakatSource.data as any;
            transformed.zakat_ul_fitr = transformed.zakat_ul_fitr.map(
              (field) => {
                switch (field.id) {
                  case "zakat-title":
                    return {
                      ...field,
                      value: zakatData.title || field.value,
                    };
                  case "zakat-amount":
                    return {
                      ...field,
                      value: zakatData.amount || field.value,
                    };
                  case "zakat-due-date":
                    return {
                      ...field,
                      value: zakatData.dueDate || field.value,
                    };
                  case "zakat-description":
                    return {
                      ...field,
                      value: zakatData.description || field.value,
                    };
                  case "zakat-submission-methods":
                    return {
                      ...field,
                      value: Array.isArray(zakatData.submissionMethods)
                        ? zakatData.submissionMethods
                        : field.value,
                    };
                  case "zakat-disclaimer":
                    return {
                      ...field,
                      value: zakatData.disclaimer || field.value,
                    };
                  default:
                    return field;
                }
              }
            );
          }

          // Map existing Community Iftars data from Supabase into editor fields
          const iftarsSource = sectionsSource.community_iftars ?? null;
          if (iftarsSource?.data) {
            const iftarsData = iftarsSource.data as any;
            transformed.community_iftars = transformed.community_iftars.map(
              (field) => {
                switch (field.id) {
                  case "iftar-title":
                    return {
                      ...field,
                      value: iftarsData.title !== null && iftarsData.title !== undefined
                        ? iftarsData.title
                        : field.value,
                    };
                  case "iftar-note":
                    return {
                      ...field,
                      value: iftarsData.note !== null && iftarsData.note !== undefined
                        ? iftarsData.note
                        : field.value,
                    };
                  case "iftar-intro":
                    return {
                      ...field,
                      value: iftarsData.intro !== null && iftarsData.intro !== undefined
                        ? iftarsData.intro
                        : field.value,
                    };
                  case "iftar-email-text":
                    return {
                      ...field,
                      value: iftarsData.emailText !== null && iftarsData.emailText !== undefined
                        ? iftarsData.emailText
                        : field.value,
                    };
                  case "iftar-email-address":
                    return {
                      ...field,
                      value: iftarsData.emailAddress !== null && iftarsData.emailAddress !== undefined
                        ? iftarsData.emailAddress
                        : field.value,
                    };
                  case "iftar-dates":
                    return {
                      ...field,
                      value: Array.isArray(iftarsData.iftarDates)
                        ? iftarsData.iftarDates
                        : field.value,
                    };
                  default:
                    return field;
                }
              }
            );
          }

          setSections(transformed);
        }
      } catch (error) {
        console.error("Failed to fetch ramadan data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRamadanData();
  }, []);

  const handleSectionUpdate = (sectionId: string, fields: SectionField[]) => {
    setSections((prev) => {
      const updated = {
        ...prev,
        [sectionId]: fields,
      };
      // Log update for community_iftars to verify state is updating
      if (sectionId === "community_iftars") {
        console.log("[Ramadan Admin] Updating community_iftars state:", {
          fieldCount: fields.length,
          fields: fields.map(f => ({ id: f.id, type: f.type, hasValue: f.value !== undefined && f.value !== null })),
        });
      }
      return updated;
    });
  };

  const transformFieldsToSupabase = (
    sectionId: string,
    fields: SectionField[]
  ): any => {
    const data: any = {};

    // Collect all field values, ensuring we capture the actual current values
    fields.forEach((field) => {
      if (field.type === "array" || field.type === "table") {
        // For arrays, preserve the exact array value
        data[field.id] = Array.isArray(field.value) ? field.value : [];
      } else if (field.type === "rich-text") {
        // For rich-text, preserve the HTML string exactly as it is (even if empty)
        data[field.id] = typeof field.value === "string" ? field.value : "";
      } else {
        // For other types (text, url, etc.), preserve the string value
        data[field.id] = typeof field.value === "string" ? field.value : "";
      }
    });

    const mapping: Record<string, (d: any) => any> = {
      // When saving hero, only include heroImage if it is present in the
      // submitted fields. This prevents the admin omitting the image from
      // the editor (we hide the image field) from accidentally clearing the
      // stored hero image in the DB.
      hero: (d) => {
        const out: any = {
          announcementText: d["hero-announcement-text"] || "",
          eidText: d["hero-eid-text"] || "",
        };
        if (Object.prototype.hasOwnProperty.call(d, "hero-image")) {
          out.heroImage = d["hero-image"] || "";
        }
        return out;
      },
      daily_lessons: (d) => ({
        image: d["lessons-image"] || "",
        title: d["lessons-title"] || "",
        description: d["lessons-description"] || "",
        location: d["lessons-location"] || "",
        time: d["lessons-time"] || "",
        bullet1: d["lessons-bullet-1"] || "",
        bullet2: d["lessons-bullet-2"] || "",
        bullet3: d["lessons-bullet-3"] || "",
        ctaLabel: d["lessons-cta-label"] || "",
        ctaUrl: d["lessons-cta-url"] || "",
      }),
      zakat_ul_fitr: (d) => ({
        title: d["zakat-title"] || "",
        amount: d["zakat-amount"] || "",
        dueDate: d["zakat-due-date"] || "",
        description: d["zakat-description"] || "",
        submissionMethods: Array.isArray(d["zakat-submission-methods"])
          ? d["zakat-submission-methods"]
          : [],
        disclaimer: d["zakat-disclaimer"] || "",
      }),
      community_iftars: (d) => {
        // Ensure we capture all fields - title, note, intro (rich-text), emailText, emailAddress, and iftarDates (array)
        const result: any = {
          title: d.hasOwnProperty("iftar-title") 
            ? (d["iftar-title"] !== null && d["iftar-title"] !== undefined ? d["iftar-title"] : "")
            : "",
          note: d.hasOwnProperty("iftar-note") 
            ? (d["iftar-note"] !== null && d["iftar-note"] !== undefined ? d["iftar-note"] : "")
            : "",
          intro: d.hasOwnProperty("iftar-intro") 
            ? (d["iftar-intro"] !== null && d["iftar-intro"] !== undefined ? d["iftar-intro"] : "")
            : "",
          emailText: d.hasOwnProperty("iftar-email-text") 
            ? (d["iftar-email-text"] !== null && d["iftar-email-text"] !== undefined ? d["iftar-email-text"] : "")
            : "",
          emailAddress: d.hasOwnProperty("iftar-email-address") 
            ? (d["iftar-email-address"] !== null && d["iftar-email-address"] !== undefined ? d["iftar-email-address"] : "")
            : "",
          iftarDates: d.hasOwnProperty("iftar-dates") && Array.isArray(d["iftar-dates"])
            ? d["iftar-dates"]
            : (d.hasOwnProperty("iftar-dates") ? [] : []),
        };
        return result;
      },
    };

    const mapper = mapping[sectionId];
    return mapper ? mapper(data) : data;
  };

  const handleSave = async (sectionId: string) => {
    setSaving((prev) => ({ ...prev, [sectionId]: true }));

    try {
      // Get the latest fields from state
      const fields = sections[sectionId];
      if (!fields || fields.length === 0) {
        toast.error("No fields found to save");
        setSaving((prev) => ({ ...prev, [sectionId]: false }));
        return;
      }
      
      // Log what we're about to save for community_iftars
      if (sectionId === "community_iftars") {
        console.log("[Ramadan Admin] Saving community_iftars - Fields:", fields.map(f => ({
          id: f.id,
          type: f.type,
          valueType: typeof f.value,
          isArray: Array.isArray(f.value),
          arrayLength: Array.isArray(f.value) ? f.value.length : undefined,
          valuePreview: typeof f.value === "string" ? f.value.substring(0, 50) : (Array.isArray(f.value) ? `Array(${f.value.length})` : String(f.value)),
        })));
      }
      
      const sectionData = transformFieldsToSupabase(sectionId, fields);
      
      // Log the transformed data for community_iftars
      if (sectionId === "community_iftars") {
        console.log("[Ramadan Admin] Transformed community_iftars data:", {
          intro: sectionData.intro ? sectionData.intro.substring(0, 100) : "(empty)",
          introLength: sectionData.intro ? sectionData.intro.length : 0,
          iftarDatesCount: Array.isArray(sectionData.iftarDates) ? sectionData.iftarDates.length : 0,
          iftarDates: sectionData.iftarDates,
        });
      }

      const supabaseKey = sectionId;

      const requestBody = {
        sectionKey: supabaseKey,
        sectionData: {
          enabled: true,
          data: sectionData,
        },
      };

      const response = await fetch("/api/ramadan/update-section", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (result.ok) {
        toast.success(`${sectionId} saved successfully!`);
        // Save current active tab before reload
        localStorage.setItem("activeTab-ramadan", activeTab);
        window.location.reload();
      } else {
        toast.error(result.message || "Failed to save");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to save");
    } finally {
      setSaving((prev) => ({ ...prev, [sectionId]: false }));
    }
  };

  const tabs = [
    { id: "hero", label: "Hero", icon: "📣" },
    { id: "daily_lessons", label: "Daily Lessons", icon: "📖" },
    { id: "zakat_ul_fitr", label: "Zakat-ul-Fitr", icon: "💝" },
    { id: "community_iftars", label: "Community Iftars", icon: "🥘" },
  ];

  return (
    <PageEditorLayout
      pageTitle="Edit Ramadan Page"
      pageDescription="Manage hero banner, lessons, zakat, and community iftars."
    >
      <VisibilityToggle pageName="ramadan" apiEndpoint="/api/ramadan" />
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="w-full overflow-x-auto horizontal-scroll">
            <nav
              className="inline-flex min-w-max scroll-px-4 px-8 py-2 md:px-0"
              aria-label="Tabs"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    localStorage.setItem("activeTab-ramadan", tab.id);
                  }}
                  className={`
                    cursor-pointer mr-2 flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-xs sm:text-sm font-medium border-2 transition-colors last:mr-0
                    ${activeTab === tab.id
                      ? "border-sky-600 bg-sky-50 text-sky-700"
                      : "border-transparent bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white hover:text-gray-800"
                    }
                  `}
                >
                  <span className="text-base sm:text-lg">{tab.icon}</span>
                  <span className="text-left leading-snug">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : (
            <>
              {tabs.map((tab) => (
                <div key={tab.id}>
                  {activeTab === tab.id && (
                    <SectionEditor
                      sectionId={tab.id}
                      sectionTitle={tab.label}
                      // For the hero tab, hide the image upload field and only
                      // expose text fields. This lets admins change the
                      // announcement/Eid text without uploading an image.
                      fields={
                        tab.id === "hero"
                          ? sections[tab.id]?.filter((f) => f.id !== "hero-image")
                          : sections[tab.id]
                      }
                      onUpdate={handleSectionUpdate}
                      onSave={() => handleSave(tab.id)}
                      saving={saving[tab.id] || false}
                      alwaysExpanded={true}
                      bucket="Public"
                      folder="ramadan"
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </PageEditorLayout>
  );
}


