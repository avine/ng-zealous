import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { _buildInitials } from './_avatar-utils';

/**
 * A component that displays a user avatar with either an image, initials or icon.
 *
 * It supports three display modes in order of priority:
 * 1. Image - when `photoUrl` is provided
 * 2. Initials - when `name` is provided but no `photoUrl`
 * 3. Icon - when neither `photoUrl` nor `name` is provided
 *
 * @example
 * ```html
 * <z-avatar [photoUrl]="user.photoUrl" />
 * <z-avatar [name]="user.fullName" />
 * <z-avatar icon="face" />
 * <z-avatar />
 * ```
 */
@Component({
  selector: 'z-avatar',
  host: {
    class: 'z-avatar',
    '[style.background-image]': 'bgImage()',
  },
  imports: [MatIconModule],
  templateUrl: './avatar.html',
  styleUrls: ['./avatar.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ZAvatar {
  /**
   * URL of the avatar image to display.
   * If provided, the image will be shown instead of initials or icon.
   */
  photoUrl = input<string>();

  /**
   * The name to display as initials when no photo URL is provided.
   * The name is automatically transformed into initials.
   * @example "John Doe" becomes "JD"
   */
  name = input(undefined, { transform: (name?: string) => (name ? _buildInitials(name) : undefined) });

  /**
   * The icon name to display when neither `photoUrl` nor `name` is provided.
   * @default 'person'
   */
  icon = input('person');

  /**
   * Computed property that returns the CSS `background-image` value if a photo URL is provided.
   * @returns A CSS url() string or undefined if no photo URL is set
   */
  protected bgImage = computed(() => (this.photoUrl() ? `url(${this.photoUrl()})` : undefined));
}
