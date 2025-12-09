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

export default function FinancialAssistancePageEditor() {
  const [sections, setSections] = useState<Record<string, SectionField[]>>({
    header: [
      { id: "drawer-title", label: "Drawer Title", type: "text", value: "Fort Dodge Islamic Center Financial Assistance Form" },
      { id: "drawer-subtitle", label: "Drawer Subtitle", type: "text", value: "Share your information below. You will finish the official Google Form in the next step." },
    ],
    content: [
      {
        id: "overview",
        label: "Overview Paragraphs",
        type: "array",
        value: [
          "The aim of the financial assistance program is to provide short-term financial aid to community members experiencing hardship. This support is made possible through Zakat, Sadaqa, and Fitra contributions.",
        ],
        arrayItemSchema: [
          { id: "text", label: "Paragraph Text", type: "textarea" },
        ],
      },
      {
        id: "how-to-apply",
        label: "How to Apply Steps",
        type: "array",
        value: [
          { title: "Online Application", description: "The fastest and most convenient method is to complete the Google Form linked below.", bullets: "" },
          { title: "Printable Application (optional)", description: "Download the latest application from our website, fill it out, and return it using any of the options below:", bullets: "Place the completed form in the donation box located in the prayer hall.\nEmail the completed form to treasurer@arqum.org." },
          { title: "Supporting Documents", description: "Please include recent documents such as bank statements and receipts. These can be scanned and emailed to treasurer@arqum.org.", bullets: "" },
        ],
        arrayItemSchema: [
          { id: "title", label: "Step Title", type: "text" },
          { id: "description", label: "Description", type: "textarea" },
          { id: "bullets", label: "Bullet Points (one per line)", type: "textarea" },
        ],
      },
      { id: "help-email", label: "Help Email", type: "text", value: "treasurer@arqum.org" },
      { id: "website-url", label: "Website URL", type: "url", value: "https://arqum.org" },
      { id: "google-form-url", label: "Google Form URL", type: "url", value: "https://forms.gle/financial-assistance" },
    ],
    formConfig: [
      {
        id: "marital-status-options",
        label: "Marital Status Options (for radio field)",
        type: "array",
        value: ["Married", "Single", "Divorced", "Widowed"],
        arrayItemSchema: [
          { id: "option", label: "Option", type: "text" },
        ],
      },
      {
        id: "frequency-scale",
        label: "Frequency Scale Options (1-10 months)",
        type: "array",
        value: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        arrayItemSchema: [
          { id: "value", label: "Value", type: "text" },
        ],
      },
      {
        id: "form-fields",
        label: "Form Fields",
        type: "array",
        value: [
          { name: "applicantName", label: "Applicant Full Name", type: "text", required: "true", placeholder: "" },
          { name: "mailingAddress", label: "Mailing Address", type: "textarea", required: "true", placeholder: "", rows: "3" },
          { name: "phone", label: "Phone", type: "tel", required: "true", placeholder: "" },
          { name: "email", label: "Email", type: "email", required: "true", placeholder: "" },
          { name: "maritalStatus", label: "Marital Status", type: "radio", required: "true", options: "Married,Single,Divorced,Widowed" },
          { name: "householdMembers", label: "List member of your family living with you and their relationship to you", type: "textarea", required: "true", placeholder: "", rows: "3" },
          { name: "assistanceReason", label: "Reason You Need Assistance", type: "textarea", required: "true", placeholder: "", rows: "3" },
          { name: "monthlyIncome", label: "Monthly Income", type: "textarea", required: "true", placeholder: "Job ($2000)\nGovernment Assistance ($250)", rows: "3" },
          { name: "monthlyExpenses", label: "Monthly Expenses", type: "textarea", required: "true", placeholder: "", rows: "3" },
          { name: "assistanceAmount", label: "Amount of assistance you need", type: "text", required: "true", placeholder: "" },
          { name: "assistanceFrequency", label: "How often you need assistance?", type: "radio", required: "true", options: "1,2,3,4,5,6,7,8,9,10" },
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
      pageTitle="Edit Financial Assistance Drawer"
      pageDescription="Edit all content for the Financial Assistance drawer including header, content sections, and form configuration."
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

