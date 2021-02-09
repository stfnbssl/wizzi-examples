/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\wizzi\productions.js.ittf
*/
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadModelFs = loadModelFs;
exports.generateArtifactFs = generateArtifactFs;
exports.scanIttfDocumentFs = scanIttfDocumentFs;
exports.scanIttfFolderFs = scanIttfFolderFs;
exports.inferAndLoadContextFs = inferAndLoadContextFs;
exports.parseFilePath = parseFilePath;

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

var wizzi = _interopRequireWildcard(require("wizzi"));

var _wizziUtils = require("wizzi-utils");

var _config = require("../config");

var _factory = require("./factory");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function loadModelFs(_x, _x2) {
  return _loadModelFs.apply(this, arguments);
}

function _loadModelFs() {
  _loadModelFs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(filePath, context) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
                var schemaName, wf;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        schemaName = schemaFromFilePath(filePath);

                        if (schemaName) {
                          _context.next = 3;
                          break;
                        }

                        return _context.abrupt("return", reject('File is not a known ittf document: ' + filePath));

                      case 3:
                        _context.next = 5;
                        return (0, _factory.createFilesystemFactory)();

                      case 5:
                        wf = _context.sent;
                        wf.loadModel(schemaName, filePath, {
                          mTreeBuildUpContext: context
                        }, function (err, result) {
                          if (err) {
                            return reject(err);
                          } // console.log('Generated artifact', result);


                          resolve(result);
                        });

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x11, _x12) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadModelFs.apply(this, arguments);
}

function generateArtifactFs(_x3, _x4) {
  return _generateArtifactFs.apply(this, arguments);
}

function _generateArtifactFs() {
  _generateArtifactFs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(filePath, context) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
                var generator, wf;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        generator = generatorFor(filePath);

                        if (!generator) {
                          _context3.next = 9;
                          break;
                        }

                        console.log('using artifact generator', generator);
                        _context3.next = 5;
                        return (0, _factory.createFilesystemFactory)();

                      case 5:
                        wf = _context3.sent;
                        wf.loadModelAndGenerateArtifact(filePath, {
                          modelRequestContext: context || {}
                        }, generator, function (err, result) {
                          if (err) {
                            return reject(err);
                          }

                          console.log('Generated artifact', result);
                          resolve({
                            artifactContent: result,
                            sourcePath: filePath,
                            artifactGenerator: generator
                          });
                        });
                        _context3.next = 10;
                        break;

                      case 9:
                        reject('No artifact generator available for document ' + filePath);

                      case 10:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x13, _x14) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _generateArtifactFs.apply(this, arguments);
}

function scanIttfDocumentFs(_x5, _x6) {
  return _scanIttfDocumentFs.apply(this, arguments);
}

function _scanIttfDocumentFs() {
  _scanIttfDocumentFs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(filePath, rootFolder) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", new Promise(function (resolve, reject) {
              return _wizziUtils.ittfDocumentScanner.scan(filePath, {
                rootFolder: rootFolder
              }, function (err, result) {
                if (err) {
                  return reject(err);
                }

                resolve(result);
              });
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _scanIttfDocumentFs.apply(this, arguments);
}

function scanIttfFolderFs(_x7, _x8) {
  return _scanIttfFolderFs.apply(this, arguments);
}

function _scanIttfFolderFs() {
  _scanIttfFolderFs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(filePath, rootFolder) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", new Promise(function (resolve, reject) {
              return _wizziUtils.folderBrowse.scan(filePath, {
                rootFolder: rootFolder
              }, function (err, result) {
                if (err) {
                  return reject(err);
                }

                resolve(result);
              });
            }));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _scanIttfFolderFs.apply(this, arguments);
}

function inferAndLoadContextFs(_x9, _x10) {
  return _inferAndLoadContextFs.apply(this, arguments);
}

function _inferAndLoadContextFs() {
  _inferAndLoadContextFs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(filePath, exportName) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", new Promise(function (resolve, reject) {
              var pf = parseFilePath(filePath);

              if (pf.isIttfDocument && pf.schema !== 'json') {
                var twinJsonPath = path.join(path.dirname(filePath), pf.seedname + '.json.ittf');

                if (fs.existsSync(twinJsonPath)) {
                  loadModelFs(twinJsonPath, {}).then(function (model) {
                    return resolve(_defineProperty({}, exportName, model));
                  })["catch"](function (err) {
                    return reject(err);
                  });
                } else {
                  resolve({});
                }
              } else {
                resolve({});
              }
            }));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _inferAndLoadContextFs.apply(this, arguments);
}

var schemaModuleMap = {
  css: 'css/document',
  graphql: 'graphql/document',
  ittf: 'ittf/document',
  js: 'js/module',
  json: 'json/document',
  html: 'html/document',
  scss: 'scss/document',
  svg: 'svg/document',
  text: 'text/document',
  ts: 'ts/module',
  vml: 'vml/document',
  vue: 'vue/document',
  xml: 'xml/document'
};

function generatorFor(filePath) {
  var pf = parseFilePath(filePath);

  if (pf.isIttfDocument) {
    return schemaModuleMap[pf.schema];
  }

  return undefined;
}

function schemaFromFilePath(filePath) {
  var pf = parseFilePath(filePath);

  if (pf.isIttfDocument) {
    return pf.schema;
  }

  return undefined;
}

function parseFilePath(filePath) {
  var nameParts = path.basename(filePath).split('.');

  if (nameParts[nameParts.length - 1] === 'ittf') {
    return {
      isIttfDocument: true,
      schema: nameParts[nameParts.length - 2],
      seedname: nameParts.slice(0, -2).join('.')
    };
  } else {
    return {
      isIttfDocument: false,
      schema: nameParts[nameParts.length - 1],
      seedname: nameParts.slice(0, -1).join('.')
    };
  }
}