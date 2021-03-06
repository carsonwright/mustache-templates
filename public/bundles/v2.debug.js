var ApiClient,SimplePromise,Traitify,console;Array.prototype.map||(Array.prototype.map=function(t,e){var r,n,o,i,s,a,u;if(o=void 0,r=void 0,i=void 0,"undefined"==typeof this||null===this)throw new TypeError(" this is null or not defined");if(n=Object(this),a=n.length>>>0,"function"!=typeof t)throw new TypeError(t+" is not a function");for(e&&(o=e),r=new Array(a),i=0;a>i;)s=void 0,u=void 0,i in n&&(s=n[i],u=t.call(o,s,i,n),r[i]=u),i++;return r}),Array.prototype.filter||(Array.prototype.filter=function(t){"use strict";var e,r,n,o,i,s;if(void 0===this||null===this)throw new TypeError;if(o=Object(this),r=o.length>>>0,"function"!=typeof t)throw new TypeError;for(n=[],i=arguments[1],e=0;r>e;)e in o&&(s=o[e],t.call(i,s,e,o)&&n.push(s)),e++;return n}),Array.prototype.indexOf||(Array.prototype.indexOf=function(t){var e,r;for(r=this.length>>>0,e=Number(arguments[1])||0,e=0>e?Math.ceil(e):Math.floor(e),0>e&&(e+=r);r>e;){if(e in this&&this[e]===t)return e;e++}return-1}),console||(console={log:function(){}}),Object.keys||(Object.keys=function(){"use strict";var t,e,r,n;return n=Object.prototype.hasOwnProperty,r=!{toString:null}.propertyIsEnumerable("toString"),t=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],e=t.length,function(o){var i,s,a;if("object"!=typeof o&&("function"!=typeof o||null===o))throw new TypeError("Object.keys called on non-object");a=[],s=void 0,i=void 0;for(s in o)n.call(o,s)&&a.push(s);if(r)for(i=0;e>i;)n.call(o,t[i])&&a.push(t[i]),i++;return a}}()),SimplePromise=function(t){var e;return e=Object(),e.then=function(t){return e.thenCallback=t,e.resolved&&e.thenCallback(e.data),e},e.resolved=!1,e.resolve=function(t){return e.data=t,e.thenCallback?e.thenCallback(t):e.resolved=!0,e},e["catch"]=function(t){return e.rejected?t(e.error):e.rejectCallback=t,e},e.rejected=!1,e.reject=function(t){return e.error=t,e.rejectCallback?e.rejectCallback(t):e.rejected=!0,e},t(e.resolve,e.reject),e},ApiClient=function(){function t(){this.host="https://api.traitify.com",this.version="v1",this.oldIE="undefined"!=typeof XDomainRequest?!0:!1,this.beautify=!1,this.XHR=XMLHttpRequest}return t.prototype.online=function(){return navigator.onLine},t.prototype.setBeautify=function(t){return this.beautify=t,this},t.prototype.setHost=function(t){return t.match(/http/)||(t="https://"+t),this.oldIE&&(t=t.replace("https://","").replace("http://",""),t=location.protocol+"//"+t),this.host=t,this},t.prototype.setPublicKey=function(t){return this.publicKey=t,this},t.prototype.setVersion=function(t){return this.version=t,this},t.prototype.ajax=function(t,e,r,n){var o,i,s,a,u,c,p,l;if(o=this.beautify,p=this.host+"/"+this.version+e,l=new this.XHR,"withCredentials"in l&&!this.oldIE)l.open(t,p,!0);else{if("undefined"==typeof XDomainRequest)return new SimplePromise(function(t,e){return e("CORS is Not Supported By This Browser")});this.oldIE&&(c=(new Date).getTime(),p+=-1===p.indexOf("?")?"?authorization="+this.publicKey+"&reset_cache="+c:"&authorization="+this.publicKey+"&reset_cache="+c),l=new XDomainRequest,l.open(t,p)}return l&&!this.oldIE&&(l.setRequestHeader("Authorization","Basic "+btoa(this.publicKey+":x")),l.setRequestHeader("Content-type","application/json"),l.setRequestHeader("Accept","application/json")),u=this,s=this.online(),i=this.oldIE,a=new SimplePromise(function(t,e){var a;if(u.reject=e,!s)return u.reject();try{return l.onload=function(){var e;return 404===l.status?u.reject(l.response):(e=i?l.responseText:l.response,o&&(e=e.replace(/_([a-z])/g,function(t,e){return e.toUpperCase()}).replace(/_/g,"")),e=JSON.parse(e),r&&r(e),u.resolve=t,u.resolve(e))},l.onprogress=function(){},l.ontimeout=function(){},l.onerror=function(){},window.setTimeout(function(){var t;try{return l.send(JSON.stringify(n))}catch(e){return t=e,u.reject(t)}},0),l}catch(c){return a=c,u.reject(a)}})},t.prototype.put=function(t,e,r){return this.oldIE?this.ajax("POST",t,r,e):this.ajax("PUT",t,r,e)},t.prototype.get=function(t,e){return this.ajax("GET",t,e,"")},t.prototype.getDecks=function(t){return this.get("/decks",t)},t.prototype.getSlides=function(t,e){return this.get("/assessments/"+t+"/slides",e)},t.prototype.addSlide=function(t,e,r,n,o){return this.put("/assessments/"+t+"/slides/"+e,{response:r,time_taken:n},o)},t.prototype.addSlides=function(t,e,r){return this.put("/assessments/"+t+"/slides",e,r)},t.prototype.getPersonalityTypes=function(t,e,r){var n,o,i,s,a;for(null==e&&(e=Object()),null==e.image_pack&&(e.image_pack="linear"),s=Array(),a=Object.keys(e),n=0,i=a.length;i>n;n++)o=a[n],s.push(o+"="+e[o]);return this.get("/assessments/"+t+"/personality_types?"+s.join("&"),r)},t.prototype.getPersonalityTraits=function(t,e,r){return this.get("/assessments/"+t+"/personality_traits/raw",r)},t.prototype.getCareers=function(t,e,r){var n,o,i,s,a;for(null==e&&(e=Object()),null==e.number_of_matches&&(e.number_of_matches=8),s=Array(),a=Object.keys(e),n=0,i=a.length;i>n;n++)o=a[n],s.push(o+"="+e[o]);return this.get("/assessments/"+t+"/matches/careers?"+s.join("&"),r)},t}(),Traitify=new ApiClient;
Traitify.host = "https://api-sandbox.traitify.com";

Traitify.setProduction = function(value) {
  if (value) {
    return this.host = "https://api.traitify.com";
  } else {
    return "https://api-sandbox.traitify.com";
  }
};

Traitify.version = "v1";

/* Riot v2.0.12, @license MIT, (c) 2015 Muut Inc. + contributors */

