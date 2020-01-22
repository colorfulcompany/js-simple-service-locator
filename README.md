# Simple Service Locator

## APIs

 * `static prepare()`
 * `static reset()`
 * `static has(name)`
 * `static register(name, object, force = false)`
 * `static get(name)`
 * `static entries()`
 * `static bulkRegister(sets, force = false)`

## example

```javascript
const ServiceLocator = require('simple-service-locator')

class CustomError extends Error { get name () { return 'CustomError' } }

ServiceLocator.register('err', CustomError)
..
console.log(ServiceLocator.get('err'))
..
ServiceLocator.bulkRegister({
  service1: Service1,
  service2: Service2,
  ..
})
```
