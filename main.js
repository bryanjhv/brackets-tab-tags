/*jslint nomen: true, vars: true */
/*global define, brackets*/

define(function (require, exports, module) {

  'use strict';

  // Brackets modules
  var EditorManager = brackets.getModule('editor/EditorManager'),
    KeyEvent        = brackets.getModule('utils/KeyEvent');

  function _createIndentation(editor) {
    return editor._getOption('useTabChar')
      ? '\t'
      : Array(editor._getOption('spaceUnits') + 1).join(' ');
  }

  function _indent(editor, event, whenMatches) {
    var document = editor.document,
      cursorPos = editor.getCursorPos(),
      ch = cursorPos.ch,
      lineContent = document.getLine(cursorPos.line);

    if (whenMatches === lineContent.substring(ch - 1).substring(0, 2)) {
      var indent = _createIndentation(editor);

      // Here we filter all tabs, so if:
      // code_here
      // <tab>another_code
      //
      // <tab>and_another
      // code_again
      // another_code haves a <tab>
      var tabs = lineContent.split(/\S+/)[0];
      document.replaceRange(
        '\n' + tabs + indent + '\n' + tabs,
        cursorPos,
        cursorPos
      );
      event.preventDefault();
      cursorPos = editor.getCursorPos();
      editor.setCursorPos(cursorPos.line - 1, document.getLine(cursorPos.line - 1).length);
    }
  }

  function _keyEventHandler($event, editor, event) {
    // On ENTER pressed
    if (event.keyCode === KeyEvent.DOM_VK_RETURN) {
      var fileLang = editor.document.language._id;
      // Stuff

      // For HTML, PHP (mixed) and XML
      if (fileLang === 'html' || fileLang === 'php' || fileLang === 'xml') {
        _indent(editor, event, '><');
      }
      // For Javascript, PHP, CSS, LESS, SCSS support both '{}' and '()'
      if (fileLang === 'javascript' || fileLang === 'php' || fileLang === 'css' || fileLang === 'less' || fileLang === 'scss') {
        _indent(editor, event, '{}');
        _indent(editor, event, '()');
      }
    }
  }

  function _activeEditorChangeHandler($event, focusedEditor, lostEditor) {
    if (lostEditor) {
      lostEditor.off('keydown', _keyEventHandler);
    }
    if (focusedEditor) {
      focusedEditor.on('keydown', _keyEventHandler);
    }
  }

  EditorManager.on('activeEditorChange', _activeEditorChangeHandler);

});
