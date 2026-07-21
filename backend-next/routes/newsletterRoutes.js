const express = require("express");
const router = express.Router();

const NewsletterSubscriber = require("../models/NewsletterSubscriber");
const { ok, fail, asyncHandler } = require("../utils/response");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post(
  "/subscribe",
  asyncHandler(async (req, res) => {
    const email = (req.body.email || "").trim().toLowerCase();

    if (!email || !EMAIL_RE.test(email)) {
      return fail(res, 400, "A valid email address is required");
    }

    const exists = await NewsletterSubscriber.findOne({ email });
    if (exists) {
      // Already subscribed — treat as success so the UI doesn't need to
      // special-case it, but don't create a duplicate record.
      return ok(res, { message: "You're already subscribed!" });
    }

    await NewsletterSubscriber.create({ email });
    return ok(res, { message: "Subscribed successfully!" }, 201);
  })
);

module.exports = router;