;(function() {

  var riot = { version: 'v2.0.12', settings: {} }

  'use strict'

riot.observable = function(el) {

  el = el || {}

  var callbacks = {},
      _id = 0

  el.on = function(events, fn) {
    if (typeof fn == 'function') {
      fn._id = typeof fn._id == 'undefined' ? _id++ : fn._id

      events.replace(/\S+/g, function(name, pos) {
        (callbacks[name] = callbacks[name] || []).push(fn)
        fn.typed = pos > 0
      })
    }
    return el
  }

  el.off = function(events, fn) {
    if (events == '*') callbacks = {}
    else {
      events.replace(/\S+/g, function(name) {
        if (fn) {
          var arr = callbacks[name]
          for (var i = 0, cb; (cb = arr && arr[i]); ++i) {
            if (cb._id == fn._id) { arr.splice(i, 1); i-- }
          }
        } else {
          callbacks[name] = []
        }
      })
    }
    return el
  }

  // only single event supported
  el.one = function(name, fn) {
    if (fn) fn.one = 1
    return el.on(name, fn)
  }

  el.trigger = function(name) {
    var args = [].slice.call(arguments, 1),
        fns = callbacks[name] || []

    for (var i = 0, fn; (fn = fns[i]); ++i) {
      if (!fn.busy) {
        fn.busy = 1
        fn.apply(el, fn.typed ? [name].concat(args) : args)
        if (fn.one) { fns.splice(i, 1); i-- }
         else if (fns[i] !== fn) { i-- } // Makes self-removal possible during iteration
        fn.busy = 0
      }
    }

    return el
  }

  return el

}
;(function(riot, evt) {

  // browsers only
  if (!this.top) return

  var loc = location,
      fns = riot.observable(),
      win = window,
      current

  function hash() {
    return loc.hash.slice(1)
  }

  function parser(path) {
    return path.split('/')
  }

  function emit(path) {
    if (path.type) path = hash()

    if (path != current) {
      fns.trigger.apply(null, ['H'].concat(parser(path)))
      current = path
    }
  }

  var r = riot.route = function(arg) {
    // string
    if (arg[0]) {
      loc.hash = arg
      emit(arg)

    // function
    } else {
      fns.on('H', arg)
    }
  }

  r.exec = function(fn) {
    fn.apply(null, parser(hash()))
  }

  r.parser = function(fn) {
    parser = fn
  }

  win.addEventListener ? win.addEventListener(evt, emit, false) : win.attachEvent('on' + evt, emit)

})(riot, 'hashchange')
/*

//// How it works?


Three ways:

1. Expressions: tmpl('{ value }', data).
   Returns the result of evaluated expression as a raw object.

2. Templates: tmpl('Hi { name } { surname }', data).
   Returns a string with evaluated expressions.

3. Filters: tmpl('{ show: !done, highlight: active }', data).
   Returns a space separated list of trueish keys (mainly
   used for setting html classes), e.g. "show highlight".


// Template examples

tmpl('{ title || "Untitled" }', data)
tmpl('Results are { results ? "ready" : "loading" }', data)
tmpl('Today is { new Date() }', data)
tmpl('{ message.length > 140 && "Message is too long" }', data)
tmpl('This item got { Math.round(rating) } stars', data)
tmpl('<h1>{ title }</h1>{ body }', data)


// Falsy expressions in templates

In templates (as opposed to single expressions) all falsy values
except zero (undefined/null/false) will default to empty string:

tmpl('{ undefined } - { false } - { null } - { 0 }', {})
// will return: " - - - 0"

*/


var brackets = (function(orig, s, b) {
  return function(x) {

    // make sure we use the current setting
    s = riot.settings.brackets || orig
    if (b != s) b = s.split(' ')

    // if regexp given, rewrite it with current brackets (only if differ from default)
    // else, get brackets
    return x && x.test
      ? s == orig
        ? x : RegExp(x.source
                      .replace(/\{/g, b[0].replace(/(?=.)/g, '\\'))
                      .replace(/\}/g, b[1].replace(/(?=.)/g, '\\')),
                    x.global ? 'g' : '')
      : b[x]

  }
})('{ }')


var tmpl = (function() {

  var cache = {},
      re_vars = /(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_$]\w*)/gi
              // [ 1               ][ 2  ][ 3 ][ 4                                                                                  ][ 5       ]
              // find variable names:
              // 1. skip quoted strings and regexps: "a b", 'a b', 'a \'b\'', /a b/
              // 2. skip object properties: .name
              // 3. skip object literals: name:
              // 4. skip javascript keywords
              // 5. match var name

  // build a template (or get it from cache), render with data
  return function(str, data) {
    return str && (cache[str] = cache[str] || tmpl(str))(data)
  }


  // create a template instance

  function tmpl(s, p) {

    // default template string to {}
    s = (s || (brackets(0) + brackets(1)))

      // temporarily convert \{ and \} to a non-character
      .replace(brackets(/\\{/g), '\uFFF0')
      .replace(brackets(/\\}/g), '\uFFF1')

    // split string to expression and non-expresion parts
    p = split(s, brackets(/{[\s\S]*?}/g))

    return new Function('d', 'return ' + (

      // is it a single expression or a template? i.e. {x} or <b>{x}</b>
      !p[0] && !p[2] && !p[3]

        // if expression, evaluate it
        ? expr(p[1])

        // if template, evaluate all expressions in it
        : '[' + p.map(function(s, i) {

            // is it an expression or a string (every second part is an expression)
          return i % 2

              // evaluate the expressions
              ? expr(s, true)

              // process string parts of the template:
              : '"' + s

                  // preserve new lines
                  .replace(/\n/g, '\\n')

                  // escape quotes
                  .replace(/"/g, '\\"')

                + '"'

        }).join(',') + '].join("")'
      )

      // bring escaped { and } back
      .replace(/\uFFF0/g, brackets(0))
      .replace(/\uFFF1/g, brackets(1))

    + ';')

  }


  // parse { ... } expression

  function expr(s, n) {
    s = s

      // convert new lines to spaces
      .replace(/\n/g, ' ')

      // trim whitespace, curly brackets, strip comments
      .replace(brackets(/^[{ ]+|[ }]+$|\/\*.+?\*\//g), '')

    // is it an object literal? i.e. { key : value }
    return /^\s*[\w- "']+ *:/.test(s)

      // if object literal, return trueish keys
      // e.g.: { show: isOpen(), done: item.done } -> "show done"
      ? '[' + s.replace(/\W*([\w- ]+)\W*:([^,]+)/g, function(_, k, v) {

        return v.replace(/[^&|=!><]+/g, wrap) + '?"' + k.trim() + '":"",'

      }) + '].join(" ").trim()'

      // if js expression, evaluate as javascript
      : wrap(s, n)

  }


  // execute js w/o breaking on errors or undefined vars

  function wrap(s, nonull) {
    s = s.trim()
    return !s ? '' : '(function(v){try{v='

        // prefix vars (name => data.name)
        + (s.replace(re_vars, function(s, _, v) { return v ? '(d.'+v+'===undefined?window.'+v+':d.'+v+')' : s })

          // break the expression if its empty (resulting in undefined value)
          || 'x')

      + '}finally{return '

        // default to empty string for falsy values except zero
        + (nonull === true ? '!v&&v!==0?"":v' : 'v')

      + '}}).call(d)'
  }


  // a substitute for str.split(re) for IE8
  // because IE8 doesn't support capturing parenthesis in it

  function split(s, re) {
    var parts = [], last = 0
    s.replace(re, function(m, i) {
      // push matched expression and part before it
      parts.push(s.slice(last, i), m)
      last = i + m.length
    })
    // push the remaining part
    return parts.concat(s.slice(last))
  }

})()

// { key, i in items} -> { key, i, items }
function loopKeys(expr) {
  var ret = { val: expr },
      els = expr.split(/\s+in\s+/)

  if (els[1]) {
    ret.val = brackets(0) + els[1]
    els = els[0].slice(brackets(0).length).trim().split(/,\s*/)
    ret.key = els[0]
    ret.pos = els[1]
  }

  return ret
}

function mkitem(expr, key, val) {
  var item = {}
  item[expr.key] = key
  if (expr.pos) item[expr.pos] = val
  return item
}


/* Beware: heavy stuff */
function _each(dom, parent, expr) {

  remAttr(dom, 'each')

  var template = dom.outerHTML,
      prev = dom.previousSibling,
      root = dom.parentNode,
      rendered = [],
      tags = [],
      checksum

  expr = loopKeys(expr)

  function add(pos, item, tag) {
    rendered.splice(pos, 0, item)
    tags.splice(pos, 0, tag)
  }

  // clean template code
  parent.one('update', function() {
    root.removeChild(dom)

  }).one('premount', function() {
    if (root.stub) root = parent.root

  }).on('update', function() {

    var items = tmpl(expr.val, parent)
    if (!items) return

    // object loop. any changes cause full redraw
    if (!Array.isArray(items)) {
      var testsum = JSON.stringify(items)
      if (testsum == checksum) return
      checksum = testsum

      // clear old items
      each(tags, function(tag) { tag.unmount() })
      rendered = []
      tags = []

      items = Object.keys(items).map(function(key) {
        return mkitem(expr, key, items[key])
      })

    }

    // unmount redundant
    each(arrDiff(rendered, items), function(item) {
      var pos = rendered.indexOf(item),
          tag = tags[pos]

      if (tag) {
        tag.unmount()
        rendered.splice(pos, 1)
        tags.splice(pos, 1)
      }

    })

    // mount new / reorder
    var nodes = root.childNodes,
        prev_index = [].indexOf.call(nodes, prev)

    each(items, function(item, i) {

      // start index search from position based on the current i
      var pos = items.indexOf(item, i),
          oldPos = rendered.indexOf(item, i)

      // if not found, search backwards from current i position
      pos < 0 && (pos = items.lastIndexOf(item, i))
      oldPos < 0 && (oldPos = rendered.lastIndexOf(item, i))

      // mount new
      if (oldPos < 0) {
        if (!checksum && expr.key) item = mkitem(expr, item, pos)

        var tag = new Tag({ tmpl: template }, {
          before: nodes[prev_index + 1 + pos],
          parent: parent,
          root: root,
          item: item
        })

        tag.mount()

        return add(pos, item, tag)
      }

      // change pos value
      if (expr.pos && tags[oldPos][expr.pos] != pos) {
        tags[oldPos].one('update', function(item) {
          item[expr.pos] = pos
        })
        tags[oldPos].update()
      }

      // reorder
      if (pos != oldPos) {
        root.insertBefore(nodes[prev_index + oldPos + 1], nodes[prev_index + pos + 1])
        return add(pos, rendered.splice(oldPos, 1)[0], tags.splice(oldPos, 1)[0])
      }

    })

    rendered = items.slice()

  })

}


function parseNamedElements(root, parent, child_tags) {

  walk(root, function(dom) {
    if (dom.nodeType == 1) {

      // custom child tag
      var child = getTag(dom)

      if (child && !dom.getAttribute('each')) {
        var tag = new Tag(child, { root: dom, parent: parent })
        parent.tags[dom.getAttribute('name') || child.name] = tag
        child_tags.push(tag)
      }

      each(dom.attributes, function(attr) {
        if (/^(name|id)$/.test(attr.name)) parent[attr.value] = dom
      })
    }

  })

}

function parseExpressions(root, tag, expressions) {

  function addExpr(dom, val, extra) {
    if (val.indexOf(brackets(0)) >= 0) {
      var expr = { dom: dom, expr: val }
      expressions.push(extend(expr, extra))
    }
  }

  walk(root, function(dom) {
    var type = dom.nodeType

    // text node
    if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue)
    if (type != 1) return

    /* element */

    // loop
    var attr = dom.getAttribute('each')
    if (attr) { _each(dom, tag, attr); return false }

    // attribute expressions
    each(dom.attributes, function(attr) {
      var name = attr.name,
          bool = name.split('__')[1]

      addExpr(dom, attr.value, { attr: bool || name, bool: bool })
      if (bool) { remAttr(dom, name); return false }

    })

    // skip custom tags
    if (getTag(dom)) return false

  })

}

function Tag(impl, conf) {

  var self = riot.observable(this),
      opts = inherit(conf.opts) || {},
      dom = mkdom(impl.tmpl),
      parent = conf.parent,
      expressions = [],
      child_tags = [],
      root = conf.root,
      item = conf.item,
      fn = impl.fn,
      attr = {},
      loop_dom

  if (fn && root.riot) return
  root.riot = true

  extend(this, { parent: parent, root: root, opts: opts, tags: {} }, item)

  // grab attributes
  each(root.attributes, function(el) {
    attr[el.name] = el.value
  })

  // options
  function updateOpts(rem_attr) {
    each(Object.keys(attr), function(name) {
      opts[name] = tmpl(attr[name], parent || self)
    })
  }

  this.update = function(data, init) {
    extend(self, data, item)
    updateOpts()
    self.trigger('update', item)
    update(expressions, self, item)
    self.trigger('updated')
  }

  this.mount = function() {

    updateOpts()

    // initialiation
    fn && fn.call(self, opts)

    toggle(true)

    // parse layout after init. fn may calculate args for nested custom tags
    parseExpressions(dom, self, expressions)

    self.update()

    // internal use only, fixes #403
    self.trigger('premount')

    if (fn) {
      while (dom.firstChild) root.appendChild(dom.firstChild)

    } else {
      loop_dom = dom.firstChild
      root.insertBefore(loop_dom, conf.before || null) // null needed for IE8
    }

    if (root.stub) self.root = root = parent.root
    self.trigger('mount')

  }


  this.unmount = function() {
    var el = fn ? root : loop_dom,
        p = el.parentNode

    if (p) {
      if (parent) p.removeChild(el)
      else while (root.firstChild) root.removeChild(root.firstChild)
      toggle()
      self.trigger('unmount')
      self.off('*')
      delete root.riot
    }

  }

  function toggle(is_mount) {

    // mount/unmount children
    each(child_tags, function(child) { child[is_mount ? 'mount' : 'unmount']() })

    // listen/unlisten parent (events flow one way from parent to children)
    if (parent) {
      var evt = is_mount ? 'on' : 'off'
      parent[evt]('update', self.update)[evt]('unmount', self.unmount)
    }
  }

  // named elements available for fn
  parseNamedElements(dom, this, child_tags)


}

function setEventHandler(name, handler, dom, tag, item) {

  dom[name] = function(e) {

    // cross browser event fix
    e = e || window.event
    e.which = e.which || e.charCode || e.keyCode
    e.target = e.target || e.srcElement
    e.currentTarget = dom
    e.item = item

    // prevent default behaviour (by default)
    if (handler.call(tag, e) !== true) {
      e.preventDefault && e.preventDefault()
      e.returnValue = false
    }

    var el = item ? tag.parent : tag
    el.update()

  }

}

// used by if- attribute
function insertTo(root, node, before) {
  if (root) {
    root.insertBefore(before, node)
    root.removeChild(node)
  }
}

// item = currently looped item
function update(expressions, tag, item) {

  each(expressions, function(expr) {

    var dom = expr.dom,
        attr_name = expr.attr,
        value = tmpl(expr.expr, tag),
        parent = expr.dom.parentNode

    if (value == null) value = ''

    // leave out riot- prefixes from strings inside textarea
    if (parent && parent.tagName == 'TEXTAREA') value = value.replace(/riot-/g, '')

    // no change
    if (expr.value === value) return
    expr.value = value

    // text node
    if (!attr_name) return dom.nodeValue = value

    // remove original attribute
    remAttr(dom, attr_name)

    // event handler
    if (typeof value == 'function') {
      setEventHandler(attr_name, value, dom, tag, item)

    // if- conditional
    } else if (attr_name == 'if') {
      var stub = expr.stub

      // add to DOM
      if (value) {
        stub && insertTo(stub.parentNode, stub, dom)

      // remove from DOM
      } else {
        stub = expr.stub = stub || document.createTextNode('')
        insertTo(dom.parentNode, dom, stub)
      }

    // show / hide
    } else if (/^(show|hide)$/.test(attr_name)) {
      if (attr_name == 'hide') value = !value
      dom.style.display = value ? '' : 'none'

    // field value
    } else if (attr_name == 'value') {
      dom.value = value

    // <img src="{ expr }">
    } else if (attr_name.slice(0, 5) == 'riot-') {
      attr_name = attr_name.slice(5)
      value ? dom.setAttribute(attr_name, value) : remAttr(dom, attr_name)

    } else {
      if (expr.bool) {
        dom[attr_name] = value
        if (!value) return
        value = attr_name
      }

      if (typeof value != 'object') dom.setAttribute(attr_name, value)

    }

  })

}
function each(els, fn) {
  for (var i = 0, len = (els || []).length, el; i < len; i++) {
    el = els[i]
    // return false -> reomve current item during loop
    if (el != null && fn(el, i) === false) i--
  }
  return els
}

function remAttr(dom, name) {
  dom.removeAttribute(name)
}

// max 2 from objects allowed
function extend(obj, from, from2) {
  from && each(Object.keys(from), function(key) {
    obj[key] = from[key]
  })
  return from2 ? extend(obj, from2) : obj
}

function mkdom(template) {
  var tag_name = template.trim().slice(1, 3).toLowerCase(),
      root_tag = /td|th/.test(tag_name) ? 'tr' : tag_name == 'tr' ? 'tbody' : 'div',
      el = document.createElement(root_tag)

  el.stub = true
  el.innerHTML = template
  return el
}

function walk(dom, fn) {
  if (dom) {
    if (fn(dom) === false) walk(dom.nextSibling, fn)
    else {
      dom = dom.firstChild

      while (dom) {
        walk(dom, fn)
        dom = dom.nextSibling
      }
    }
  }
}

function arrDiff(arr1, arr2) {
  return arr1.filter(function(el) {
    return arr2.indexOf(el) < 0
  })
}

function inherit(parent) {
  function Child() {}
  Child.prototype = parent
  return new Child()
}



/*
 Virtual dom is an array of custom tags on the document.
 Updates and unmounts propagate downwards from parent to children.
*/

var virtual_dom = [],
    tag_impl = {}


function getTag(dom) {
  return tag_impl[dom.tagName.toLowerCase()]
}

function injectStyle(css) {
  var node = document.createElement('style')
  node.innerHTML = css
  document.head.appendChild(node)
}

function mountTo(root, tagName, opts) {
  var tag = tag_impl[tagName]

  if (tag && root) tag = new Tag(tag, { root: root, opts: opts })

  if (tag && tag.mount) {
    tag.mount()
    virtual_dom.push(tag)
    return tag.on('unmount', function() {
      virtual_dom.splice(virtual_dom.indexOf(tag), 1)
    })
  }

}

riot.tag = function(name, html, css, fn) {
  if (typeof css == 'function') fn = css
  else if (css) injectStyle(css)
  tag_impl[name] = { name: name, tmpl: html, fn: fn }
}

riot.mount = function(selector, tagName, opts) {
  if (selector == '*') selector = Object.keys(tag_impl).join(', ')
  if (typeof tagName == 'object') { opts = tagName; tagName = 0 }

  var tags = []

  function push(root) {
    var name = tagName || root.tagName.toLowerCase(),
        tag = mountTo(root, name, opts)

    if (tag) tags.push(tag)
  }

  // DOM node
  if (selector.tagName) {
    push(selector)
    return tags[0]

  // selector
  } else {
    each(document.querySelectorAll(selector), push)
    return tags
  }

}

// update everything
riot.update = function() {
  return each(virtual_dom, function(tag) {
    tag.update()
  })
}

// @deprecated
riot.mountTo = riot.mount


  
  // share methods for other riot parts, e.g. compiler
  riot.util = { brackets: brackets, tmpl: tmpl }

  // support CommonJS
  if (typeof exports === 'object')
    module.exports = riot

  // support AMD
  else if (typeof define === 'function' && define.amd)
    define(function() { return riot })

  // support browser
  else
    this.riot = riot

})();

Traitify.ui = {
  deviceType: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Phone" : "desktop"),
  init: function(options) {
    var base, base1, base2, base3, base4, dataName, i, item, len, ref;
    if (options == null) {
      options = Object();
    }
    riot.observable(options);
    if (options.slideDeck == null) {
      options.slideDeck = Object();
    }
    if ((base = options.slideDeck).target == null) {
      base.target = ".tf-slide-deck";
    }
    if ((base1 = options.slideDeck).tag == null) {
      base1.tag = "tf-slide-deck";
    }
    if (options.results == null) {
      options.results = Object();
    }
    if (options.publicKey) {
      Traitify.setPublicKey(options.publicKey);
    }
    delete options.publicKey;
    ref = ["personality-blend", "personality-types", "personality-traits", "famous-people", "careers"];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      dataName = item.replace(/-([a-z])/g, function(g) {
        return g[1].toUpperCase();
      });
      if ((base2 = options.results)[dataName] == null) {
        base2[dataName] = Object();
      }
      if ((base3 = options.results[dataName]).tag == null) {
        base3.tag = "tf-" + item;
      }
      if ((base4 = options.results[dataName]).target == null) {
        base4.target = ".tf-" + item;
      }
    }
    options.load = function() {
      var args, j, len1, ref1, scopes, slideDeck, that;
      that = this;
      scopes = "slides,blend,types,traits,career_matches";
      args = "image_pack=linear&data=" + scopes;
      ref1 = options.slideDeck;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        slideDeck = ref1[j];
        slideDeck.assessmentId = options.assessmentId;
      }
      Traitify.get("/assessments/" + options.assessmentId + "?" + args).then(function(assessment) {
        var k, key, l, len2, len3, ref2, ref3, resultName, results, widget;
        if (assessment.completed_at === void 0) {
          options.slideDeck.mount = riot.mount(options.slideDeck.target, options.slideDeck.tag, options)[0];
          options.slideDeck.mount.slides = assessment.slides;
          options.on("slideDeck.finish", function() {
            return that.load();
          });
          return options.slideDeck.mount.initialize();
        } else {
          ref2 = Object.keys(that.results);
          results = [];
          for (k = 0, len2 = ref2.length; k < len2; k++) {
            resultName = ref2[k];
            widget = that.results[resultName];
            that.results[resultName].mount = riot.mount(widget.target, widget.tag, options)[0];
            that.results[resultName].mount.assessmentId = that.assessmentId;
            ref3 = Object.keys(assessment);
            for (l = 0, len3 = ref3.length; l < len3; l++) {
              key = ref3[l];
              that.results[resultName].mount[key] = assessment[key];
            }
            results.push(that.results[resultName].mount.initialize());
          }
          return results;
        }
      });
      return this;
    };
    return options;
  }
};

