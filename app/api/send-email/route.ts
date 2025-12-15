import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { subject, to, from, text, html, formName, email: userEmail, name: userName } = body || {};

        // Check if email is configured
        if (!env.isEmailConfigured) {
            const emailConfig = env.email;
            const missing: string[] = [];
            if (!emailConfig?.smtpHost) missing.push("SMTP_HOST");
            if (!emailConfig?.smtpUser) missing.push("SMTP_USER");
            if (!emailConfig?.smtpPass) missing.push("SMTP_PASS");
            if (!emailConfig?.from) missing.push("EMAIL_FROM");
            if (!emailConfig?.to) missing.push("EMAIL_TO");
            return NextResponse.json({ 
                error: "SMTP not configured on server",
                missing: missing,
                message: `Missing required environment variables: ${missing.join(", ")}` 
            }, { status: 500 });
        }

        const emailConfig = env.email!;
        const host = emailConfig.smtpHost!;
        const port = emailConfig.smtpPort || 587;
        const user = emailConfig.smtpUser!;
        const pass = emailConfig.smtpPass!;

        const transporter = nodemailer.createTransport({
            host,
            port: Number(port),
            secure: port === 465,
            auth: { user, pass },
            tls: { rejectUnauthorized: false },
            requireTLS: port !== 465 && port !== 25,
        });

        // Verify SMTP connection
        try {
            await transporter.verify();
            console.log("[email] SMTP connection verified successfully");
        } catch (verifyError: any) {
            console.error("[email] SMTP verification failed:", verifyError);
            return NextResponse.json({ 
                error: "SMTP connection failed",
                details: verifyError?.message || String(verifyError),
                message: "Unable to connect to SMTP server. Please check your SMTP configuration."
            }, { status: 500 });
        }

        // 1️⃣ Admin email first
        const adminMailOptions = {
            from: from || emailConfig.from || user,
            to: to || emailConfig.to || user, // Admin email
            subject: subject || `Website form submission${formName ? ` — ${formName}` : ""}`,
            text: text || undefined,
            html: html || undefined,
        };
        if (!adminMailOptions.text) delete (adminMailOptions as any).text;
        if (!adminMailOptions.html) delete (adminMailOptions as any).html;

        const adminInfo = await transporter.sendMail(adminMailOptions);
        console.log("[email] Admin email sent:", adminInfo.messageId);

        // 2️⃣ User confirmation email after admin
        // This is best-effort: if it fails, we still treat the request as success.
        if (userEmail) {
            try {
                const userMailOptions = {
                    from: emailConfig.from || user,
                    to: userEmail,
                    subject: `Form Submission Received${formName ? ` — ${formName}` : ""}`,
                    text: `Hi ${userName || "User"},\n\nYour form has been submitted successfully. The project owner has received your message and will respond soon.\n\nThanks!`,
                };

                const userInfo = await transporter.sendMail(userMailOptions);
                console.log("[email] User confirmation email sent:", userInfo.messageId);
            } catch (userErr) {
                console.error("[email] User confirmation email failed:", userErr);
            }
        }

        return NextResponse.json({ ok: true, message: "Emails sent successfully!" });
    } catch (err: any) {
        console.error("[email] Error sending email:", err);
        let errorMessage = err?.message || String(err);
        let errorDetails = err?.code || err?.responseCode || "Unknown error";

        if (err?.code === "EAUTH") errorMessage = "SMTP authentication failed. Please check your SMTP_USER and SMTP_PASS.";
        else if (err?.code === "ECONNECTION") errorMessage = "Could not connect to SMTP server. Please check your SMTP_HOST and SMTP_PORT.";
        else if (err?.code === "ETIMEDOUT") errorMessage = "SMTP connection timed out. Please check your network connection and SMTP settings.";

        return NextResponse.json({ 
            error: errorMessage,
            details: errorDetails,
            code: err?.code,
        }, { status: 500 });
    }
}
