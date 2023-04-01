## dynamically set token in postman

> in login route in postman go to Test tab and write below code:

```
 const jsonData=pm.response.json();
 pm.globals.set("token",jsonData.token);
```
_added postman documentation link in the end of this file._
[postman documentation](https://documenter.getpostman.com/view/20773865/2s93RUvXaE)
