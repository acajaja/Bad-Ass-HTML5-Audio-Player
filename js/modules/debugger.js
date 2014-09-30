define(
"mods/debugger",
[],
function()
{
    return new function()
    {
        var _DEBUG = false;
        var _HASCONSOLE = typeof console != 'undefined' ? true : false;
        var _SELF = this;

        this.debug = function()
        {
            if (_DEBUG === true)
            {
                _debug(arguments);
            }            
        };
        this.disableDebug = function()
        {
            _SELF.setDebug(false);
        };
        this.enableDebug = function()
        {
            _SELF.setDebug(true);
        };
        this.setDebug = function(onOff)
        {
            _DEBUG = onOff;
        };

        function _debug()
        {
            for (x in arguments)
            {
                if (_HASCONSOLE)
                {
                    console.info(arguments[x]);
                }
                else
                {
                    alert(arguments[x]);
                }
            }
        }
    };
});
