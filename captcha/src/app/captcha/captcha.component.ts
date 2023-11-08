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

      for (let i = 0; i < captcha.length; i++) {
        ctx.globalAlpha = Math.random() * 0.5 + 0.5; // Random transparency between 0.5 and 1
        ctx.fillText(captcha[i], startX + i * charWidth, canvas.height / 2);
      }

      ctx.globalAlpha = 1; // Reset transparency
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }
  }



}
