"use client";

import { useState } from "react";
import PageEditorLayout from "../components/PageEditorLayout";
import SectionEditor from "../components/SectionEditor";

type SectionField = {
  id: string;
  label: string;
  type: "text" | "textarea" | "image" | "rich-text" | "url" | "time" | "array" | "table";
  value: string | any[];
  placeholder?: string;
  arrayItemSchema?: { id: string; label: string; type: string }[];
  tableColumns?: { id: string; label: string }[];
};

export default function FundraisingPolicyPageEditor() {
  const [sections, setSections] = useState<Record<string, SectionField[]>>({
    link: [
      { id: "title", label: "Title", type: "text", value: "Fundraising Policy" },
      { id: "description", label: "Description", type: "textarea", value: "Review our policies for fundraising and solicitation at the masjid, including how to request approval for campaigns and what is and is not permitted on site." },
      { id: "link-url", label: "Fundraising Policy Document URL", type: "url", value: "https://drive.google.com/file/d/1byjbEt3yWlf2II2mjkHd74VzDJBDeVkD/view?usp=sharing" },
    ],
  });

  const handleSectionUpdate = (sectionId: string, fields: SectionField[]) => {
    setSections((prev) => ({
      ...prev,
      [sectionId]: fields,
    }));
  };

  return (
    <PageEditorLayout
      pageTitle="Edit Fundraising Policy"
      pageDescription="Edit the Fundraising Policy resource section including title, description, and document link."
    >
      <div className="space-y-6">
        <SectionEditor
          sectionId="link"
          sectionTitle="Fundraising Policy Link Configuration"
          fields={sections.link}
          onUpdate={handleSectionUpdate}
        />
      </div>
    </PageEditorLayout>
  );
}

