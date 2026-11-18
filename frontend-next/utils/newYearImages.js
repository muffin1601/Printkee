// Development uploads are served by the local API. Next's optimizer blocks
// private IPs; let the browser load those URLs without loosening SSRF protection.
export const isLocalUpload = (url = "") => /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\//i.test(url);
