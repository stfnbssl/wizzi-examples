/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\middleware\ittf.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IttfDocumentsMiddleware = void 0;

var _jsonStringifySafe = _interopRequireDefault(require("json-stringify-safe"));

var _util = _interopRequireDefault(require("util"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _parseurl = _interopRequireDefault(require("parseurl"));

var _express = require("express");

var _config = require("../features/config");

var _wizzi = require("../features/wizzi");

var _wizzi2 = require("wizzi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var IttfDocumentsMiddleware = function IttfDocumentsMiddleware(app) {
  console.log('IttfDocumentsMiddleware. Folder served from ', _path["default"].resolve(__dirname, '..', '..', '..', 'ittf'));
  app.use('/ittf', ittfMiddleware(_path["default"].resolve(__dirname, '..', '..', '..', 'ittf'), '/ittf'));
};

exports.IttfDocumentsMiddleware = IttfDocumentsMiddleware;
var extContentTypeMap = {
  '.css': 'text/css',
  '.gif': 'image/gif',
  '.html': 'text/html',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.scss': 'text/scss',
  '.svg': 'image/svg+xml',
  '.ttf': 'application/x-font-ttf',
  '.txt': 'text/plain',
  '.vtt': 'text/vtt',
  '.woff': 'application/x-font-woff',
  '.yaml': 'text/yanl',
  '.yml': 'text/yanl',
  '.xml': 'text/xml'
};

function contentTypeFor(file) {
  var nameParts = _path["default"].basename(file).split('.');

  if (nameParts[nameParts.length - 1] === 'ittf') {
    return extContentTypeMap['.' + nameParts[nameParts.length - 2]];
  }

  return undefined;
}

function ittfMiddleware(basePath, routePath) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var parsedUrl, urlPathName, pathname, filePath, extname, contentType, documentState, generated;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(req.method !== 'GET' && req.method !== 'HEAD')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", next());

            case 2:
              parsedUrl = (0, _parseurl["default"])(req);

              if (!(!parsedUrl || !parsedUrl.pathname)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", next());

            case 5:
              urlPathName = decodeURIComponent(parsedUrl.pathname);
              pathname = urlPathName;
              filePath = _path["default"].join(basePath, pathname);
              extname = _path["default"].extname(filePath);
              console.log('ittf.pathname, pathname, filePath', urlPathName, pathname, filePath, _path["default"].extname(filePath));

              if (!(_fs["default"].existsSync(filePath) === false)) {
                _context.next = 13;
                break;
              }

              console.log('filePath do not exists', filePath);
              return _context.abrupt("return", next());

            case 13:
              console.log('fs.statSync(filePath).isDirectory()', _fs["default"].statSync(filePath).isDirectory());

              if (!_fs["default"].statSync(filePath).isDirectory()) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", sendFolderScan(filePath, basePath, req.query.meta, res));

            case 16:
              contentType = contentTypeFor(filePath);
              console.log('contentType', contentType);

              if (!contentType) {
                _context.next = 35;
                break;
              }

              if (!(req.query.meta && req.query.meta === 'html')) {
                _context.next = 34;
                break;
              }

              _context.prev = 20;
              _context.next = 23;
              return _wizzi.wizziProds.scanIttfDocumentFs(filePath, _path["default"].dirname(basePath));

            case 23:
              documentState = _context.sent;
              _context.next = 26;
              return _wizzi.wizziProds.generateArtifactFs(_config.config.MetaHtmlIttfPath, {
                wizzischema: 'html',
                path: filePath,
                req: req,
                ds: documentState
              });

            case 26:
              generated = _context.sent;
              // console.log('generated.meta.document', generated.artifactContent);
              res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': generated.artifactContent.length
              });
              res.end(generated.artifactContent);
              _context.next = 34;
              break;

            case 31:
              _context.prev = 31;
              _context.t0 = _context["catch"](20);
              sendError(res, _context.t0, {
                format: 'json'
              });

            case 34:
              return _context.abrupt("return", contextLoader(filePath, req, function (err, modelContext) {
                if (err) {
                  sendError(res, err, {
                    format: 'json'
                  });
                }

                _wizzi.wizziProds.generateArtifactFs(filePath, modelContext).then(function (generated) {
                  console.log('generated.artifactContent', generated.artifactContent);
                  res.writeHead(200, {
                    'Content-Type': contentType,
                    'Content-Length': generated.artifactContent.length
                  });
                  res.end(generated.artifactContent);
                })["catch"](function (err) {
                  return sendError(res, err, {
                    format: 'json'
                  });
                });
              }));

            case 35:
              next(); //

            case 36:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[20, 31]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
} //


function contextLoader(_x4, _x5, _x6) {
  return _contextLoader.apply(this, arguments);
}

