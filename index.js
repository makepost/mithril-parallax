;(function () {
  'use strict';

  var Root = {
    controller: function () {
      var ctrl = this;

      ctrl.offset = 0;
      ctrl.power = power;
      ctrl.images = [
        faker.image.abstract(640, 480, true),
        faker.image.abstract(640, 480, true),
        faker.image.abstract(640, 480, true),
      ];
      ctrl.target = target;

      function power() {
        if (window.innerWidth / window.innerHeight < 4 / 3) {
          return window.innerHeight;
        } else {
          return window.innerHeight * 2;
        }
      }

      function target(zoneElem) {
        return zoneElem.childNodes[0];
      }
    },

    view: function (ctrl) {
      return (
        m('.demo-root', [
          m(Section),
          m(window.MithrilParallax.Zone, { offset: ctrl.offset, power: ctrl.power, style: Styles.zone, target: ctrl.target }, [
            m('img', { src: ctrl.images[0], style: Styles.target }),
            m(Section),
          ]),
          m(Section),
          m(window.MithrilParallax.Zone, { offset: ctrl.offset, power: ctrl.power, style: Styles.zone, target: ctrl.target }, [
            m('img', { src: ctrl.images[1], style: Styles.target }),
            m(Section),
          ]),
          m(Section),
          m(window.MithrilParallax.Zone, { offset: ctrl.offset, power: ctrl.power, style: Styles.zone, target: ctrl.target }, [
            m('img', { src: ctrl.images[2], style: Styles.target }),
            m(Section),
          ]),
          m(Section),
        ])
      );
    },
  };

  var Section = {
    controller: function () {
      var ctrl = this;

      ctrl.length = 10 + Math.floor(Math.random() * 20);
      ctrl.text = [];

      for (var i = 0; i < ctrl.length; i++) {
        ctrl.text.push(faker.lorem.sentences(10 + Math.floor(Math.random() * 20)));
      }
    },

    view: function (ctrl) {
      return (
        m('.demo-section', { style: Styles.section }, [
          ctrl.text.map(Paragraph),
          m('style', [
            '.mpx-zone img { left: -100%; width: 300%; }',
            '@media (min-aspect-ratio: 4/3) { .mpx-zone img { left: 0; width: 100%; } }',
          ]),
        ])
      );
    },
  };

  var Styles = {
    section: {
      position: 'relative',
    },

    target: {
      bottom: 0,
      opacity: 0.4,
      position: 'absolute',
    },

    zone: {
      height: '50vh',
      overflow: 'hidden',
      position: 'relative',
    },
  };

  function Paragraph(children) {
    return m('p', children);
  }

  function activate() {
    m.mount(document.getElementById('app'), Root);
  }

  $(document).ready(activate);
})();
