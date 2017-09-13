System.config({
  baseURL: "../",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "ampersand-events": "npm:ampersand-events@1.1.1",
    "chroma-js": "npm:chroma-js@1.1.1",
    "d3": "npm:d3@3.5.10",
    "fft": "npm:fft@0.2.1",
    "fft-windowing": "npm:fft-windowing@0.1.4",
    "lodash": "npm:lodash@3.10.1",
    "ml-fft": "npm:ml-fft@1.0.5",
    "react": "npm:react@0.14.3",
    "react-dom": "npm:react-dom@0.14.3",
    "vinyl": "npm:vinyl@1.1.0",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.5.3"
    },
    "github:jspm/nodelibs-domain@0.1.0": {
      "domain-browser": "npm:domain-browser@1.1.4"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:ampersand-events@1.1.1": {
      "ampersand-version": "npm:ampersand-version@1.0.2",
      "lodash.assign": "npm:lodash.assign@3.2.0",
      "lodash.bind": "npm:lodash.bind@3.1.0",
      "lodash.foreach": "npm:lodash.foreach@3.0.3",
      "lodash.isempty": "npm:lodash.isempty@3.0.4",
      "lodash.keys": "npm:lodash.keys@3.1.2",
      "lodash.once": "npm:lodash.once@3.0.1",
      "lodash.uniqueid": "npm:lodash.uniqueid@3.0.0"
    },
    "npm:ampersand-version@1.0.2": {
      "find-root": "npm:find-root@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "through2": "npm:through2@0.6.5"
    },
    "npm:asap@2.0.3": {
      "domain": "github:jspm/nodelibs-domain@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:buffer@3.5.3": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "is-array": "npm:is-array@1.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:chroma-js@1.1.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:clone-stats@0.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:clone@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:domain-browser@1.1.4": {
      "events": "github:jspm/nodelibs-events@0.1.1"
    },
    "npm:envify@3.4.0": {
      "jstransform": "npm:jstransform@10.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "through": "npm:through@2.3.8"
    },
    "npm:esprima-fb@13001.1001.0-dev-harmony-fb": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:fbjs@0.3.2": {
      "core-js": "npm:core-js@1.2.6",
      "loose-envify": "npm:loose-envify@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "promise": "npm:promise@7.0.4",
      "ua-parser-js": "npm:ua-parser-js@0.7.9",
      "whatwg-fetch": "npm:whatwg-fetch@0.9.0"
    },
    "npm:find-root@0.1.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:jstransform@10.1.0": {
      "base62": "npm:base62@0.1.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "esprima-fb": "npm:esprima-fb@13001.1001.0-dev-harmony-fb",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.1.31"
    },
    "npm:lodash._baseassign@3.2.0": {
      "lodash._basecopy": "npm:lodash._basecopy@3.0.1",
      "lodash.keys": "npm:lodash.keys@3.1.2"
    },
    "npm:lodash._baseeach@3.0.4": {
      "lodash.keys": "npm:lodash.keys@3.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash._basetostring@3.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash._createassigner@3.1.1": {
      "lodash._bindcallback": "npm:lodash._bindcallback@3.0.1",
      "lodash._isiterateecall": "npm:lodash._isiterateecall@3.0.9",
      "lodash.restparam": "npm:lodash.restparam@3.6.1"
    },
    "npm:lodash._createwrapper@3.0.7": {
      "lodash._arraycopy": "npm:lodash._arraycopy@3.0.0",
      "lodash._basecreate": "npm:lodash._basecreate@3.0.3",
      "lodash._replaceholders": "npm:lodash._replaceholders@3.0.0"
    },
    "npm:lodash.assign@3.2.0": {
      "lodash._baseassign": "npm:lodash._baseassign@3.2.0",
      "lodash._createassigner": "npm:lodash._createassigner@3.1.1",
      "lodash.keys": "npm:lodash.keys@3.1.2"
    },
    "npm:lodash.bind@3.1.0": {
      "lodash._createwrapper": "npm:lodash._createwrapper@3.0.7",
      "lodash._replaceholders": "npm:lodash._replaceholders@3.0.0",
      "lodash.restparam": "npm:lodash.restparam@3.6.1"
    },
    "npm:lodash.foreach@3.0.3": {
      "lodash._arrayeach": "npm:lodash._arrayeach@3.0.0",
      "lodash._baseeach": "npm:lodash._baseeach@3.0.4",
      "lodash._bindcallback": "npm:lodash._bindcallback@3.0.1",
      "lodash.isarray": "npm:lodash.isarray@3.0.4"
    },
    "npm:lodash.isempty@3.0.4": {
      "lodash.isarguments": "npm:lodash.isarguments@3.0.4",
      "lodash.isarray": "npm:lodash.isarray@3.0.4",
      "lodash.isfunction": "npm:lodash.isfunction@3.0.6",
      "lodash.isstring": "npm:lodash.isstring@3.0.1",
      "lodash.keys": "npm:lodash.keys@3.1.2"
    },
    "npm:lodash.keys@3.1.2": {
      "lodash._getnative": "npm:lodash._getnative@3.9.1",
      "lodash.isarguments": "npm:lodash.isarguments@3.0.4",
      "lodash.isarray": "npm:lodash.isarray@3.0.4"
    },
    "npm:lodash.once@3.0.1": {
      "lodash.before": "npm:lodash.before@3.0.3"
    },
    "npm:lodash.uniqueid@3.0.0": {
      "lodash._basetostring": "npm:lodash._basetostring@3.0.1"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:loose-envify@1.1.0": {
      "js-tokens": "npm:js-tokens@1.0.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:promise@7.0.4": {
      "asap": "npm:asap@2.0.3",
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:react-dom@0.14.3": {
      "react": "npm:react@0.14.3"
    },
    "npm:react@0.14.3": {
      "envify": "npm:envify@3.4.0",
      "fbjs": "npm:fbjs@0.3.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.0.33": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:replace-ext@0.0.1": {
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:source-map@0.1.31": {
      "amdefine": "npm:amdefine@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.0.33"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:through2@0.6.5": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "readable-stream": "npm:readable-stream@1.0.33",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "xtend": "npm:xtend@4.0.1"
    },
    "npm:through@2.3.8": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:ua-parser-js@0.7.9": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vinyl@1.1.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "clone": "npm:clone@1.0.2",
      "clone-stats": "npm:clone-stats@0.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "replace-ext": "npm:replace-ext@0.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});
