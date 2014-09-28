define(
"mods/debugger",
[],
function()
{
    return new function()
    {
        var _DEBUG = false;
        var _HASCONSOLE = typeof console != 'undefined' ? true : false;

        this.debug = function()
        {
            if (_DEBUG === true)
            {
                _debug(arguments);
            }            
        };
        this.disableDebug = function()
        {
            _DEBUG = false;
        };
        this.enableDebug = function()
        {
            _DEBUG = true;
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
