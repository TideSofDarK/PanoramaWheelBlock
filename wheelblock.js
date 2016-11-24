var mouseWheelBlockingPanels = [];

function BlockWheel(panel) {
    mouseWheelBlockingPanels.push(panel);
};

(function(){
	GameUI.CustomUIConfig().BlockWheel = BlockWheel;

    GameUI.SetMouseCallback( function( eventName, arg ) {
        var nMouseButton = arg
        var CONSUME_EVENT = true;
        var CONTINUE_PROCESSING_EVENT = false;
        if ( GameUI.GetClickBehaviors() !== CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_NONE )
            return CONTINUE_PROCESSING_EVENT;

        if (eventName === "pressed" && (arg == 5 || arg == 6))
        {
            for (var key in mouseWheelBlockingPanels) {
                var panel = mouseWheelBlockingPanels[key];

                try {
                    var pX = panel.GetPositionWithinWindow()["x"];
                    var pY = panel.GetPositionWithinWindow()["y"];

                    var rect = [[pX, pY], [pX + panel.actuallayoutwidth, pY], [pX + panel.actuallayoutwidth, pY + panel.actuallayoutheight], [pX, pY + panel.actuallayoutheight]]; //Util.isPointInRect(, [pX, pY, , ])

                    if (Util.isPointInRect(GameUI.GetCursorPosition(), rect) && panel.visible && panel.enabled && panel.BCanSeeInParentScroll()) {
                        return CONSUME_EVENT;
                    }
                } catch (err) {
                	$.Msg("Failed attempt to block mouse wheel: panel is either deleted or nil");
                }
            }
        }

        return CONTINUE_PROCESSING_EVENT;
    } );
})()