# Panorama Wheel Block
This snippet is designed for blocking mouse zoom when mouse is hovering some panel.
Note that blocking is simple check if mouse position is inside of panel rectangle. It also checks if panel visible or not.

## How to Use
Firstly, copy wheelblock.js to ``content/panorama/custom_game/scripts/``  
Include it in your ``custom_ui_manifest.xml``
```html
<include src="file://{resources}/scripts/custom_game/util.js" /> 
```
Finally, use this for every panel that needs to block mouse wheel:
```js 
// Root panel, be careful as usually root panel is stretched to whole screen
GameUI.CustomUIConfig().BlockWheel($.GetContextPanel());
// So it's safer to block elements individually
GameUI.CustomUIConfig().BlockWheel($("#changelogNotification"));
```
