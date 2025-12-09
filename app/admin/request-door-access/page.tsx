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

export default function RequestDoorAccessPageEditor() {
  const [sections, setSections] = useState<Record<string, SectionField[]>>({
    header: [
      { id: "drawer-title", label: "Drawer Title", type: "text", value: "Fort Dodge Islamic Center Door Security Access Code Request Form" },
      { id: "drawer-subtitle", label: "Drawer Subtitle", type: "text", value: "Request your unique access code for entry outside regular prayer times." },
    ],
    content: [
      {
        id: "policy-intro",
        label: "Policy Introduction Paragraphs",
        type: "array",
        value: [
          "Fort Dodge Islamic Center is committed to the safety and security of its members. In line with this commitment, we are introducing a new door security policy. Starting 2/1/2024, The doors of the Islamic Center will be unlocked during regular prayer times (15 minutes before Athan and will remain open 15 minutes past Iqama), but access will be restricted at other times for enhanced security. To access the center's premises at other times, community members are required to sign up and obtain a unique access code.",
          "Please complete the following form accurately and thoroughly to request your access code. Once your request is approved, you will receive a confirmation email containing your unique access code. This code will be necessary for entry into the Fort Dodge Islamic Center outside prayer times.",
        ],
        arrayItemSchema: [
          { id: "text", label: "Paragraph Text", type: "textarea" },
        ],
      },
      { id: "security-policy-note", label: "Security Policy Note", type: "text", value: "* Indicates required question" },
      {
        id: "policy-agreement",
        label: "Policy Agreement Items",
        type: "array",
        value: [
          "I understand that the access code provided is for my personal use only.",
          "I agree not to share my access code with anyone else.",
          "I will promptly report any loss or compromise of my access code to the Fort Dodge Islamic Center management.",
        ],
        arrayItemSchema: [
          { id: "text", label: "Agreement Text", type: "textarea" },
        ],
      },
      { id: "policy-agreement-intro", label: "Policy Agreement Introduction", type: "textarea", value: "By submitting this form, I confirm that all the information provided is accurate and complete and I have read and agree to abide by the following Fort Dodge Islamic Center's door security policy:" },
      { id: "membership-drawer-link", label: "Membership Drawer Link", type: "url", value: "https://forms.gle/xtiX7nYHEWLfoEfy8" },
    ],
    formConfig: [
      {
        id: "form-fields",
        label: "Form Fields",
        type: "array",
        value: [
          { name: "fullName", label: "Full Name (First and Last name)", type: "text", required: "true", placeholder: "" },
          { name: "mobileNumber", label: "Mobile Number", type: "tel", required: "true", placeholder: "" },
          { name: "email", label: "Email Address", type: "email", required: "true", placeholder: "" },
          { name: "residentialAddress", label: "Residential Address", type: "textarea", required: "true", placeholder: "", rows: "3" },
          { name: "organization", label: "Working/studying Organization", type: "text", required: "true", placeholder: "" },
          { name: "accessReason", label: "Specify the reason for requiring access (prayer, event, meeting, etc.) at times outside the regular prayer times. Access outside regular unlock times, will be reviewed based on the need of the personnel.", type: "textarea", required: "true", placeholder: "", rows: "4" },
          { name: "membership", label: "Do you want to become a member of Fort Dodge Islamic Center? We advise everyone to apply for membership. Regular membership is always free. The voting membership costs $30 per year.", type: "radio", required: "true", options: "Yes, please fill the form via the membership drawer,No,I am currently a member" },
          { name: "agreement", label: "I agree", type: "checkbox", required: "true", placeholder: "" },
        ],
        arrayItemSchema: [
          { id: "name", label: "Field Name (HTML name attribute)", type: "text" },
          { id: "label", label: "Field Label", type: "text" },
          { id: "type", label: "Field Type (text/textarea/email/tel/date/time/radio/checkbox)", type: "text" },
          { id: "required", label: "Required (true/false)", type: "text" },
          { id: "placeholder", label: "Placeholder Text", type: "text" },
          { id: "rows", label: "Rows (for textarea)", type: "text" },
          { id: "options", label: "Options (comma-separated for radio/checkbox)", type: "text" },
        ],
      },
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
      pageTitle="Edit Request Door Access Drawer"
      pageDescription="Edit all content for the Request Door Access drawer including header, policy content, and form configuration."
    >
      <div className="space-y-6">
        <SectionEditor
          sectionId="header"
          sectionTitle="Header Section"
          fields={sections.header}
          onUpdate={handleSectionUpdate}
        />
        <SectionEditor
          sectionId="content"
          sectionTitle="Content Section"
          fields={sections.content}
          onUpdate={handleSectionUpdate}
        />
        <SectionEditor
          sectionId="formConfig"
          sectionTitle="Form Configuration"
          fields={sections.formConfig}
          onUpdate={handleSectionUpdate}
        />
      </div>
    </PageEditorLayout>
  );
}

