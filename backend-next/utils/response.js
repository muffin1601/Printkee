// NOTE: success responses intentionally return the raw payload (not wrapped
// in {success,message,data}) because the existing frontend reads res.data /
// res.data.items directly everywhere. Wrapping them would silently break
// every admin CRUD screen. Error responses use a consistent envelope since
// the frontend never inspects error response bodies beyond a generic message.
function ok(res, data, status = 200) {
  return res.status(status).json(data);
}

function fail(res, status, message, error = null) {
  return res.status(status).json({ success: false, message, error, data: null });
}

function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = { ok, fail, asyncHandler };
