## Tab tags

A **very** simple [Brackets](http://brackets.io) extension to add a newline and
tab between HTML or XML tags, like Aptana Studio 3 does it, and enhance behavior
with JavaScript and PHP parentheses.

### How To Use
Simply code and if your cursor is between allowed indentation characters (`><`
in HTML/XML or `()` in JavaScript/PHP) then when you press `ENTER` it will be
converted to:
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

### TODO
* Check if this extension works in Macintosh.
