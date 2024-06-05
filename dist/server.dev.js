"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _client = require("@prisma/client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var prisma = new _client.PrismaClient();
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.post('/usuarios', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(prisma.user.create({
            data: {
              email: req.body.email,
              name: req.body.name,
              age: req.body.age
            }
          }));

        case 2:
          res.status(201).json(req.body);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.put('/usuarios/:id', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(prisma.user.update({
            where: {
              id: req.params.id
            },
            data: {
              email: req.body.email,
              name: req.body.name,
              age: req.body.age
            }
          }));

        case 2:
          res.status(200).json(req.body);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app["delete"]('/usuarios/:id', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(prisma.user["delete"]({
            where: {
              id: req.params.id
            }
          }));

        case 2:
          res.status(200).json({
            message: "Usuário deletado com Sucesso!"
          });

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get('/usuarios', function _callee4(req, res) {
  var filters, age, users;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          filters = {};

          if (req.query.name) {
            filters.name = req.query.name;
          }

          if (req.query.email) {
            filters.email = req.query.email;
          }

          if (!req.query.age) {
            _context4.next = 10;
            break;
          }

          age = parseInt(req.query.age, 10);

          if (isNaN(age)) {
            _context4.next = 9;
            break;
          }

          filters.age = age;
          _context4.next = 10;
          break;

        case 9:
          return _context4.abrupt("return", res.status(400).json({
            message: "Age deve ser um número válido"
          }));

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(prisma.user.findMany({
            where: filters
          }));

        case 12:
          users = _context4.sent;
          res.status(200).json(users);

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.listen(3000);