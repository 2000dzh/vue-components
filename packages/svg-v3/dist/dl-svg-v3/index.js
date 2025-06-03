import { createElementBlock, openBlock, createElementVNode } from 'vue';

const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var script$2 = /* @__PURE__ */ Object.assign({
  name: "Add"
}, {
  __name: "add",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", _hoisted_1$2, _cache[0] || (_cache[0] = [
        createElementVNode(
          "path",
          {
            fill: "currentColor",
            d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
          },
          null,
          -1
          /* HOISTED */
        )
      ]));
    };
  }
});

script$2.__file = "components/add.vue";

const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var script$1 = /* @__PURE__ */ Object.assign({
  name: "Del"
}, {
  __name: "del",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", _hoisted_1$1, _cache[0] || (_cache[0] = [
        createElementVNode(
          "path",
          {
            fill: "currentColor",
            d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64"
          },
          null,
          -1
          /* HOISTED */
        )
      ]));
    };
  }
});

script$1.__file = "components/del.vue";

const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
var script = /* @__PURE__ */ Object.assign({
  name: "Search"
}, {
  __name: "search",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", _hoisted_1, _cache[0] || (_cache[0] = [
        createElementVNode(
          "path",
          {
            fill: "currentColor",
            d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
          },
          null,
          -1
          /* HOISTED */
        )
      ]));
    };
  }
});

script.__file = "components/search.vue";

export { script$2 as Add, script$1 as Del, script as Search };