riot.tag('tf-slide-deck', '<div class="tf-slide-deck-container {this.finished}" if="{this.visible}"> <div class="tf-slides" riot-style="max-height: {this.maxHeight}px"> <div class="tf-progress-bar tf-vertical"><div class="tf-progress-bar-inner" riot-style="height:{this.progressBar}%; {this.progressBarColor}"></div></div> <div class="tf-progress-bar"><div class="tf-progress-bar-inner" riot-style="width:{this.progressBar}%; {this.progressBarColor}"></div></div> <div class="tf-info {this.infoVisible}"> <div class="tf-progress-and-caption"> <div class="tf-progress-bar"><div class="tf-progress-bar-inner" riot-style="width:{this.progressBar}%; {this.progressBarColor}"></div></div> <div class="tf-caption">{this.panelOne.caption}</div> </div> </div> <div class="tf-slide tf-panel-one tf-{this.panelOne.class}" riot-style="background-image: url(\'{this.panelOne.picture}\'); background-position:{this.panelOne.x}% {this.panelOne.y}%;"> </div> <div class="tf-slide tf-panel-two tf-{this.panelTwo.class}" riot-style="background-image: url(\'{this.panelTwo.picture}\'); background-position:{this.panelTwo.x}% {this.panelTwo.y}%;"> </div> <div class="tf-response"> <div class="tf-progress-bar"><div class="tf-progress-bar-inner" riot-style="width:{this.progressBar}%; {this.progressBarColor}"></div></div> <div class="tf-me-not-me"> <div class="tf-loading {this.loadingVisible}"> <a href="#" class="tf-refresh {this.refreshVisible}" onclick="{handleRefresh}"> Click To Refresh </a> <span class="tf-loading-animation {this.hideLoading}">Loading...</span> </div> <a href="#" class="tf-me" onclick="{handleMe}"> ME </a> <a href="#" class="tf-not-me" onclick="{handleNotMe}"> NOT ME </a> </div> </div> </div> </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } .tf-progress-bar{ display: none; } .tf-progress-and-caption .tf-progress-bar{ display: block; } .tf-cover{ background-color: #fff; position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 2; } .tf-progress-bar.tf-vertical{ height: 100%; width: 30px; position: absolute; z-index: 1; } .tf-progress-bar.tf-vertical .tf-progress-bar-inner{ width: 100%; border-radius: 15px 15px 0px 0px; bottom: 0px; position: absolute; -webkit-transition: height .4s ease-in-out; -moz-transition: height .4s ease-in-out; -o-transition: height .4s ease-in-out; transition: height .4s ease-in-out; } .tf-info{ position: absolute; z-index: 1; width: 100%; } .tf-progress-and-caption{ margin: 0px 0px; width: 100%; overflow: hidden; position: relative; } .tf-slide-deck-container.tf-finished{ height: 0; overflow: hidden; opacity: 0; } .tf-slides{ width:100%; max-width: 1200px; overflow: hidden; position: relative; height: 600px; font-family: "Source Sans Pro", Arial, Verdana, sans-serif; text-align: center; margin: 0 auto; background-color: #4488cc; } .tf-slide{ -webkit-transition: left .5s ease-in-out; -moz-transition: left .5s ease-in-out; -o-transition: left .5s ease-in-out; transition: left .5s ease-in-out; background-size: cover; } .tf-slides{ position: relative; } .tf-slide{ position: absolute; height: 100%; width: 100%; } .tf-slide.tf-next{ position: absolute; left: 100%; width: 100%; -moz-transition: none; -webkit-transition: none; -o-transition: color 0 ease-in; transition: none; } .tf-slide.tf-current{ left: 0%; } .tf-caption{ padding: 3px 0px 8px; color: #fff; font-size: 28px; display: block; position:relative; z-index:1; background-color: rgba(0, 0, 0, .6); } .tf-slide.tf-current.tf-panel-one{ -moz-transition: none; -webkit-transition: none; -o-transition: color 0 ease-in; transition: none; } .tf-slide.tf-last{ position: absolute; left: -100%; width: 100%; } .tf-response{ position: absolute; bottom: 20px; width: 100%; } .tf-me-not-me{ width: 320px; height: 46px; position: relative; line-height:43px; font-size: 24px; padding: 0; overflow: hidden; border-radius: 25px; margin: 0 auto; } .tf-finished .tf-loading{ background-color: #315F9B; color: #fff; -webkit-transition: all .4s ease-in-out; -moz-transition: all .4s ease-in-out; -o-transition: all .4s ease-in-out; transition: all .4s ease-in-out; } .tf-me-not-me .tf-me, .tf-me-not-me .tf-not-me{ box-sizing: initial; float:left; } .tf-me-not-me .tf-me{ position: relative; background-color: #1dafec; width: 50%; display: inline-block; height: 100%; text-decoration: none; color: #fff; padding:0; margin: 0; } .tf-me-not-me .tf-not-me{ position: relative; background-color: #fc5f62; width: 50%; display: inline-block; height: 100%; text-decoration: none; color: #fff; padding:0; margin: 0; } .tf-progress-bar{ height: 10px; padding: 0px; width: 100%; background-color: rgba(255, 255, 255, .5) } .tf-progress-bar-inner{ position: relative; height: 100%; width: 0%; background-color: #fff; border-radius: 0px 5px 5px 0px; -webkit-transition: width .4s ease-in-out; -moz-transition: width .4s ease-in-out; -o-transition: width .4s ease-in-out; transition: width .4s ease-in-out; } .tf-refresh{ background-color: #4488cc; height: 100%; width: 100%; color: #fff; display: none; text-decoration: none; } .tf-loading{ background-color: #4488cc; height: 100%; width: 100%; position: absolute; z-index: 1; display: none; color: #fff; } .tf-finished .tf-response{ bottom: 50%; margin-bottom: -22px; -webkit-transition: bottom .4s ease-in-out; -moz-transition: bottom .4s ease-in-out; -o-transition: bottom .4s ease-in-out; transition: bottom .4s ease-in-out; } .tf-slide-deck .tf-me:active{ background-color: #2684AB; } .tf-slide-deck .tf-not-me:active{ background-color: #D74648; } .tf-visible{ display: block; } .tf-loading-animation{ -webkit-animation-name: fadeInOut; -webkit-animation-duration: 3s; -webkit-animation-iteration-count: infinite; animation-name: fadeInOut; animation-duration: 3s; animation-iteration-count: infinite; } .tf-invisible{ display: none; } @keyframes fadeInOut { 0% { opacity:1; } 45% { opacity:1; } 55% { opacity:0; } 80% { opacity:0; } 100%{ opacity:1 } } @-webkit-keyframes fadeInOut { 0% { opacity:1; } 45% { opacity:1; } 55% { opacity:0; } 80% { opacity:0; } 100%{ opacity:1 } }', function(opts) {var DB, slideTime, that;

this.assessmentId = this.root.getAttribute("assessment-id") || opts.assessmentId;

that = this;

that.imageName = Traitify.ui.deviceType === "desktop" ? "image_desktop_retina" : "image_desktop";

this.panelOne = Object();

this.panelTwo = Object();

if (opts.slideDeck.progressBarColor) {
  this.progressBarColor = "background-color: " + opts.slideDeck.progressBarColor;
}

DB = {
  get: function(key) {
    var value;
    value = window.sessionStorage.getItem(key);
    if (value && value.length !== 0) {
      return JSON.parse(value);
    }
  },
  set: function(key, value) {
    return window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  del: function(key) {
    return window.sessionStorage.removeItem(key);
  }
};

this.touchDevice = false;

slideTime = new Date();

this.processSlide = function(value) {
  var customSlides, duration, j, len, sendSlides, slide, slideIds, slides;
  that.trigger("slideDeck.addSlide");
  duration = new Date() - slideTime;
  slideTime = new Date();
  this.slideData[this.slides[this.index].id] = {
    id: this.slides[this.index].id,
    time_taken: duration,
    response: value
  };
  DB.set(that.assessmentId + "slideData", this.slideData);
  if (this.images[this.index + 2] || (this.index === this.slides.length - 2 && this.images[this.index + 1])) {
    if (this.transitionEvent) {
      this.animateSlide();
      this.onFinishedTransition = function() {
        that.trigger("transitionEnd");
        this.index++;
        return this.setSlide();
      };
    } else {
      this.index++;
      this.setSlide();
    }
  } else {
    this.loadingVisible = "tf-visible";
  }
  if (this.index === this.slides.length - 1) {
    slides = Object.keys(this.slideData).map(function(id) {
      return that.slideData[id];
    });
    slideIds = this.allSlides.map(function(slide) {
      return slide.id;
    });
    sendSlides = Array();
    customSlides = Array();
    for (j = 0, len = slides.length; j < len; j++) {
      slide = slides[j];
      if (slideIds.indexOf(slide.id) !== -1) {
        sendSlides.push(slide);
      } else {
        if (that.customSlideValues == null) {
          that.customSlideValues = Array();
        }
        that.customSlideValues.push(slide);
      }
    }
    that.trigger("customSlideValues", that.customSlideValues);
    Traitify.addSlides(that.assessmentId, sendSlides).then(function(response) {
      opts.trigger("slideDeck.finish", that);
      return DB.del(that.assessmentId + "slideData");
    });
    this.infoVisible = "tf-invisible";
    this.finished = "tf-finished";
    this.panelOne.picture = "";
    this.progress;
  }
  return this.setProgressBar();
};

this.setProgressBar = function() {
  return this.progressBar = (Object.keys(this.slideData).length / this.allSlides.length) * 100;
};

this.handleMe = function() {
  if (!this.touchDevice) {
    return this.processSlide(true);
  }
};

this.handleNotMe = function() {
  if (!this.touchDevice) {
    return this.processSlide(false);
  }
};

this.handleRefresh = function() {
  this.refreshVisible = "";
  this.loadingVisible = "tf-visible";
  this.imageTries[this.index + 1] = 0;
  return this.loadImage(this.index + 1);
};

this.panelOne["class"] = "current";

this.panelTwo["class"] = "next";

this.animateSlide = function() {
  this.progressBar = (this.slideData.length / this.allSlides.length) * 100;
  return this.panelTwo["class"] = "current";
};

this.setSlide = function() {
  var slideOne, slideTwo;
  if (this.panelTwo && this.panelTwo.picture) {
    this.panelOne.picture = this.panelTwo.picture;
    this.panelOne.caption = this.panelTwo.caption;
    this.panelOne.x = this.panelTwo.x;
    this.panelOne.y = this.panelTwo.y;
    this.update();
  } else {
    slideOne = this.slides[this.index];
    this.panelOne.caption = slideOne.caption;
    this.panelOne.picture = slideOne[that.imageName];
    this.panelOne.x = slideOne.focus_x;
    this.panelOne.y = slideOne.focus_y;
    this.update();
  }
  this.panelTwo["class"] = "next";
  this.panelOne["class"] = "current";
  if (this.slides[this.index + 1]) {
    slideTwo = this.slides[this.index + 1];
    this.panelTwo.caption = slideTwo.caption;
    this.panelTwo.picture = slideTwo[that.imageName];
    this.panelTwo.y = slideTwo.focus_y;
    this.panelTwo.x = slideTwo.focus_x;
  }
  return this.update();
};

this.whichTransitionEvent = function() {
  var el, j, len, ref, t, transitions;
  el = document.createElement('fakeelement');
  transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };
  ref = Object.keys(transitions);
  for (j = 0, len = ref.length; j < len; j++) {
    t = ref[j];
    if (el.style[t] !== void 0) {
      return transitions[t];
    }
  }
};

this.transitionEvent = this.whichTransitionEvent();

opts.on("slideDeck.initialized", function() {
  var el, j, len, ref, slide;
  el = document.getElementsByClassName("tf-panel-two")[0];
  if (el) {
    that.transitionEvent && el.addEventListener(that.transitionEvent, function() {
      return that.onFinishedTransition();
    });
    that.touch(document.querySelector(".tf-me"), function() {
      return that.processSlide(true);
    });
    that.touch(document.querySelector(".tf-not-me"), function() {
      return that.processSlide(false);
    });
  }
  if (that.customSlides == null) {
    that.customSlides = Array();
  }
  ref = that.customSlides;
  for (j = 0, len = ref.length; j < len; j++) {
    slide = ref[j];
    that.slides.splice(slide.position, slide);
  }
  return that.update();
});

this.on("mount", function() {
  that.mounted = true;
  if (that.initialized === true) {
    return opts.trigger("slideDeck.initialized");
  }
});

this.initialize = function() {
  var images, playedSlideIds;
  this.index = 0;
  this.visible = true;
  this.update();
  this.slideData = DB.get(that.assessmentId + "slideData");
  if (!this.slideData) {
    this.slideData = Object();
  }
  this.allSlides = this.slides.map(function(slide) {
    return slide;
  });
  playedSlideIds = Object.keys(this.slideData).map(function(slideName) {
    return that.slideData[slideName].id;
  });
  this.slides = this.slides.filter(function(slide) {
    return playedSlideIds.indexOf(slide.id) === -1;
  });
  this.setSlide();
  this.setProgressBar();
  images = this.slides.map(function(slide) {
    return slide[that.imageName];
  });
  this.imageTries = Object();
  this.images = Object();
  this.loadImage = function(i) {
    var base;
    if (images[i]) {
      if ((base = that.imageTries)[i] == null) {
        base[i] = 0;
      }
      that.images[i] = new Image();
      that.images[i].src = images[i];
      that.images[i].onerror = function() {
        that.imageTries[i]++;
        if (that.imageTries[i] < 30) {
          return setTimeout(function() {
            return that.loadImage(i);
          }, 1000);
        } else {
          that.refreshVisible = "tf-visible";
          that.hiddenRefresh = "tf-invisible";
          return that.update();
        }
      };
      return that.images[i].onload = function() {
        if (that.loadingVisible !== "") {
          that.loadingVisible = "";
          that.update();
        }
        return setTimeout(function() {
          return that.loadImage(i + 1);
        }, 300);
      };
    }
  };
  this.loadImage(0);
  that.initialized = true;
  if (that.mounted === true) {
    return opts.trigger("slideDeck.initialized");
  }
};

this.maxHeight = window.innerHeight;

document.addEventListener("orientationchange", function() {
  that.maxHeight = window.innerHeight;
  return that.update();
});

this.setCustomSlides = function(slides) {
  return this.customSlides = slides;
};

this.touch = function(target, callback) {
  (function() {
    var touchClick;
    touchClick = false;
    target.addEventListener('touchstart', (function() {
      that.touchDevice = true;
      touchClick = true;
    }), false);
    target.addEventListener('touchmove', (function() {
      touchClick = false;
    }), false);
    target.addEventListener('touchend', (function(e) {
      var event;
      if (touchClick) {
        touchClick = false;
        event = document.createEvent('CustomEvent');
        event.initCustomEvent('fastclick', true, true, e.target);
        e.target.dispatchEvent(event);
      }
    }), false);
  })();
  return target.addEventListener('fastclick', (function(e) {
    return callback();
  }), false);
};

});

