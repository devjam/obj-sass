var firstCharacterIsNumber = /^[0-9]/;
// from http://stackoverflow.com/questions/17191265/legal-characters-for-sass-and-scss-variable-names
var escapableCharactersRegex = /(["!#$%&\'()*+,.\/:;\s<=>?@\[\]^\{\}|~])/g;

function replaceEscapableCharacters(str) {
  return str.replace(escapableCharactersRegex, function(a, b) {
    return '\\' + b;
  });
}

function loadVariablesRecursive(obj, path, opt, cb) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key];

      // escape invalid sass characters
      if (opt.escapeIllegalCharacters) {
        key = replaceEscapableCharacters(key);
      }

      // sass variables cannot begin with a number
      if (path === '' && firstCharacterIsNumber.exec(key) && opt.prefixFirstNumericCharacter) {
        key = opt.firstCharacter + key;
      }

      if (typeof val !== 'object') {
        cb('$' + path + key + ': ' + val + opt.eol);
      } else {
        loadVariablesRecursive(val, path + key + opt.delim, opt, cb);
      }
    }
  }
}

module.exports = function(opt) {
  opt = opt || {};
  opt.obj = opt.obj || {};
  opt.delim = opt.delim || '-';
  opt.sass = !!opt.sass;
  opt.eol = opt.sass ? '' : ';';
  opt.escapeIllegalCharacters = opt.escapeIllegalCharacters === undefined ? true : opt.escapeIllegalCharacters;
  opt.firstCharacter = opt.firstCharacter || '_';
  opt.prefixFirstNumericCharacter = opt.prefixFirstNumericCharacter === undefined ? true : opt.prefixFirstNumericCharacter;

  var sassVariables = [];
  loadVariablesRecursive(opt.obj, '', opt, function(assignmentString) {
    sassVariables.push(assignmentString);
  });

  return sassVariables.join('\n') + '\n';
}
