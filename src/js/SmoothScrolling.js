class SmoothScrolling {
  constructor(speed = 0.05) {
    this.speed = speedParamCheck(speed, 0.05);
    this.totalHeight = document.documentElement.scrollHeight;
    this.offset = 0;

    this.init();
    window.addEventListener('resize', this.screenChange.bind(this));
  }

  init() {
    document.documentElement.style.cssText = `
      width: 100%;
      height: ${this.totalHeight}px;
      overflow: scroll;
    `;

    document.body.style.cssText = `
      position: fixed;
      height: ${this.totalHeight}px;
      z-index: 2;
      top: 0;
      left: 0;
      overflow: hidden;
    `;

    this.smoothScrolling();
  }

  smoothScrolling() {
    this.offset += (window.pageYOffset - this.offset) * this.speed;

    document.body.style.transform = `translate3d(0, -${this.offset}px, 0)`;

    requestAnimationFrame(this.smoothScrolling.bind(this));
  }

  screenChange() {
    document.documentElement.style.height = 'auto';
    document.body.style.cssText = `
      overflow: auto;
      height: auto;
    `;

    this.totalHeight = document.documentElement.scrollHeight;
    this.init();
  }
}

const speedParamCheck = (speed, defautSpeed) => {
  if (isNaN(speed)) return defautSpeed;
  if (Math.sign(speed) === -1) return defautSpeed;
  if (speed > 1.7) return defautSpeed;

  return speed;
};

export default SmoothScrolling;