riot.tag('tf-careers', '<div class="tf-careers-container" if="{this.visible}"> <div class="tf-experience-filters"> <div class="tf-filter-header"> Experience Level: </div> <div class="tf-experience-filter {this.levels.indexOf(\'all\') != -1 ? \'tf-highlight-filter\' : \'\'}" onclick="{this.setAll}"> All </div><div class="tf-experience-filter {this.parent.levels.indexOf(level) != -1 ? \'tf-highlight-filter\' : \'\'} " onclick="{this.parent.toggleLevel}" each="{level in this.levelSets}">{level + 1}</div> </div> <div class="tf-career-details tf-show-details" each="{this.careers}" onclick="{this.parent.careerClick}"> <img riot-src="{this.career.picture}" class="tf-image"> <div class="tf-title">{this.career.title}</div> <div class="tf-description tf-fade">{this.career.description}</div> <div class="tf-experience">Experience Level</div> <div class="tf-experience-boxes"> <div class="tf-experience-box { this.exp > 0 ? \'tf-highlighted-box\' : \'\'}"></div> <div class="tf-experience-box { this.exp > 1 ? \'tf-highlighted-box\' : \'\'}"></div> <div class="tf-experience-box { this.exp > 2 ? \'tf-highlighted-box\' : \'\'}"></div> <div class="tf-experience-box { this.exp > 3 ? \'tf-highlighted-box\' : \'\'}"></div> <div class="tf-experience-box { this.exp > 4 ? \'tf-highlighted-box\' : \'\'}"></div> </div> <span class="tf-education">Education </span> <div class="tf-education-text">{this.career.experience_level.degree}</div> <div class="tf-match-rate">Match Rate <div class="tf-percent">{Math.round(this.score)}%</div></div> <div class="tf-score"> <div class="tf-clearfix"></div> <div class="tf-score-bar"> <div class="tf-score-bar-inner" riot-style="width: {Math.round(this.score)}%" data-match-rate="{Math.round(this.score)}"><div> </div> </div> </div> </div> </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } .tf-careers-container{ font-family: "Source Sans Pro", Arial, Verdana, sans-serif; font-size: 24px; color: #4e4e4e; line-height: 1.5; margin: 20px; text-align: center; max-width: 900px; margin: 0 auto; box-sizing: border-box; } .tf-experience-filters{ text-align: right; font-weight: 600; font-size: 15px; line-height: 18px; border-radius: 3px; margin-right: 10px; overflow: hidden; } .tf-experience-filters div{ display: inline-block; } .tf-filter-header{ margin-right: 10px; } @media screen and (max-width: 380px) { .tf-filter-header { width: 100%; display: block; margin-bottom: 5px; } } .tf-experience-filter{ padding: 5px 12px; background-color: #00aeef; cursor: pointer; color: #fff; } .tf-highlight-filter{ background-color: #0390cb; -moz-box-shadow: inset 1px 1px 5px #184f71; -webkit-box-shadow: inset 1px 1px 5px #184f71; box-shadow: inset 1px 1px 5px #184f71; } .tf-career-details { border: 1px solid; border-color: #e2e2e2; display: block; width: 90%; margin: 10px 5%; vertical-align: top; background-color: #fff; position: relative; line-height: 1.3; font-size: 13px; text-align: left; } @media screen and (min-width: 568px) { .tf-career-details { float: left; width: 46%; margin: 10px; } } @media screen and (min-width: 768px) { .tf-career-details { float: left; width: 31%; margin: 10px 1%; } } @media screen and (min-width: 900px) { .tf-career-details { float: left; width: 22.7%; } } .tf-career-details .tf-image{ width: 100%; top: 10px; margin: 0 auto; } .tf-career-details .tf-title{ margin: 10px; margin-bottom: 0; font-weight: 600; font-size: 16px; height: 42px; /* font-size * line-height * lines to show */ -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; display: block; /* Fallback for non-webkit */ display: -webkit-box; } .tf-career-details .tf-description{ margin-top: 5px; font-weight: 400; } .tf-career-details .tf-description, .tf-career-details .tf-experience-boxes{ padding: 0 10px 10px; } .tf-career-details .tf-experience, .tf-career-details .tf-education, .tf-career-details .tf-match-rate{ display: block; color: #2e2e2e; font-weight: 600; font-size: 15px; margin: 10px; margin-bottom: 0; } .tf-career-details .tf-score{ margin: 3px 10px 13px; } .tf-career-details .tf-match-rate .tf-percent{ display: inline-block; float: right; text-align:right; font-weight: 400; font-size: 14px; } .tf-career-details .tf-experience-boxes { margin-top: 5px; padding-bottom: 0; } .tf-career-details .tf-experience-box{ background-color: #e2e2e2; width: 15px; height: 15px; margin-right: 2px; display: inline-block; } .tf-career-details .tf-experience-box.tf-highlighted-box{ background-color: #00aeef; } .tf-career-details .tf-education-text{ margin: 2px 10px 5px; color: #4e4e4e; font-weight: 300; } .tf-career-details .tf-fade{ position: relative; height: 55px; overflow: hidden; } .tf-career-details .tf-fade:after { content: ""; text-align: right; position: absolute; bottom: 0; right: 0; width: 60%; height: 16px; background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 70%); } .tf-score-bar{ background-color: #e3e3e3; height:15px; display: block; } .tf-score-bar-inner{ background-color: #00aeef; height: 100%; } .tf-score-bar-inner[data-match-rate=\'100\'], .tf-score-bar-inner[data-match-rate^=\'9\'] { background-color: #4bc275; } .tf-score-bar-inner[data-match-rate^=\'8\'] { background-color: #6fd172; } .tf-score-bar-inner[data-match-rate^=\'7\'] { background-color: #99d16f; } .tf-score-bar-inner[data-match-rate^=\'6\'] { background-color: #bbd16f; } .tf-score-bar-inner[data-match-rate^=\'5\'] { background-color: #ced16f; } .tf-score-bar-inner[data-match-rate^=\'4\'] { background-color: #ece129; } .tf-score-bar-inner[data-match-rate^=\'3\'] { background-color: #ecb329; } .tf-score-bar-inner[data-match-rate^=\'2\'] { background-color: #f28316; } .tf-score-bar-inner[data-match-rate^=\'1\'] { background-color: #f25416; } .tf-clearfix{ clear:both; }', function(opts) {var that;

this.assessmentId = this.root.getAttribute("assessment-id");

that = this;

this.levelSets = [0, 1, 2, 3, 4];

this.levels = ["all"];

this.mounted = true;

if (this.initialized) {
  opts.trigger("careers.initialized");
}

this.careerClick = function() {
  var career;
  career = this;
  this.currentCareer = {
    career: career.career,
    score: career.score
  };
  return opts.trigger("careers.click");
};

this.setAll = function() {
  this.levels = ["all"];
  return this.refreshColumns();
};

this.toggleLevel = function(level) {
  level = this.level;
  if (that.levels.indexOf("all") !== -1) {
    that.levels = [];
  }
  if (that.levels.indexOf(level) !== -1) {
    that.levels = that.levels.filter(function(lvl) {
      return lvl !== level;
    });
    if (that.levels.length === 0) {
      that.levels = ["all"];
    }
  } else {
    that.levels.push(level);
  }
  return that.refreshColumns();
};

this.refreshColumns = function() {
  var levels;
  if (this.levels.indexOf("all") !== -1) {
    this.careers = this.career_matches;
    return this.setColumns();
  } else {
    levels = that.levels.map(function(a) {
      return a + 1;
    });
    return window.Traitify.getCareers(this.assessmentId, {
      experience_levels: levels.join(","),
      number_of_matches: 20
    }).then(function(careers) {
      that.careers = careers;
      return that.setColumns();
    });
  }
};

this.setColumns = function() {
  var career, careers, i, len, ref;
  careers = this.careers;
  ref = this.careers;
  for (i = 0, len = ref.length; i < len; i++) {
    career = ref[i];
    career.exp = career.career.experience_level.id;
  }
  return this.update();
};

this.initialize = function() {
  if (this.career_matches) {
    this.assessmentId = this.assessmentId;
    this.careers = this.career_matches;
  }
  this.visible = true;
  this.columns = opts.columns || 4;
  return this.setColumns();
};

});

