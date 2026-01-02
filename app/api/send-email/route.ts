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
            
            // Detect Gmail-specific authentication errors
            const isGmail = host.includes("gmail.com");
            const isAuthError = verifyError?.code === "EAUTH" || verifyError?.responseCode === 535;
            const isGmailAuthError = isGmail && isAuthError;
            
            let errorMessage = "Unable to connect to SMTP server. Please check your SMTP configuration.";
            let helpMessage = "";
            
            if (isGmailAuthError) {
                errorMessage = "Gmail authentication failed: Username and Password not accepted.";
                helpMessage = "For Gmail, you MUST use an App Password (not your regular password). " +
                    "Steps: 1) Enable 2-Factor Authentication on your Google account, " +
                    "2) Go to Google Account → Security → App passwords, " +
                    "3) Generate a new app password for 'Mail', " +
                    "4) Use the 16-character app password (no spaces) as SMTP_PASS in .env.local, " +
                    "5) Restart your server after updating .env.local";
            } else if (isAuthError) {
                errorMessage = "SMTP authentication failed. Please check your SMTP_USER and SMTP_PASS.";
                helpMessage = "Verify your credentials are correct in .env.local and restart the server.";
            } else if (verifyError?.code === "ECONNECTION") {
                errorMessage = "Could not connect to SMTP server.";
                helpMessage = "Check your SMTP_HOST and SMTP_PORT settings, and ensure your firewall allows outbound connections.";
            }
            
            return NextResponse.json({ 
                error: errorMessage,
                details: verifyError?.message || String(verifyError),
                help: helpMessage,
                code: verifyError?.code || verifyError?.responseCode,
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
        let helpMessage = "";

        // Detect Gmail-specific authentication errors
        const emailConfig = env.email;
        const isGmail = emailConfig?.smtpHost?.includes("gmail.com");
        const isAuthError = err?.code === "EAUTH" || err?.responseCode === 535;
        const isGmailAuthError = isGmail && isAuthError;

        if (isGmailAuthError) {
            errorMessage = "Gmail authentication failed: Username and Password not accepted.";
            helpMessage = "For Gmail, you MUST use an App Password (not your regular password). " +
                "Steps: 1) Enable 2-Factor Authentication on your Google account, " +
                "2) Go to Google Account → Security → App passwords, " +
                "3) Generate a new app password for 'Mail', " +
                "4) Use the 16-character app password (no spaces) as SMTP_PASS in .env.local, " +
                "5) Restart your server after updating .env.local";
        } else if (err?.code === "EAUTH") {
            errorMessage = "SMTP authentication failed. Please check your SMTP_USER and SMTP_PASS.";
            helpMessage = "Verify your credentials are correct in .env.local and restart the server.";
        } else if (err?.code === "ECONNECTION") {
            errorMessage = "Could not connect to SMTP server. Please check your SMTP_HOST and SMTP_PORT.";
            helpMessage = "Verify your SMTP settings and ensure your firewall allows outbound connections.";
        } else if (err?.code === "ETIMEDOUT") {
            errorMessage = "SMTP connection timed out. Please check your network connection and SMTP settings.";
            helpMessage = "Check your network connection and verify SMTP_HOST and SMTP_PORT are correct.";
        }

        return NextResponse.json({ 
            error: errorMessage,
            details: errorDetails,
            help: helpMessage,
            code: err?.code || err?.responseCode,
        }, { status: 500 });
    }
}
