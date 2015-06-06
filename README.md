# deep-compact

This method does a depth first removal of empty values ( [], {}, ''). Other falsey values are preserved.

For example, it will  return an empty object for the following:
 
 ```
{ key : [ false, { foo: {}, bar: [] } ] } => {}
```

It will return `[false]` for the following:

```
[[], false, {}] => [ false ]
```