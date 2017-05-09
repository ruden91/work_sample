class Slot {
  constructor() {
    this.tMax = 3000;
    this.height = 210;
    this.speeds = [];
    this.r = [];
    this.reels = [
      ['잘생김1', '멋진', '매력적인'],
      ['잘생김2', '멋진', '매력적인'],
      ['잘생김3', '멋진', '매력적인']
    ];
    this.$msg;
    this.$reels;
    this.start;
  }

  onEventHandlers() {
      this.initSlotMachine();
  };

  initSlotMachine() {
    this.$reels = $('.reel').each((i, elem) => {
      elem.innerHTML = '<div><p>' + this.reels[i].join('</p><p>') + '</p></div><div><p>' + this.reels[i].join('</p><p>') + '</p></div>'
    });

    $('button').on('click', (e) => {
      this.actionSlotMachine();
    })
  }

  actionSlotMachine() {
    if (this.start !== undefined) {
      return;
    }

    for (let i = 0; i < 3; i++) {
      this.speeds[i] = Math.random() + 0.5;
      this.r[i] = (Math.random() * 3 | 0) * this.height / 3;
    }

    this.animateSlotMachine();
  }
  animateSlotMachine(now) {
    if (!this.start) {
      this.start = now;
    }
    let t = now - this.start || 0;

    for (let i = 0; i < 3; ++i)
      this.$reels[i].scrollTop = (this.speeds[i] / this.tMax / 2 * (this.tMax - t) * (this.tMax - t) + this.r[i]) % this.height | 0;

    if (t < this.tMax)
      requestAnimationFrame(this.animateSlotMachine.bind(this));
    else {
      this.start = undefined;
      this.checkSlotMachine();
    }
  }
  checkSlotMachine() {
    console.log('hi');
  }
}
var slot = new Slot();
slot.onEventHandlers();
