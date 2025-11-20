# Avatar

A component that displays a user avatar with either an image, initials or icon.

It supports three display modes in order of priority:

1.  Image - when `photoUrl` is provided
2.  Initials - when `name` is provided but no `photoUrl`
3.  Icon - when neither `photoUrl` nor `name` is provided

## Import

```ts
import { ZAvatarModule } from 'ng-zaelous/avatar';
```

## Usage

Use the `font-size` CSS property to change the avatar size.

```html
<z-avatar style="font-size: 3rem" />
```

Display the avatar with the default icon.

```html
<z-avatar />
```

Use the `icon` input to change the icon.

```html
<z-avatar icon="face />
```

Use the `name` input to display the user's initials.

```html
<z-avatar name="John Doe" />
<!-- Displays: JD -->
```

Use the `photoUrl` input to display a user image.

```html
<z-avatar photoUrl="/path/to/image" />
```
