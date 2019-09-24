const config = module.exports;

const userRoles = config.userRoles = {
  user: 1,     // ...010
  supervisor: 3,
  admin: 4     // ...100
};

config.accessLevels = {
  supervisor: [userRoles.admin, userRoles.supervisor],                   // ...111
  user: [userRoles.admin, userRoles.user, userRoles.supervisor],        // ...110
  admin: [userRoles.admin]                                             // ...100
};

