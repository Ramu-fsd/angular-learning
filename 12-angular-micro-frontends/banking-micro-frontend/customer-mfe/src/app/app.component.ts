import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="remote-shell"><header class="header"><a routerLink="/" class="brand"><span class="symbol">C</span><span><b>Customers</b><small>BANKING DOMAIN</small></span></a><span class="remote-badge">CUSTOMER REMOTE · PORT 4203</span></header><main><router-outlet /></main><footer>Customer management domain micro frontend <span>Standalone remote · Synthetic data</span></footer></div>
  `,
  styles: [`
    :host{display:block;min-height:100vh}.remote-shell{min-height:100vh;display:flex;flex-direction:column}.header{height:65px;background:#fff;border-bottom:1px solid #e6ebf1;display:flex;align-items:center;justify-content:space-between;padding:0 max(25px,calc((100% - 1250px)/2))}.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:#233852}.symbol{width:34px;height:34px;background:#2f896f;color:#fff;border-radius:9px;display:grid;place-items:center;font-weight:800}.brand b,.brand small{display:block}.brand b{font-size:14px}.brand small{font-size:8px;letter-spacing:1px;color:#8a98aa;margin-top:3px}.remote-badge{font-size:8px;letter-spacing:1px;color:#28775f;background:#eaf6f1;padding:7px 9px;border-radius:5px;font-weight:700}main{width:100%;flex:1}footer{background:#fff;border-top:1px solid #e8edf2;padding:15px max(25px,calc((100% - 1250px)/2));font-size:9px;color:#9aa5b3}footer span{float:right}@media(max-width:600px){.header{padding:0 14px}.remote-badge{font-size:7px}footer{padding:13px 14px}footer span{display:none}}
  `]
})
export class AppComponent {}
