var path = require("path")
var fs = require("fs")
var swig = require("swig")

module.exports = function (source, map) {
  this.cacheable();

  var options = {
     filename: path.basename(this.resourcePath).split(".")[0],
     locals: {},
  }

  swig.setDefaults({
    loader: swig.loaders.fs(this.context),
  })

  try {
    var tmpl = swig.precompile(source, options).tpl.toString().replace('anonymous ', '')
    return "module.exports = " + tmpl + ";";  
  } catch (error) {
    console.log("swig compile error: ", error)
    throw("Swig template compile error: ", error())
  }
  
};
