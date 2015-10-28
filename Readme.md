# recompile-swig-loader for [webpack]

Exports a [Swig] template as a compiled template for [webpack].


[![Status](http://img.shields.io/travis/wmdmark/precompile-swig-loader/master.svg?style=flat)](https://travis-ci.org/wmdmark/precompile-swig-loader "See test builds")

## Usage

[Documentation: using loaders](http://webpack.github.io/docs/using-loaders.html)

## Quick start guide

Install this into your project:

    $ npm install --save precompile-swig-loader

Make all your `.html` files compile down to [Swig] templates by 
modifying your `webpack.config.js` file:

```js
/* webpack.config.js */
module.exports = {
  module: {
    loaders: [
      { test: /\.html$/, loader: 'precompile-swig' }
    ]
  },
  ...
};
```

Then use your Swig templates via `swig.run`:

```js
var result = swig.run(require('./greet.html'), {greeting: "Hello World!"});
```

## Alternate usage
You can also use it without modifying your config. Just explicitly call it on 

your `require()` call via a prefix:

```js
var result = swig.run(require('precompile-swig!./greet.html'), {greeting: "Hello World!"});
```

Thanks
------

[Swig]: http://paularmstrong.github.io/swig/
[webpack]: http://webpack.github.io/

**precompile-swig-loader** © 2015+, Mark Johnson. Released under the [MIT] License.<br>
Authored and maintained by Mark Johnson.

> GitHub [@wmdmark](https://github.com/wmdmark) &nbsp;&middot;&nbsp;
> Twitter [@wmdmark](https://twitter.com/wmdmark)

[MIT]: http://mit-license.org/
