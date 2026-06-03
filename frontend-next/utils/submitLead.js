import axios from "axios";

export const submitLead = async (data) => {
  try {
    await fetch("/api/crm-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/send-email`, data);
  } catch (err) {
    console.error("Lead submission failed:", err);
  }
};
