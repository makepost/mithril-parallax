;(function () {
  'use strict';

  var Zone = {
    controller: function (props) {
      var ctrl = this;

      ctrl.configure = configure;
      ctrl.handleResize = handleResize;
      ctrl.handleScroll = handleScroll;
      ctrl.updateCache = updateCache;
      ctrl.updateTransform = updateTransform;

      ctrl.refs = {
        target: null,
        zone: null,
      };

      ctrl.offset = props.offset ? props.offset : 0;
      ctrl.power = 0;
      ctrl.scrollY = 0;
      ctrl.ticking = false;
      ctrl.windowHeight = 0;
      ctrl.zoneHeight = 0;
      ctrl.zoneTop = 0;

      function configure(elem, isInit, context) {
        if (isInit) {
          return;
        }

        ctrl.refs.target = props.target ? props.target(elem) : elem.childNodes[0];
        ctrl.refs.zone = elem;

        window.addEventListener('resize', ctrl.handleResize);
        window.addEventListener('scroll', ctrl.handleScroll);

        ctrl.updateCache();
        ctrl.updateTransform();

        context.onunload = function () {
          window.removeEventListener('resize', ctrl.handleResize);
          window.removeEventListener('scroll', ctrl.handleScroll);
        };
      }

      function handleResize() {
        if (!ctrl.ticking) {
          window.requestAnimationFrame(function () {
            ctrl.updateCache();
            ctrl.updateTransform();
            ctrl.ticking = false;
          });
        }

        ctrl.ticking = true;
      }

      function handleScroll() {
        ctrl.scrollY = document.body.scrollTop;

        if (!ctrl.ticking) {
          window.requestAnimationFrame(function () {
            ctrl.updateTransform();
            ctrl.ticking = false;
          });
        }

        ctrl.ticking = true;
      }

      function updateCache() {
        var height = ctrl.refs.zone.offsetHeight;
        var offsetTop = ctrl.refs.zone.getBoundingClientRect().top + ctrl.scrollY;
        ctrl.windowHeight = window.innerHeight;
        ctrl.zoneHeight = height + ctrl.windowHeight * 2;
        ctrl.zoneTop = offsetTop - ctrl.windowHeight;
        ctrl.power = props.power(ctrl);
      }

      function updateTransform() {
        var scrollAboveZone = ctrl.scrollY - ctrl.zoneTop;
        var aboveViewport = scrollAboveZone / ctrl.zoneHeight;

        if (aboveViewport < 0 || aboveViewport > 1) {
          return;
        }

        var translateY = ctrl.offset + aboveViewport * ctrl.power;
        ctrl.refs.target.style.transform = 'translateY(' + translateY + 'px';
      }
    },

    view: function (ctrl, props, children) {
      return m('.mpx-zone', { config: ctrl.configure, style: props.style }, children);
    },
  };

  var MithrilParallax = {
    Zone: Zone,
  };

  if (typeof module !== 'undefined') {
    module.exports = MithrilParallax;
  }

  if (typeof window !== 'undefined') {
    window.MithrilParallax = MithrilParallax;
  }
})();
