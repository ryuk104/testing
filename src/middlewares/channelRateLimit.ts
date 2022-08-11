import checkRolePermissions from "./checkRolePermissions";
import rateLimit from "./rateLimit";
import permissions from '../utils/rolePermConstants';

module.exports = function (req, res, next) {
  if (!req.channel.rateLimit) {
    return next();
  }
  checkRolePermissions("channel rate limit", permissions.roles.ADMIN, false)(req, res, () => {
    if (!req.permErrorMessage) {
      return next();
    }
    rateLimit({name: 'message-' + req.channel.channelId, expire: req.channel.rateLimit, requestsLimit: 1})(req, res, next);
  })
}