riot.tag('tf-famous-people', '<div class="tf-famous-people-container" if="{this.visible}"> <div class="tf-famous-people-scroller"> <div class="tf-famous-people-inner"> <div class="tf-famous-person" each="{famousPerson in this.famousPeople}"> <div class="tf-image"> <img riot-src="{famousPerson.picture}"> </div> <div class="tf-name">{famousPerson.name}</div> </div> </div> </div> </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } .tf-famous-people-container{ font-family: "Source Sans Pro", Arial, Verdana, sans-serif; margin: 0 auto 30px; } .tf-famous-people-inner{ width: 860px; margin: 0 auto; } .tf-famous-people-scroller{ height: 230px; max-width: 860px; margin: 0 auto; overflow-y: hidden; overflow-x: auto; text-align: center; } .tf-famous-person{ display: inline-block; padding: 10px 15px; text-align: center; color: #555; margin: 0 auto; vertical-align: top; } .tf-famous-person .tf-image{ width: 142px; height: 142px; border-radius: 50%; overflow: hidden; } .tf-name{ margin-top: 20px; width: 142px; line-height:1em; }', function(opts) {var that;

this.assessmentId = this.root.getAttribute("assessment-id");

that = this;

this.on("mount", function() {
  this.mounted = true;
  if (this.initialized) {
    return opts.trigger("famousPeople.initialized");
  }
});

this.initialize = function() {
  var famousPeople, famousPerson, i, j, len, len1, personalityType, ref, ref1;
  that.visible = true;
  famousPeople = Array();
  ref = that.personality_types;
  for (i = 0, len = ref.length; i < len; i++) {
    personalityType = ref[i];
    ref1 = personalityType.personality_type.famous_people;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      famousPerson = ref1[j];
      famousPeople.push(famousPerson);
    }
  }
  that.famousPeople = famousPeople.slice(0, 5).sort(function() {
    return 0.5 - Math.random();
  });
  that.update();
  this.initialized = true;
  if (this.mounted) {
    return opts.trigger("famousPeople.initialized");
  }
};

if (opts.personality_types) {
  this.personality_types = opts.personality_types;
  this.personality_blend = opts.personality_blend;
  this.initialize();
} else if (this.assessmentId) {
  window.Traitify.getPersonalityTypes(this.assessmentId).then(function(response) {
    that.famousPeople = response.personality_blend.famous_people;
    return that.initialize();
  });
}

});

