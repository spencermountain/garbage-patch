<div align="center">
  <div><b>simple-json-patch</b></div>
  <img src="https://user-images.githubusercontent.com/399657/68222691-6597f180-ffb9-11e9-8a32-a7f38aa8bded.png"/>
  <div>json-pointer and json-patch implementation</div>
  <div><code>npm install simple-json-patch</code></div>
  <div align="center">
    <sub>
      by
      <a href="https://spencermounta.in/">Spencer Kelly</a>
    </sub>
  </div>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>

<div align="center">
  <div>
    <a href="https://npmjs.org/package/simple-json-patch">
     <img src="https://img.shields.io/npm/v/simple-json-patch.svg?style=flat-square" />
    </a>
    <a href="https://bundlephobia.com/result?p=simple-json-patch">
      <img src="https://badge-size.herokuapp.com/spencermountain/simple-json-patch/master/builds/simple-json-patch.min.js" />
    </a>
  </div>
</div>

<!-- spacer -->
<img height="85px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

[json patch](http://jsonpatch.com/) is a cool method for describing changes to a JSON object.

the idea is that it can clean up some muddled parts of a codebase, making the changes explicit.

Does the world need another json-patch implementation? no.

did I make one, and is it crappy? yes.

```js
const { get, make, apply } = require('./src')

// make a json valid pointer
let ptr = make(['foo', 1])
// '/foo/1'

// use it to get some data
let json = {
  foo: ['bar', 'baz'],
}
let result = get(ptr, json)
// 'baz'

// apply clean changes to the json
let patch = { op: 'add', path: '/foo/2', value: 'bar' }
apply(patch, json)
/*{
  foo: ['bar', 'baz', 'bar'],
}*/
```

there is nothing clever going on here.

these methods _takes inspiration_ from the [pointer spec](https://datatracker.ietf.org/doc/html/rfc6901)
and the [patch-spec](https://datatracker.ietf.org/doc/html/rfc6902) but have some differences:

1. _get()_ is more-forgiving
   if you give it a path '/foo/typo/9/wrong' it will just say `undefined`!
2. _apply()_ changes in-place (mutable)
   -and before you think 'hey this guy has never seen that Rich Hickey talk' - I have.
   I just think calling .clone() over and over is not my style.
3. _sneaky-append_ an 'add' patch on an array doesn't need an index, and assumes a push, when appropriate

```js
let json = { foo: [1] }
// according to the spec, this must be '/foo/[index]', which seemed annoying
let patch = { op: 'add', path: '/foo', value: 2 }
json = apply(patch, json) //normally this would be an arror
// {foo: [1, 2]}
```

4. _sneaky-splat_ an 'add' patch on an object doesn't need an key, if the value is also an object

```js
let json = { foo: { bar: true } }
let patch = { op: 'add', path: '/foo', value: { baz: true } }
apply(patch, json) //this would normally be an error, i think.
// { foo: { bar: true, baz: true } }
```

### API

- **make** - create a JSON pointer from a list of properties
- **get** - use a pointer to get data out of JSON
- **apply** - make modifications to a JSON object (in place)

### See Also

- [json-patch](https://github.com/dharmafly/jsonpatch.js) - 7kb
- [fast-json-patch](https://github.com/Starcounter-Jack/JSON-Patch/blob/master/dist/fast-json-patch.min.js) - 12kb
- [json-8](https://github.com/sonnyp/JSON8/tree/master/packages/patch)
- [jiff](https://github.com/cujojs/jiff)

MIT
