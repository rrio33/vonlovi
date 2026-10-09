(function () {
  "use strict";

  if (!window.VonloviCart?.cartUrl) return;
  window.location.replace(VonloviCart.cartUrl());
})();
