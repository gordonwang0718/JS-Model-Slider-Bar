(function(window, $) {
  var defaultConfig = {};

  function Slider(config) {
    this.config = $.extend({}, defaultConfig, config);
    this.$slider = $("<div class='slider'></div>");
    this.$el = this.config && this.config.el;
    this.$circle = $("<div class='circle'></div>");
    this.interval = 0;
    this.init();
  }

  Slider.prototype.init = function() {
    this.renderBar();
    this.posCircle();
    this.addEvent();
  }

  Slider.prototype.renderBar = function() {
    this.$el.append(this.$slider);
  }

  Slider.prototype.posCircle = function() {
    var values = this.config && this.config.values;
    if (values) {
      var width = this.$slider.width();
      this.interval = width / (values.length - 1);
      this.initCircle(width);
      for (var i = 0; i < values.length; i++) {
        for (key in values[i]) {
          var left = width * (key / (values.length - 1));
          this.initLine(left, values[i][key]);
        }
      }
    }
  }

  Slider.prototype.initCircle = function(width) {
    this.$circle.css('left', width / 2);
    this.$el.append(this.$circle);
  }

  Slider.prototype.initLine = function(left, value) {
    var $segmentedLine = $("<div class='segmentedLine'></div>");
    $segmentedLine.css('left', left);
    this.$el.append($segmentedLine);
    var $label = $("<div class='label'></div>");
    $label.css('left', left);
    $label.text(value);
    this.$el.append($label);
  }

  Slider.prototype.addEvent = function() {
    var self = this;
    this.$el.on('click', function(e) {
      var x = e.pageX - self.$slider.offset().left;
      var pos = self.findClosetPos(x);
      self.$circle.animate({
        left: pos
      }, 200);
    });
  }

  Slider.prototype.findClosetPos = function(x) {
    var index = Math.floor(x / this.interval);
    var remainer = x % this.interval;
    var fraction = remainer / this.interval;
    return (fraction > 0.5) ? (index + 1) * this.interval : index * this.interval;
  }

  window.Slider = Slider;
})(window, jQuery);

var config = {
  "el": $('.container'),
  "values": [
    {0: "More Open"},
    {1: "SemiOpen"},
    {2: "Default"},
    {3: "SemiPrivate"},
    {4: "Private"}
  ]
}

var mySlider = new Slider(config);
