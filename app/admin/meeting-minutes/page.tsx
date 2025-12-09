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

export default function MeetingMinutesPageEditor() {
  const [sections, setSections] = useState<Record<string, SectionField[]>>({
    link: [
      { id: "title", label: "Title", type: "text", value: "Meeting Minutes" },
      { id: "description", label: "Description", type: "textarea", value: "Browse archived minutes from board and general body meetings so community members can stay informed about key decisions and ongoing initiatives." },
      { id: "link-url", label: "Meeting Minutes Folder URL", type: "url", value: "https://drive.google.com/drive/folders/17nWT8C6jEZm5XK8oqKNEM1fzzXOcDsa0" },
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
      pageTitle="Edit Meeting Minutes"
      pageDescription="Edit the Meeting Minutes resource section including title, description, and folder link."
    >
      <div className="space-y-6">
        <SectionEditor
          sectionId="link"
          sectionTitle="Meeting Minutes Link Configuration"
          fields={sections.link}
          onUpdate={handleSectionUpdate}
        />
      </div>
    </PageEditorLayout>
  );
}

