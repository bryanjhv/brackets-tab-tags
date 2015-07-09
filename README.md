## Tab tags

A **very** simple [Brackets](http://brackets.io) extension to add a newline and
tab between HTML or XML tags, like Aptana Studio 3 does it, and enhance behavior
with JavaScript and PHP parentheses, also CSS and preprocessors.

### How To Use

Simply code and if your cursor is between allowed indentation characters (`><`
in HTML/XML, `()` in JavaScript/PHP, and `{}` and `()` in CSS/LESS/SCSS) then
when you press `ENTER` it will be converted to:

```html
<tag>
  |
</tag>
```

```javascript
function my_function(
  |
) {}
```

```css
body {
  |
}
@media (
  |
) {}
```

### Plans

- Work with `Preferences` API to let user set its own indents.
- Optimize code a bit.
- Maybe hardcode the `KeyEvent` require?
