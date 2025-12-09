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

export default function ReserveBasementPageEditor() {
  const [sections, setSections] = useState<Record<string, SectionField[]>>({
    header: [
      { id: "drawer-title", label: "Drawer Title", type: "text", value: "Fort Dodge Islamic Center Basement Reservation Form" },
      { id: "drawer-subtitle", label: "Drawer Subtitle", type: "text", value: "Provide your event details to request basement usage for classes, gatherings, or community events." },
    ],
    content: [
      {
        id: "intro-copy",
        label: "Introduction Paragraphs",
        type: "array",
        value: [
          "This form is intended for members and affiliates of Fort Dodge Islamic Center seeking to reserve the basement space for various activities and events. Our basement is a versatile space, ideal for gatherings, educational sessions, community events, and more. Please fill out this form to begin the reservation process. All requests are subject to review based on our policy guidelines and availability.",
          "Note: Please allow at least 2 days for us to process your request. We do not guarantee same-day reservations, so plan in advance.",
        ],
        arrayItemSchema: [
          { id: "text", label: "Paragraph Text", type: "textarea" },
        ],
      },
      {
        id: "contact-details",
        label: "Contact Details",
        type: "array",
        value: [
          { label: "Phone", value: "(515) 528-3618", href: "tel:15155283618" },
          { label: "Email", value: "info@arqum.org", href: "mailto:info@arqum.org" },
        ],
        arrayItemSchema: [
          { id: "label", label: "Label", type: "text" },
          { id: "value", label: "Display Value", type: "text" },
          { id: "href", label: "Link URL", type: "url" },
        ],
      },
      { id: "policy-title", label: "Policy Section Title", type: "text", value: "Basement Usage Policy" },
      {
        id: "policy-items",
        label: "Policy Items",
        type: "array",
        value: [
          { title: "1. Safety First:", description: "The safety of our community is our top priority. The basement contains electrical components and utility rooms, which can be hazardous, especially to children. It is imperative that these areas are treated with caution." },
          { title: "2. Adult Supervision Required for Children:", description: "Children are welcome to participate in activities held in the basement; however, they must be under adult supervision at all times. Unscheduled, unsupervised access by children to the basement is strictly prohibited to prevent accidents." },
          { title: "3. Prioritizing Space for Community Activities:", description: "While we understand the need for recreational space for children, the primary purpose of the basement is to serve as an additional space for community activities, educational purposes, and events. Therefore, reservation requests will be prioritized based on these needs." },
          { title: "4. Respect for the Space:", description: "All users of the basement are expected to respect the space. This includes maintaining cleanliness, ensuring all equipment and facilities are used appropriately, and leaving the space in the same condition as it was found." },
          { title: "5. Compliance with Islamic Center Rules and Regulations:", description: "All activities in the basement must adhere to the overall rules and guidelines of the Fort Dodge Islamic Center. Any activities contrary to these guidelines will not be permitted." },
          { title: "6. Reservation Review and Confirmation:", description: "Submission of this form does not guarantee a reservation. All requests will be reviewed. We will contact you via email communications as soon as possible to confirm availability. Please wait for our confirmation before proceeding with arrangements." },
          { title: "7. Cleaning:", description: "The reservation holder will be responsible to clean and remove trash from the basement after the reservation ends. They will also vacuum and return everything as it was before the reservation." },
          { title: "8. Community Use:", description: "The basement is intended for community use and a safe, respectful, and beneficial use of the basement space for our community." },
        ],
        arrayItemSchema: [
          { id: "title", label: "Policy Title", type: "text" },
          { id: "description", label: "Policy Description", type: "textarea" },
        ],
      },
      { id: "form-url", label: "Reservation Form URL", type: "url", value: "https://forms.gle/ReserveBasementForm" },
    ],
    formConfig: [
      {
        id: "form-fields",
        label: "Form Fields",
        type: "array",
        value: [
          { name: "name", label: "Name", type: "text", required: "true", placeholder: "" },
          { name: "email", label: "Email address", type: "email", required: "true", placeholder: "" },
          { name: "phone", label: "Contact number", type: "tel", required: "true", placeholder: "" },
          { name: "reservationDate", label: "Date of reservation", type: "date", required: "true", placeholder: "" },
          { name: "reservationTime", label: "Time of reservation", type: "time", required: "false", placeholder: "" },
          { name: "purpose", label: "Purpose of reservation", type: "textarea", required: "true", placeholder: "", rows: "3" },
          { name: "agreement", label: "I agree to abide by these policies and ensure a safe, respectful, and beneficial use of the basement space for our community.", type: "checkbox", required: "true", placeholder: "" },
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
      pageTitle="Edit Reserve Basement Drawer"
      pageDescription="Edit all content for the Reserve Basement drawer including header, content sections, and form configuration."
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

