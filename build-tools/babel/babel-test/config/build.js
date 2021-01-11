var rm = require("rimraf");

rm('dist', err => {
  if (err) throw err;
});