riot.tag('tf-personality-traits', '<div class="tf-personality-traits-container" if="{this.visible}"> <div each="{trait in this.traits}" class="tf-trait" riot-style="border-color:#{trait.badge.color_1}"> <div class="tf-background-color" riot-style="background-color: #{trait.badge.color_1}"></div> <div class="tf-name">{trait.name}</div> <div class="tf-definition">{trait.definition}</div> <div class="tf-background" riot-style="background-image:url({trait.badge.image_medium})"></div> </div> </div>', '.tf-personality-traits-container .tf-background-color{ opacity: .03; position: absolute; left: 0; top: 0; width: 100%; height: 100%; } .tf-personality-traits-container div, .tf-personality-traits-container img{ box-sizing: content-box; } .tf-personality-traits-container .your-top-traits{ font-size: 24px; margin: 20px; text-align: center; } .tf-personality-traits-container{ max-width:860px; margin:0 auto 50px; text-align: center; font-family: "Source Sans Pro", Arial, Verdana, sans-serif; } .tf-personality-traits-container .tf-trait{ border-top: 6px solid; border-color: #99aaff; display: inline-block; width: 46%; height: 180px; margin: 5px; vertical-align:top; background-color:#fff; position:relative; line-height: 1.2em; text-align:center; } .tf-personality-traits-container.ie .tf-trait{ height:280px; } @media (min-width: 768px) { .tf-personality-traits-container .tf-trait{ width:30%; } } @media screen and (min-width: 900px) { .tf-personality-traits-container .tf-trait{ width:23%; } } .tf-personality-traits-container .tf-trait .tf-name{ margin: 20px auto; margin-bottom: 0; display: inline-block; font-weight: 600; text-align: center; } .tf-personality-traits-container .tf-trait .tf-definition{ padding: 0 20px; margin-top: 10px; font-size:14px; font-weight: 400; text-align: left; } .tf-personality-traits-container .tf-trait .tf-background{ width: 52px; height: 52px; right: 20px; bottom: 20px; position:absolute; background-size: contain; background-repeat: no-repeat; background-position: center center; opacity: .15; -webkit-transition: all .2s ease-in-out; -moz-transition: all .2s ease-in-out; -o-transition: all .2s ease-in-out; transition: all .2s ease-in-out; } .tf-personality-traits-container .tf-trait:hover .tf-background{ opacity:.8; }', function(opts) {var that;

this.assessmentId = opts.assessmentId || this.root.getAttribute("assessment-id");

this.mounted = true;

if (this.initialized) {
  opts.trigger("personalityTraits.initialized");
}

that = this;

this.initialize = function() {
  if (this.personality_traits) {
    that.traits = this.personality_traits;
  }
  that.visible = true;
  that.traits = that.traits.slice(0, 8).map(function(trait) {
    var tf;
    tf = trait.personality_trait;
    tf.badge = tf.personality_type.badge;
    return tf;
  });
  that.update();
  this.initialized = true;
  if (this.mounted) {
    return opts.trigger("personalityTraits.initialized");
  }
};

if (this.personality_traits) {
  that.initialize();
} else if (this.assessmentId) {
  window.Traitify.getPersonalityTraits(this.assessmentId).then(function(results) {
    that.traits = results.personality_traits;
    return that.initialize();
  });
}

});

