# Panorama Wheel Block
[![alt text](https://puu.sh/ssZ2D/a83f8d129d.png)](https://puu.sh/ssLrD/dc13da2ebb.mp4)
This snippet is designed for blocking mouse zoom when mouse is hovering some panel.
Note that blocking is simple check if mouse position is inside of panel rectangle. It also checks if panel visible or not.

## How to Use
Firstly, copy wheelblock.js to ``content/panorama/custom_game/scripts/``  
Include it in your ``custom_ui_manifest.xml``
```html
<include src="file://{resources}/scripts/custom_game/wheelblock.js" /> 
```
If you use your own mouse filter then combine panel check with it yourself.  
Finally, use this for every panel that needs to block mouse wheel:
```js 
// Root panel, be careful as usually root panel is stretched to whole screen
GameUI.CustomUIConfig().BlockWheel($.GetContextPanel());
// So it's safer to block elements individually
GameUI.CustomUIConfig().BlockWheel($("#changelogNotification"));
```
