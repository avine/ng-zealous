import { Component, computed, ViewEncapsulation } from '@angular/core';
import { ZAvatarModule } from 'ng-zealous/avatar';
import { ZDemoModule, zDemoProp } from 'ng-zealous/demo';
import { PHOTO_URL_MOCK } from './avatar-data';
import docMarkdown from './avatar.md' with { loader: 'text' };

@Component({
  selector: 'app-avatar',
  imports: [ZAvatarModule, ZDemoModule],
  templateUrl: './avatar.html',
  encapsulation: ViewEncapsulation.None,
})
export default class Avatar {
  protected docMarkdown = docMarkdown;

  protected demoState = {
    fontSize: zDemoProp([undefined, '1.75rem', '2.5rem'], { defaultValue: '1.75rem' }),

    icon: zDemoProp(['person', 'face', 'account_circle']),

    name: zDemoProp([undefined, 'John Doe', 'John Junior Doe']),

    photoUrl: zDemoProp([undefined, '<photoUrl>']),
  };

  protected photoUrl = computed(() => (this.demoState.photoUrl() ? PHOTO_URL_MOCK : undefined));
}