riot.tag('tf-personality-types', '<div class="tf-types-container" if="{this.visible}"> <div class="tf-types-scroller"> <div class="tf-types"> <div each="{type in this.currentTypes}" class="tf-type {type.active}" onclick="{parent.handleClick}"> <div class="tf-name-small">{type.name}</div> <div class="tf-badge-score-container" riot-style="border-color: #{type.badge.color_1}"> <img class="tf-badge" riot-src="{type.badge.image_medium}"> </div> <div class="tf-percent"> {type.score} / 100 </div> </div> <div class="tf-pointer" riot-style="left: {this.pointerPosition}px; background-color: #{this.pointerColor}"></div> </div> </div> <div class="tf-description"> {this.description} </div> </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } .tf-pointer{ margin-left: 20px; position: absolute; width: 86px; height: 10px; border-radius: 5px; -webkit-transition: all .4s ease-in-out; -moz-transition: all .4s ease-in-out; -o-transition: all .4s ease-in-out; transition: all .4s ease-in-out; } .tf-types-scroller{ width: 100%; overflow-x: auto; overflow-y: hidden; margin-bottom: 35px; text-align: center; } .tf-types-container{ font-family: "Source Sans Pro", Arial, Verdana, sans-serif; margin-bottom: 50px; } .tf-types-container .tf-score{ border-bottom: 1px solid #fff; font-size: 22px; } .tf-types-container .tf-name{ font-size: 28px; margin-top: 15px; text-align: center; } .tf-types-container .tf-types .tf-name-small{ font-size: 16px; margin-top: 0; } .tf-types-container .tf-badge{ width: 100%; } .tf-badge-score-background{ width: 100%; position: relative; height: 100%; opacity: .1; -webkit-backface-visibility: hidden; -moz-backface-visibility: hidden; } .tf-types-container .tf-badge-score-container{ border: 1px solid #fff; width: 40px; height: 40px; position: relative; overflow: hidden; border-radius: 50%; padding: 22px; margin: 7px auto 10px; -webkit-backface-visibility: hidden; -moz-backface-visibility: hidden; -webkit-transform: translate3d(0, 0, 0); -moz-transform: translate3d(0, 0, 0) } .tf-types-container .tf-type .tf-badge{ opacity: .9; } .tf-types-container .tf-percent{ -webkit-transition: all .4s ease-in-out; -moz-transition: all .4s ease-in-out; -o-transition: all .4s ease-in-out; transition: all .4s ease-in-out; position: relative; color: #bbb; } .tf-types-container .tf-badge-score-background{ width: 100%; height: 100%; opacity: .1; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=10)"; position: absolute; left: 0; bottom: 0; } .tf-types-container .tf-badge-score{ width: 100%; height: 0%; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)"; position: absolute; left: 0; bottom: 0; -webkit-transition: all .2s ease-in-out; -moz-transition: all .2s ease-in-out; -o-transition: all .2s ease-in-out; transition: all .2s ease-in-out; opacity: .3; } .tf-types-container .tf-type.tf-active .tf-badge-score{ height: 100%; bottom: 0; } .tf-types-container .tf-type:hover .tf-percent{ color: #333; } .tf-types-container .tf-types{ margin: 0 auto; position: relative; display: inline-block; width:882px; margin-bottom: 10px; } .tf-types-container .tf-type{ text-align: center; cursor: pointer; display: inline-block; position: relative; display: inline-block; padding: 10px; margin: 0 10px; } .tf-types-container .tf-description{ max-width: 600px; margin: 0 auto; text-align: justify; font-size: 16px; }', function(opts) {var that;

this.assessmentId = opts.assessmentId || this.root.getAttribute("assessment-id");

that = this;

this.on("mount", function() {
  this.mounted = true;
  if (this.initialized) {
    return opts.trigger("personalityTypes.initialized");
  }
});

that.initialize = function() {
  that.visible = true;
  that.types = that.personality_types.map(function(i, index) {
    var score;
    score = Math.round(i.score);
    i = i.personality_type;
    i.score = score;
    i.position = index;
    i.height = 0;
    return i;
  });
  that.types[0].active = "tf-active";
  that.description = that.types[0].description;
  that.name = that.types[0].name;
  that.score = that.types[0].score;
  that.pointerPosition = 0;
  that.pointerColor = that.types[0].badge.color_1;
  that.currentTypes = that.types;
  that.handleClick = function(e) {
    e.preventDefault();
    that.description = this.type.description;
    that.types = that.types.map(function(type) {
      type.active = "";
      type.height = 0;
      return type;
    });
    that.pointerPosition = this.type.position * 126.15;
    that.pointerColor = this.type.badge.color_1;
    that.name = this.type.name;
    this.type.active = "tf-active";
    return that.update();
  };
  that.update();
  this.initialized = true;
  if (this.mounted) {
    return opts.trigger("personalityTypes.initialized");
  }
};

});

