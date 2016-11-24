var mouseWheelBlockingPanels = [];

function IsPointInRect(point, rect) {
    x1 = rect[0][0];
    x2 = rect[2][0];
    y1 = rect[0][1];
    y2 = rect[2][1];

    if ((x1 <= point[0]) && (point[0] <= x2) && 
        (y1 <= point[1]) && (point[1] <= y2)) {
        return true;
    } else {
        return false
    }
}

function BlockWheel(panel) {
    mouseWheelBlockingPanels.push(panel);
}

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

                    if (IsPointInRect(GameUI.GetCursorPosition(), rect) && panel.visible && panel.enabled && panel.BCanSeeInParentScroll()) {
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
