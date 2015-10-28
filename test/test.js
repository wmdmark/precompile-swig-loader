var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var expect = require('chai').expect
var assign = require('object-assign')
var rimraf = require('rimraf')
var jsdom = require('jsdom')

describe('precompile-swig-loader', function () {

  var testHTML = '<!DOCTYPE html><html><head></head><body></body></html>'
  var outputDir = path.resolve(__dirname, './output')
  var loaderPath = path.resolve(__dirname, '../index')
  
  var globalConfig = {
    output: {
      path: outputDir,
      filename: 'test.build.js'
    },
    module: {
      loaders: [
        {
          test: /\.swig$/,
          loader: loaderPath
        }
      ]
    }
  }

  beforeEach(function (done) {
    rimraf(outputDir, done)
  })

  function getFile (file, cb) {
    fs.readFile(path.resolve(outputDir, file), 'utf-8', function (err, data) {
      expect(err).to.be.null
      cb(data)
    })
  }

  function test (options, assert) {
    var config = assign({}, globalConfig, options)
    webpack(config, function (err) {
      expect(err).to.be.null
      getFile('test.build.js', function (data) {
        jsdom.env({
          html: testHTML,
          scripts: ['https://cdnjs.cloudflare.com/ajax/libs/swig/1.4.1/swig.js'],
          src: [data],
          done: function (err, window) {
            if (err) {
              console.log(err[0].data.error.stack)
              expect(err).to.be.null
            }
            assert(window)
          }
        })
      })
    })
  }

  it('basic', function (done) {
    test({
      entry: './test/fixtures/basic.js'
    }, function (window) {
      var module = window.testModule
      output = window.swig.run(module, {name: "world"})
      expect(output).to.contain("<h1>hello world!</h1>")
      done()
    })
  })

  it('import', function (done) {
    test({
      entry: './test/fixtures/import.js'
    }, function (window) {
      var module = window.testModule
      output = window.swig.run(module)
      expect(output).to.contain("<button>Howdy!</button>")
      done()
    })
  })   

  it('extends', function (done) {
    test({
      entry: './test/fixtures/extends.js'
    }, function (window) {
      var module = window.testModule
      output = window.swig.run(module)
      expect(output).to.contain("<h1>Title: My title</h1>")
      done()
    })
  })  

})