import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page"><a routerLink="/" class="back">← Back to overview</a><div class="placeholder"><div class="icon">⌁</div><span class="eyebrow">MICRO FRONTEND MODULE</span><h1>{{title}}</h1><p>{{description}}</p><div class="status">REMOTE NOT REGISTERED YET</div><a routerLink="/" class="button">Return to platform overview</a></div></section>
  `,
  styles: [`
    .page{padding:30px 34px}.back{font-size:11px;color:#286cba;text-decoration:none}.placeholder{max-width:560px;margin:12vh auto;text-align:center;background:#fff;border:1px solid #e7ecf2;border-radius:12px;padding:42px 30px}.icon{width:48px;height:48px;margin:0 auto 17px;background:#edf4fc;color:#3979bb;border-radius:13px;display:grid;place-items:center;font-size:26px}.eyebrow{font-size:8px;letter-spacing:1.5px;color:#8295a9;font-weight:700}h1{font-size:23px;color:#20334d;margin:12px 0}.placeholder p{font-size:12px;color:#8391a2;line-height:1.7}.status{display:inline-block;margin:15px 0 22px;padding:7px 10px;background:#fff5e5;color:#a7792c;border-radius:5px;font-size:8px;letter-spacing:.8px;font-weight:700}.button{display:block;width:max-content;margin:auto;background:#286cba;color:#fff;text-decoration:none;padding:10px 14px;border-radius:6px;font-size:10px}
  `]
})
export class PlaceholderComponent {
  private readonly route = inject(ActivatedRoute);
  readonly title = this.route.snapshot.data['title'] as string;
  readonly description = this.route.snapshot.data['description'] as string;
}