riot.tag('tf-personality-blend', '<div class="tf-blends-container" if="{this.visible}"> <div class="tf-badges"> <div class="tf-badge" riot-style="border-color: {this.type1.border};"> <div class="tf-badge-background"></div> <img riot-src="{this.type1.badge.image_medium}"> </div> <div class="tf-badge" riot-style="border-color: {this.type2.border};"> <div class="tf-badge-background"></div> <img riot-src="{this.type2.badge.image_medium}"> </div> </div> <h2 class="tf-blend-title">{this.type1.name} / {this.type2.name}</h2> <div class="tf-blend-description">{this.description}</div> </div>', '@font-face { font-family: "Source Sans Pro"; font-style: normal; font-weight: 400; src: local(\'Source Sans Pro\'), local(\'Source Sans Pro\'), url("https://s3.amazonaws.com/traitify-cdn/assets/fonts/source-sans-pro.woff") format(\'woff\'); } .tf-blends-container{ width: 100%; font-family: "Source Sans Pro", Arial, Verdana, sans-serif; padding: 20px 20px 10px; box-sizing: border-box; } .tf-blends-container .tf-badge-background{ width: 100%; height: 100%; position: absolute; opacity: .2; top: 0; left: 0; } img{ width: 100%; } .tf-blends-container .tf-badges{ width: 100%; max-width: 330px; margin: 0 auto; text-align:center; } .tf-blends-container .tf-badge{ width: 22%; padding:12%; position: relative; border-radius: 50%; border: 2px solid; display: inline-block; overflow: hidden; } .tf-blends-container .tf-badge:first-child{ margin-right: -4%; z-index: 1; } .tf-blends-container .tf-badge:last-child{ margin-left: -4%; } .tf-blend-title { text-align: center; font-size: 25px; font-weight: 400; } .tf-blend-description{ margin: 0 auto 30px; text-align: justify; font-size: 15px; } @media screen and (min-width: 768px) { .tf-blend-description { font-size: 17px; max-width: 580px; } } @media screen and (min-width: 900px) { .tf-blend-description { font-size: 18px; line-height: 1.35; max-width: 650px; } }', function(opts) {var that;

this.assessmentId = opts.assessmentId || this.root.getAttribute("assessment-id");

that = this;

this.on("mount", function() {
  this.mounted = true;
  if (this.initialized) {
    return opts.trigger("personalityBlend.initialized");
  }
});

this.initialize = function() {
  that.visible = true;
  that.type1 = that.personality_blend.personality_type_1;
  that.type2 = that.personality_blend.personality_type_2;
  that.type1.bg = that.type1.badge.color_1;
  that.type1.border = that.type1.badge.color_1;
  that.type2.bg = that.type2.badge.color_1;
  that.type2.border = that.type2.badge.color_1;
  that.description = that.personality_blend.description;
  that.update();
  that.initialized = true;
  if (that.mounted) {
    return opts.trigger("personalityBlend.initialized");
  }
};

});
