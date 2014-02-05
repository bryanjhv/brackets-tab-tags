/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $ */

define(function (require, exports, module) {
    
    "use strict";
    
    // Brackets modules
    var AppInit         = brackets.getModule("utils/AppInit"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        EditorManager   = brackets.getModule("editor/EditorManager"),
        KeyEvent        = brackets.getModule("utils/KeyEvent");
    
    // Function to handle when user presses ENTER
    var _keyEventHandler = function ($event, editor, event) {
        // If the user pressed ENTER (RETURN)
        if (event.type === "keydown" && event.keyCode === KeyEvent.DOM_VK_RETURN) {
            var fileLang = DocumentManager.getCurrentDocument().getLanguage()._id;
            // If current file is HTML, PHP or XML
            if (fileLang === "html" || fileLang === "php" || fileLang === "xml") {
                var cursorPos = editor.getCursorPos();
                var ch = cursorPos.ch;
                var lineContent = editor.document.getLine(cursorPos.line);
                // If the cursor is inside a tag
                if ("><" === lineContent.substring(ch - 1, ch) + lineContent.substring(ch, ch + 1)) {
                    var start = {
                        line: cursorPos.line,
                        ch: cursorPos.ch
                    };
                    // Filter "\t", so if we have:
                    // <html>
                    //     <head>
                    //         
                    //     </head>
                    // </html>
                    // then "<head>" haves a "\t".
                    var _tabs = lineContent.split(/\S+/)[0];
                    editor.document.replaceRange("\n" + _tabs + "\t\n" + _tabs, start, cursorPos);
                    event.preventDefault();
                    cursorPos = editor.getCursorPos();
                    editor.setCursorPos(cursorPos.line - 1, editor.document.getLine(cursorPos.line).length - 1);
                }
            }
        }
    };
    
    var _activeEditorChangeHandler = function ($event, focusedEditor, lostEditor) {
		if (lostEditor) {
			$(lostEditor).off("keyEvent", _keyEventHandler);
		}
		if (focusedEditor) {
			$(focusedEditor).on("keyEvent", _keyEventHandler);
		}
	};
    
    AppInit.appReady(function () {
        var currentEditor = EditorManager.getCurrentFullEditor();
		$(currentEditor).on("keyEvent", _keyEventHandler);
		$(EditorManager).on("activeEditorChange", _activeEditorChangeHandler);
    });
    
});