import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getCaptcha();
  }

  characters: any = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%$&!';

  captchaString: string = '';

  enterdCaptcha: string = '';


  generateCaptcha(n: number) {
    let CaptchaString = '';
    for (let i = 0; i < n; i++) {
      CaptchaString += this.characters[(Math.floor(Math.random() * this.characters.length))];
    }
    return CaptchaString;
  }

  getCaptcha() {
    let min = 5;
    let max = 8;

    let random = Math.floor(Math.random() * (+max - +min)) + +min;
    this.captchaString = this.generateCaptcha(random);
    this.fillCaptcha();
  }

  fillCaptcha() {
    var canvas = document.getElementById('captchaCanvas') as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
  
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw random lines
      for (let i = 0; i < 10; i++) {
        ctx.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        ctx.lineWidth = Math.random() * 5 + 1; // Random line width between 1 and 6
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
      }
  
      ctx.font = '40px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var captcha = this.captchaString;
      var charWidth = ctx.measureText('M').width; // Approximate width of a character
      var startX = (canvas.width - charWidth * captcha.length) / 2;
  
      ctx.globalAlpha = 1; // Reset transparency
  
      for (let i = 0; i < captcha.length; i++) {
        ctx.fillText(captcha[i], startX + i * charWidth, canvas.height / 2);
      }
  
      ctx.lineWidth = 1; // Reset line width
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }
  }

  checkCaptcha() {

    if (this.enterdCaptcha == this.captchaString) {
      alert('Captcha Matched');
    } else {
      alert('Captcha Not Matched');
    }
  }

}
