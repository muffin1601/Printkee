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

    if (email) mailPayload.reply_to = email;

    if (req.file) {
      mailPayload.attachments = [
        {
          filename: req.file.originalname || "customized-design.pdf",
          content: req.file.buffer,
        },
      ];
    }

    try {
      const response = await resend.emails.send(mailPayload);
      return ok(res, { message: "Email sent successfully!", response });
    } catch (error) {
      console.error("Error sending email:", error.message);
      return fail(res, 500, "Failed to send email");
    }
  })
);

module.exports = router;
