# obj-sass

> convert Object to scss/sass variable String.

based on [gulp-json-sass](https://github.com/rbalicki2/gulp-json-sass)


## Install

```bash
$ npm install obj-sass
```

## Usage

```js
var objSass = require('obj-sass');
var options = {};
var sass = objSass(options);
```

### options
almost same options with `gulp-json-sass`.
but `obj` is added and `ignoreJsonErrors` is deleted.

see [gulp-json-sass](https://github.com/rbalicki2/gulp-json-sass#options)

#### obj
Type: `Object` Default: {}  
the `object` will be converted to scss/sass variable string.

```js
objSass({
  obj: {
    key: 'value',
    obj: {
        key: 0
    },
    array: [1, 2, 3]
  }
});

// output
// $key: value;
// $obj-key: 0;
// $array-0: 1;
// $array-1: 2;
// $array-2: 3;
//
```

## License
[MIT](http://opensource.org/licenses/MIT)
