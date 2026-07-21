import axios from "axios";

// Never throws — the chatbot flow (components/Chatbot) calls this without a
// try/catch and depends on that. Callers that need to show a real
// success/error message should check the returned { emailOk } instead of
// wrapping this in try/catch.
export const submitLead = async (data) => {
  let crmOk = false;
  let emailOk = false;

  try {
    const crmRes = await fetch("/api/crm-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    crmOk = crmRes.ok;
    if (!crmOk) console.error("submitLead: CRM lead submission failed", crmRes.status);
  } catch (err) {
    console.error("submitLead: CRM request failed:", err.message);
  }

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/send-email`, data);
    emailOk = true;
  } catch (err) {
    console.error("submitLead: send-email failed:", err.message);
  }

  return { crmOk, emailOk };
};
