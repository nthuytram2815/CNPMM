const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5, // Giới hạn 5 requests
  message: 'Quá nhiều requests, thử lại sau 15 phút!'
});
module.exports = limiter;