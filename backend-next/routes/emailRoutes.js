const express = require('express');
const multer = require('multer');
const { Resend } = require('resend');
const router = express.Router();
const { ok, fail, asyncHandler } = require('../utils/response');

const resend = new Resend(process.env.RESEND_API_KEY);

// Attachments (customize/PDF flow) are small design files, not stored on
// disk — memory storage + a size cap is sufficient here.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF attachments are allowed"));
    }
    cb(null, true);
  },
});

// upload.single("pdf") only engages for multipart/form-data requests (the
// Customize "email my design" flow); plain JSON requests from ContactForm /
// EnquiryModal / DiwaliClient pass straight through untouched.
router.post(
  "/send-email",
  (req, res, next) => {
    upload.single("pdf")(req, res, (err) => {
      if (err) return fail(res, 400, err.message || "Attachment upload failed");
      next();
    });
  },
  asyncHandler(async (req, res) => {
    const { name, company, email, phone, requirement, companyname, message } = req.body;

    const resolvedName = name || companyname || "Website visitor";
    const resolvedCompany = company || companyname || "";
    const resolvedMessage = requirement || message || "";

    if (!phone && !email) {
      return fail(res, 400, "At least a phone number or email is required");
    }

    const mailPayload = {
      from: "no-reply@printkee.com",
      to: "sales@printkee.com",
      subject: req.file ? "New Custom Design Submission from Printkee" : "New Enquiry from Printkee",
      text: `
        Hi Team,

        You have received a new ${req.file ? "custom design submission" : "inquiry"} through Printkee.com. Please find the details below:

        Name: ${resolvedName}
        Company: ${resolvedCompany}
        Email: ${email || "N/A"}
        Phone: ${phone || "N/A"}
        Message: ${resolvedMessage}

        Please reach out to the user as soon as possible.

        Best regards,
        Printkee
      `,
    };

    // SDK field is `replyTo` — it maps to the API's `reply_to` internally.
    // Passing `reply_to` here is silently dropped, which breaks "reply to
    // the customer" straight from the sales inbox.
    if (email) mailPayload.replyTo = email;

    if (req.file) {
      mailPayload.attachments = [
        {
          filename: req.file.originalname || "customized-design.pdf",
          content: req.file.buffer,
        },
      ];
    }

    try {
      // The Resend SDK resolves with { data, error } instead of throwing on
      // API-level rejections (unverified domain, rate limit, bad address).
      // Without this check a rejected email would still report success and
      // the lead would be lost with no trace.
      const { data, error } = await resend.emails.send(mailPayload);

      if (error) {
        console.error("send-email: Resend rejected the message:", error);
        return fail(res, 502, error.message || "Failed to send email");
      }

      console.log(
        `send-email: lead delivered (id=${data?.id}) name="${resolvedName}" phone="${phone || "N/A"}" email="${email || "N/A"}"`
      );
      return ok(res, { message: "Email sent successfully!", id: data?.id });
    } catch (error) {
      // Network/transport failure — the SDK does throw for these.
      console.error("send-email: transport failure:", error.message);
      return fail(res, 502, "Failed to send email");
    }
  })
);

module.exports = router;
