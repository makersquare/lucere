# Code Syling Standards

Abide by the following rules when writing your code:

* 2-spaced tabs
* NO trailing white spaces (or extra lines)
* NO commented out code that is not being used
* Make useful comments to explain your code
* Use semicolons!!
* Be sure to modularize your code
* Name your variables appropriately
* Use a space before curly braces (for function definitions, conditionals, and loops) i.e. `function() {}`, `for(..) {}`
* Structure your if/else statements with the `else if` and `else` on a new line as follows:

```javascript
if(...) {
  
}
else if(...) {
  
}
else {
  
}
```
* Always use `{}` for your conditionals:

```javascript
// BAD
if(...)
  return true;
else
  return false;

// GOOD
if(...) {
  return true;
}
else {
  return false;
}
```