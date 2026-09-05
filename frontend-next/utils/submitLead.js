import axios from "axios";

/**
 * Fans a lead out to both capture channels at once: the CRM (via our
 * server-side route, which holds the API key) and the sales inbox (via the
 * backend's Resend route).
 *
 * The two are dispatched in parallel rather than in sequence so the visitor
 * waits on the slower channel only, not the sum of both.
 *
 * Never throws — the chatbot flow (components/Chatbot) calls this without a
 * try/catch and depends on that.
 *
 * Returns { ok, crmOk, emailOk }:
 *   - `ok` is true when the lead reached AT LEAST ONE channel, which is what
 *     callers should use to decide whether to thank the visitor. Telling
 *     someone their enquiry failed when it is already sitting in the CRM
 *     just makes them submit again.
 *   - `crmOk` / `emailOk` remain available for callers that need detail.
 */
export const submitLead = async (data) => {
  const toCrm = (async () => {
    try {
      const res = await fetch("/api/crm-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.error("submitLead: CRM lead submission failed", res.status);
      }
      return res.ok;
    } catch (err) {
      console.error("submitLead: CRM request failed:", err.message);
      return false;
    }
  })();

  const toEmail = (async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/send-email`, data);
      return true;
    } catch (err) {
      console.error("submitLead: send-email failed:", err.message);
      return false;
    }
  })();

  const [crmOk, emailOk] = await Promise.all([toCrm, toEmail]);

  if (!crmOk && !emailOk) {
    console.error("submitLead: lead was not captured by any channel");
  }

  return { ok: crmOk || emailOk, crmOk, emailOk };
};
