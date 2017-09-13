'use strict';

var _app = require('app');

var _app2 = _interopRequireDefault(_app);

var _browserWindow = require('browser-window');

var _browserWindow2 = _interopRequireDefault(_browserWindow);

var _dialog = require('dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _electron = require('electron');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.on('ready', function () {

    var win = new _browserWindow2.default({
        'width': 800, 'height': 600,
        'auto-hide-menu-bar': true,
        'web-preferences': { 'webaudio': true }
    });

    _electron.ipcMain.on('openFileDialog', function (_ref, args) {
        var sender = _ref.sender;
        return _dialog2.default.showOpenDialog(args, function (paths) {
            return sender.send('openFileDialog', paths);
        });
    });

    win.maximize();
    win.loadURL('file://' + __dirname + '/app.html');
    win.openDevTools();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsY0FBSSxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVc7O0FBRXZCLFFBQU0sR0FBRyxHQUFHLDRCQUFrQjtBQUMxQixlQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHO0FBQzNCLDRCQUFvQixFQUFFLElBQUk7QUFDMUIseUJBQWlCLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO0tBQzFDLENBQUMsQ0FBQTs7QUFFRixjQVZLLE9BQU8sQ0FVUixFQUFFLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWEsSUFBSTtZQUFkLE1BQU0sUUFBTixNQUFNO2VBQzlCLGlCQUFPLGNBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBQSxLQUFLO21CQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQztTQUFBLENBQUM7S0FBQSxDQUFDLENBQUE7O0FBRTlDLE9BQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUNkLE9BQUcsQ0FBQyxPQUFPLGFBQVcsU0FBUyxlQUFZLENBQUE7QUFDM0MsT0FBRyxDQUFDLFlBQVksRUFBRSxDQUFBO0NBRXJCLENBQUMsQ0FBQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwcCBmcm9tICdhcHAnXG5pbXBvcnQgQnJvd3NlcldpbmRvdyBmcm9tICdicm93c2VyLXdpbmRvdydcbmltcG9ydCBkaWFsb2cgZnJvbSAnZGlhbG9nJ1xuaW1wb3J0IHsgaXBjTWFpbiBhcyBpcGMgfSBmcm9tICdlbGVjdHJvbidcblxuYXBwLm9uKCdyZWFkeScsIGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3Qgd2luID0gbmV3IEJyb3dzZXJXaW5kb3coe1xuICAgICAgICAnd2lkdGgnOiA4MDAsICdoZWlnaHQnOiA2MDAsXG4gICAgICAgICdhdXRvLWhpZGUtbWVudS1iYXInOiB0cnVlLFxuICAgICAgICAnd2ViLXByZWZlcmVuY2VzJzogeyAnd2ViYXVkaW8nOiB0cnVlIH1cbiAgICB9KVxuXG4gICAgaXBjLm9uKCdvcGVuRmlsZURpYWxvZycsICh7IHNlbmRlciB9LCBhcmdzKSA9PlxuICAgICAgICBkaWFsb2cuc2hvd09wZW5EaWFsb2coYXJncywgcGF0aHMgPT5cbiAgICAgICAgICAgIHNlbmRlci5zZW5kKCdvcGVuRmlsZURpYWxvZycsIHBhdGhzKSkpXG4gICAgICAgICAgICBcbiAgICB3aW4ubWF4aW1pemUoKVxuICAgIHdpbi5sb2FkVVJMKGBmaWxlOi8vJHtfX2Rpcm5hbWV9L2FwcC5odG1sYClcbiAgICB3aW4ub3BlbkRldlRvb2xzKClcblxufSlcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