function _contextLoader() {
  _contextLoader = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resourceFilePath, req, callback) {
    var contextRequest, ss, requests, resultContext, repeatCount, repeat, twinJsonContext;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            contextRequest = req.query._context;

            if (!(contextRequest && contextRequest.length > 0)) {
              _context2.next = 12;
              break;
            }

            ss = contextRequest.split(';');
            requests = [];
            ss.forEach(function (element) {
              var request = {
                exportName: element,
                fullPath: undefined,
                relPath: undefined
              };
              var type_path = req.query['_' + element];
              console.log('contextLoader exportName, type_path', element, type_path);

              if (!type_path) {
                return callback({
                  requestedResource: resourceFilePath,
                  message: 'Missing query param for requested context model: ' + element
                });
              }

              var tp = type_path.split(';');
              request.type = tp[0];

              if (tp.length < 2) {
                request.relPath = './index.' + tp[0] + '.ittf';
              } else {
                request.relPath = tp[1];
              }

              console.log('contextLoader exportName, type_path, relPath', element, type_path, request.relPath);

              if (request.type === 'cheatsheet') {
                request.name = request.relPath;
                requests.push(request);
              } else {
                request.fullPath = _path["default"].join(_path["default"].dirname(resourceFilePath), request.relPath);
                requests.push(request);
              }

              console.log('contextLoader request', request);
            });
            console.log('contextLoader.requests', requests);
            resultContext = {};
            repeatCount = requests.length;

            repeat = function repeat(index) {
              if (index == repeatCount) {
                return callback(null, resultContext);
              }

              var request = requests[index];

              if (request.type === 'cheatsheet') {
                return callback('Context loader for cheatsheet type not implemented.'); //
              } else {
                _wizzi.wizziProds.loadModelFs(request.fullPath, {}).then(function (model) {
                  resultContext[request.exportName] = model;
                  repeat(index + 1);
                })["catch"](function (err) {
                  return callback(err);
                });
              }
            };

            repeat(0);
            _context2.next = 22;
            break;

          case 12:
            _context2.prev = 12;
            _context2.next = 15;
            return _wizzi.wizziProds.inferAndLoadContextFs(resourceFilePath, 'mpage');

          case 15:
            twinJsonContext = _context2.sent;
            return _context2.abrupt("return", callback(null, twinJsonContext));

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](12);
            return _context2.abrupt("return", callback(_context2.t0));

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[12, 19]]);
  }));
  return _contextLoader.apply(this, arguments);
}

function sendFolderScan(_x7, _x8, _x9, _x10) {
  return _sendFolderScan.apply(this, arguments);
}

function _sendFolderScan() {
  _sendFolderScan = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(folderPath, root, meta, res) {
    var folderState, generated;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _wizzi.wizziProds.scanIttfFolderFs(folderPath, _path["default"].dirname(root));

          case 3:
            folderState = _context3.sent;

            if (!(meta === 'json')) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", sendJSONStringified(res, folderState));

          case 8:
            _context3.next = 10;
            return _wizzi.wizziProds.generateArtifactFs(_config.config.MetaFolderIttfPath, {
              wizzischema: 'html',
              path: folderPath,
              fs: folderState
            });

          case 10:
            generated = _context3.sent;
            // console.log('generated.meta.document', generated.artifactContent);
            res.writeHead(200, {
              'Content-Type': 'text/html',
              'Content-Length': generated.artifactContent.length
            });
            res.end(generated.artifactContent);

          case 13:
            _context3.next = 18;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](0);
            sendError(res, _context3.t0, {
              format: 'json'
            });

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 15]]);
  }));
  return _sendFolderScan.apply(this, arguments);
}

function sendJSONStringified(res, wizziModelInstance) {
  res.send('<pre>' + (0, _jsonStringifySafe["default"])(cleanCircular(wizziModelInstance, []), null, 2) + '</pre>');
}

function cleanCircular(obj, stock) {
  if (!obj) {
    return;
  }

  if (stock.indexOf(obj) >= 0) {
    return;
  } else {
    stock.push(obj);
  }

  if (_typeof(obj) === 'object') {
    if (obj.length) {
      obj.forEach(function (element) {
        return cleanCircular(element, stock);
      });
      return;
    }

    if (obj.parent) {
      delete obj.parent;
    }

    if (obj.wzParent) {
      delete obj.wzParent;
    }

    if (obj.nodes) {
      delete obj.nodes;
    }

    if (obj.evalContext) {
      delete obj.evalContext;
    }

    if (obj.loadContext && obj.sourceKey) {
      delete obj.loadContext;
    }

    for (k in obj) {
      var item = obj[k];

      if (!item) {
        delete obj[k];
      } else {
        if (_typeof(item) === 'object' && item.length && item.length == 0) {
          delete obj[k];
        } else {
          cleanCircular(item, stock);
        }
      }
    }
  }

  return obj;
}

function sendError(res, err, options) {
  options = options || {};
  var code = options.code || 999;
  var errEmit = err;
  delete errEmit.__is_error;

  if (options.format === 'string') {
    if (typeof err !== 'string') {
      err = _util["default"].inspect(err, {
        depth: null
      });
    }

    errEmit = err.replace(new RegExp('\n', 'g'), '<br>');
  } else {
    if (err.stack && err.stack.split) {
      var stackArray = [];
      err.stack.split('\n').forEach(function (element) {
        return stackArray.push('    ' + element);
      });
      errEmit.stack = stackArray;
    }
  }

  res.setHeader('Content-Type', 'application/json');
  res.send((0, _jsonStringifySafe["default"])({
    code: code,
    error: errEmit
  }, null, 4));
}