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

export default function ByLawsPageEditor() {
  const [sections, setSections] = useState<Record<string, SectionField[]>>({
    link: [
      { id: "title", label: "Title", type: "text", value: "By Laws" },
      { id: "description", label: "Description", type: "textarea", value: "Access the governing by-laws of Fort Dodge Islamic Center, including organizational structure, board responsibilities, and membership guidelines." },
      { id: "link-url", label: "By Laws Document URL", type: "url", value: "https://drive.google.com/file/d/1xFQ6g0plhCzVIaCvglVPC1nykuICqRWL/view?usp=sharing" },
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
      pageTitle="Edit By Laws"
      pageDescription="Edit the By Laws resource section including title, description, and document link."
    >
      <div className="space-y-6">
        <SectionEditor
          sectionId="link"
          sectionTitle="By Laws Link Configuration"
          fields={sections.link}
          onUpdate={handleSectionUpdate}
        />
      </div>
    </PageEditorLayout>
  );
}

