'use strict';

var _electron = require('electron');

_electron.app.on('ready', function () {

    var win = new _electron.BrowserWindow({
        'width': 1024, 'height': 768,
        'auto-hide-menu-bar': true,
        'title': 'Audio Analyzer Prototype - Sebastian Kehr',
        'web-preferences': { 'webaudio': true }
    });

    _electron.ipcMain.on('openFileDialog', function (_ref, args) {
        var sender = _ref.sender;
        return _electron.dialog.showOpenDialog(args, function (paths) {
            return sender.send('openFileDialog', paths);
        });
    });

    win.loadURL('file://' + __dirname + '/app.html');
    /*win.maximize()*/
    /*win.openDevTools()*/
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsib24iLCJ3aW4iLCJhcmdzIiwic2VuZGVyIiwic2hvd09wZW5EaWFsb2ciLCJzZW5kIiwicGF0aHMiLCJsb2FkVVJMIiwiX19kaXJuYW1lIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLGNBQUlBLEVBQUosQ0FBTyxPQUFQLEVBQWdCLFlBQVc7O0FBRXZCLFFBQU1DLE1BQU0sNEJBQWtCO0FBQzFCLGlCQUFTLElBRGlCLEVBQ1gsVUFBVSxHQURDO0FBRTFCLDhCQUFzQixJQUZJO0FBRzFCLGlCQUFTLDJDQUhpQjtBQUkxQiwyQkFBbUIsRUFBRSxZQUFZLElBQWQ7QUFKTyxLQUFsQixDQUFaOztBQU9BLHNCQUFJRCxFQUFKLENBQU8sZ0JBQVAsRUFBeUIsZ0JBQWFFLElBQWI7QUFBQSxZQUFHQyxNQUFILFFBQUdBLE1BQUg7QUFBQSxlQUNyQixpQkFBT0MsY0FBUCxDQUFzQkYsSUFBdEIsRUFBNEI7QUFBQSxtQkFDeEJDLE9BQU9FLElBQVAsQ0FBWSxnQkFBWixFQUE4QkMsS0FBOUIsQ0FEd0I7QUFBQSxTQUE1QixDQURxQjtBQUFBLEtBQXpCOztBQUlBTCxRQUFJTSxPQUFKLGFBQXNCQyxTQUF0QjtBQUNBO0FBQ0E7QUFFSCxDQWpCRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXBjTWFpbiBhcyBpcGMsIGFwcCwgZGlhbG9nLCBCcm93c2VyV2luZG93IH0gZnJvbSAnZWxlY3Ryb24nXG5cbmFwcC5vbigncmVhZHknLCBmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHdpbiA9IG5ldyBCcm93c2VyV2luZG93KHtcbiAgICAgICAgJ3dpZHRoJzogMTAyNCwgJ2hlaWdodCc6IDc2OCxcbiAgICAgICAgJ2F1dG8taGlkZS1tZW51LWJhcic6IHRydWUsXG4gICAgICAgICd0aXRsZSc6ICdBdWRpbyBBbmFseXplciBQcm90b3R5cGUgLSBTZWJhc3RpYW4gS2VocicsXG4gICAgICAgICd3ZWItcHJlZmVyZW5jZXMnOiB7ICd3ZWJhdWRpbyc6IHRydWUgfVxuICAgIH0pXG5cbiAgICBpcGMub24oJ29wZW5GaWxlRGlhbG9nJywgKHsgc2VuZGVyIH0sIGFyZ3MpID0+XG4gICAgICAgIGRpYWxvZy5zaG93T3BlbkRpYWxvZyhhcmdzLCBwYXRocyA9PlxuICAgICAgICAgICAgc2VuZGVyLnNlbmQoJ29wZW5GaWxlRGlhbG9nJywgcGF0aHMpKSlcblxuICAgIHdpbi5sb2FkVVJMKGBmaWxlOi8vJHtfX2Rpcm5hbWV9L2FwcC5odG1sYClcbiAgICAvKndpbi5tYXhpbWl6ZSgpKi9cbiAgICAvKndpbi5vcGVuRGV2VG9vbHMoKSovXG5cbn0pXG4iXX0=
