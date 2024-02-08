let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchTouchX = 0;
  touchTouchY = 0;
  touchX = 0;
  touchY = 0;
  prevtouchX = 0;
  prevtouchY = 0;
  velX = Mtouch0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener('touchmove', (e) => {
      if(!this.rotating) {
        this.touchX = e.clientX;
        this.touchY = e.clientY;
        
        this.velX = this.touchX - this.prevtouchX;
        this.velY = this.touchY - this.prevtouchY;
      }
        
      const dirX = e.clientX - this.touchTouchX;
      const dirY = e.clientY - this.touchTouchY;
      const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if(this.rotating) {
        this.rotation = degrees;
      }

      if(this.holdingPaper) {
        if(!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevtouchX = this.touchX;
        this.prevtouchY = this.touchY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    })

    paper.addEventListener('touchdown', (e) => {
      if(this.holdingPaper) return; 
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      if(e.button === 0) {
        this.touchTouchX = this.touchX;
        this.touchTouchY = this.touchY;
        this.prevtouchX = this.touchX;
        this.prevtouchY = this.touchY;
      }
      if(e.button === 2) {
        this.rotating = true;
      }
    });
    window.addEventListener('touchup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});