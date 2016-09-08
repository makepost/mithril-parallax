# mithril-parallax

Move target inside a zone on window scroll.

### Usage

```javascript
var Styles = {
  heading: {
    position: 'relative',
  },

  target: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    width: '100%',
  },

  zone: {
    height: '50vh',
    overflow: 'hidden',
    position: 'relative',
  },
};

function target(elem) {
  return elem.children[0];
}

function power(pCtrl) {
  return pCtrl.windowHeight * 2;
}

m(window.MithrilParallax.Zone, { offset: 0, power: power, style: Styles.zone, target: target }, [
  m('img', { src: 'https://placehold.it/640x480', style: Styles.target }),
  m('h1', { style: Styles.heading }, 'Lorem ipsum dolor sit amet'),
});
```

See [index.html](index.html) and [index.js](index.js) for another example.

### Notes

- `power` can be negative, try it with `top: 0` instead of `bottom: 0` in `Styles.target`

- `offset` defaults to `0`

- `style` is optional, you can write CSS for `.mpx-zone` instead

- `target` defaults to first child

### License

MIT
