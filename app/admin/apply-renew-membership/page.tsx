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

export default function ApplyRenewMembershipPageEditor() {
  const [sections, setSections] = useState<Record<string, SectionField[]>>({
    header: [
      { id: "drawer-title", label: "Drawer Title", type: "text", value: "Fort Dodge Islamic Center Membership Application Form" },
      { id: "drawer-subtitle", label: "Drawer Subtitle", type: "text", value: "Submit the quick intake below and finish the official Google Form in the next step." },
    ],
    content: [
      {
        id: "overview",
        label: "Overview Paragraphs",
        type: "array",
        value: [
          "Fort Dodge Islamic Center offers two types of membership: paid full membership and associate membership.",
          "Paid full members have the right to vote in General Assembly elections and are eligible to serve on the Board of Directors. The annual membership fee is $30 and applies to members of the General Membership.",
          "Associate members do not have voting privileges, but they are still entitled to all other benefits of membership, such as access to the Center's facilities and programs.",
          "Please complete this form to establish or renew your membership at Fort Dodge Islamic Center. If you have any questions, please email membership@darularqam.org.",
        ],
        arrayItemSchema: [
          { id: "text", label: "Paragraph Text", type: "textarea" },
        ],
      },
      {
        id: "highlights",
        label: "Membership Highlights",
        type: "array",
        value: [
          "Voting eligibility",
          "Facility access",
          "Community updates",
        ],
        arrayItemSchema: [
          { id: "text", label: "Highlight Text", type: "text" },
        ],
      },
      {
        id: "instructions",
        label: "Instructions",
        type: "array",
        value: [
          "Complete all required parts clearly.",
          "Submit the form.",
          "The fee for full membership is $30 per person per year. There is no fee for associate membership.",
          "Select the method of payment: debit or credit card through our website, MOHID, or by submitting the fees into the donation box.",
        ],
        arrayItemSchema: [
          { id: "text", label: "Instruction Text", type: "textarea" },
        ],
      },
      {
        id: "payment-options",
        label: "Payment Options",
        type: "array",
        value: [
          { label: "Donate Portal", description: "Use the Arqum donate page for debit/credit payments.", href: "/donate", external: "false" },
          { label: "MOHID Online", description: "Complete dues through the secure Mohid donation flow.", href: "https://us.mohid.co/tx/dallas/daic/masjid/online/donation", external: "true" },
        ],
        arrayItemSchema: [
          { id: "label", label: "Label", type: "text" },
          { id: "description", label: "Description", type: "textarea" },
          { id: "href", label: "URL", type: "url" },
          { id: "external", label: "External Link (true/false)", type: "text" },
        ],
      },
      { id: "donate-link", label: "Donate Page Link", type: "url", value: "/donate" },
      { id: "mohid-link", label: "MOHID Link", type: "url", value: "https://us.mohid.co/tx/dallas/daic/masjid/online/donation" },
      { id: "mailing-list-note", label: "Mailing List Note", type: "text", value: "Once your application is processed, we will add your email to our members mailing list." },
      { id: "google-form-url", label: "Google Form URL", type: "url", value: "https://docs.google.com/forms/d/e/1FAIpQLSddImQS6sjm5dzc-IR4Gxj1Po8iMW9tut0ae6ddxp-DkVh2mQ/viewform" },
      { id: "contact-email", label: "Contact Email", type: "text", value: "membership@darularqam.org" },
    ],
    formConfig: [
      {
        id: "form-fields",
        label: "Form Fields",
        type: "array",
        value: [
          { name: "fullName", label: "Full Name", type: "text", required: "true", placeholder: "" },
          { name: "mailingAddress", label: "Mailing Address", type: "textarea", required: "true", placeholder: "", rows: "3" },
          { name: "phoneNumber", label: "Phone Number", type: "tel", required: "true", placeholder: "" },
          { name: "email", label: "Email", type: "email", required: "true", placeholder: "" },
          { name: "mailingList", label: "Do you want to be added to Fort Dodge Islamic Center mailing list to receive updates and notifications?", type: "radio", required: "true", options: "Yes,No" },
          { name: "membershipType", label: "Type of Membership", type: "radio", required: "true", options: "Full Member ($30/Year),Associate Member" },
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
      pageTitle="Edit Apply/Renew Membership Drawer"
      pageDescription="Edit all content for the Apply/Renew Membership drawer including header, content sections, and form configuration."
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

