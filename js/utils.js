var Utils = {
  doesIntesect: function(x1, y1, w1, h1, x2, y2, w2, h2) {
    return (Game.p.abs(x1 - x2) * 2 < (w1 + w2)) &&
           (Game.p.abs(y1 - y2) * 2 < (h1 + h2));
  }
};
