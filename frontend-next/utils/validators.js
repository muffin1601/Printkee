export const validators = {
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  phone: (v) => /^[6-9]\d{9}$/.test(v.replace(/\s+/g, "")),
};
