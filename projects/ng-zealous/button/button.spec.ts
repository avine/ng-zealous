import { Component, inputBinding, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatRipple } from '@angular/material/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZButton } from './button';
import { ZButtonIcon } from './button-icon';
import { ZButtonColor, ZButtonJustifyContent, ZButtonTextAlign, ZButtonType } from './button-types';

@Component({
  selector: 'z-spec-host',
  imports: [ZButton, ZButtonIcon],
  template: `
    <z-button [type]="type()" [color]="color()">
      <span zButtonIcon>home</span>
      Button with icon
    </z-button>
  `,
})
class SpecHost {
  type = signal<ZButtonType | undefined>(undefined);
  color = signal<ZButtonColor>('primary');
}

describe('ZButton with content', () => {
  let fixture: ComponentFixture<SpecHost>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(SpecHost);
    compiled = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should render button content', () => {
    const buttonEl = compiled.querySelector('.z-button');
    expect(buttonEl).toBeTruthy();
    expect(buttonEl?.textContent).toContain('Button with icon');
  });

  it('should render icon', () => {
    const iconEl = compiled.querySelector('[zbuttonicon]');
    expect(iconEl).toBeTruthy();
    expect(iconEl?.textContent?.trim()).toBe('home');
  });

  it('should render container', () => {
    const containerEl = compiled.querySelector('.z-button__container');
    expect(containerEl).toBeTruthy();
  });

  it('should render label', () => {
    const labelEl = compiled.querySelector('.z-button__label');
    expect(labelEl).toBeTruthy();
    expect(labelEl?.textContent).toContain('Button with icon');
  });
});

describe('ZButton', () => {
  let fixture: ComponentFixture<ZButton>;
  let compiled: HTMLElement;
  let component: ZButton;

  let type: WritableSignal<ZButtonType | undefined>;
  let typeAlias: WritableSignal<ZButtonType | undefined | ''>;
  let color: WritableSignal<ZButtonColor>;
  let rounded: WritableSignal<boolean | string>; // Allow `string` to test `booleanAttribute` transform
  let separator: WritableSignal<boolean | string>; // Allow `string` to test `booleanAttribute` transform
  let vertical: WritableSignal<boolean | string>; // Allow `string` to test `booleanAttribute` transform
  let verticalOnMobile: WritableSignal<boolean | string>; // Allow `string` to test `booleanAttribute` transform
  let reverse: WritableSignal<boolean | string>; // Allow `string` to test `booleanAttribute` transform
  let justifyContent: WritableSignal<ZButtonJustifyContent>;
  let textAlign: WritableSignal<ZButtonTextAlign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    type = signal(undefined);
    typeAlias = signal(undefined);
    color = signal('primary');
    rounded = signal(false);
    separator = signal(false);
    vertical = signal(false);
    verticalOnMobile = signal(false);
    reverse = signal(false);
    justifyContent = signal('center');
    textAlign = signal('center');

    fixture = TestBed.createComponent(ZButton, {
      bindings: [
        inputBinding('type', type),
        inputBinding('zButton', typeAlias),
        inputBinding('color', color),
        inputBinding('rounded', rounded),
        inputBinding('separator', separator),
        inputBinding('vertical', vertical),
        inputBinding('verticalOnMobile', verticalOnMobile),
        inputBinding('reverse', reverse),
        inputBinding('justifyContent', justifyContent),
        inputBinding('textAlign', textAlign),
      ],
    });
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    await fixture.whenStable();
  });

  describe('Component initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should use input default values when created without bindings', async () => {
      const _fixture = TestBed.createComponent(ZButton);
      const _compiled: HTMLElement = _fixture.nativeElement;
      await _fixture.whenStable();

      expect(_compiled.classList.contains('z-sys-reset')).toBe(true);
      expect(_compiled.classList.contains('z-button')).toBe(true);
      expect(_compiled.classList.contains('z-button--primary')).toBe(true);
    });

    it('should have MatRipple directive', () => {
      const matRipple = fixture.debugElement.injector.get(MatRipple);
      expect(matRipple).toBeTruthy();
    });
  });

  describe('Host classes', () => {
    it('should have base classes', () => {
      expect(compiled.classList.contains('z-sys-reset')).toBe(true);
      expect(compiled.classList.contains('z-button')).toBe(true);
    });

    it('should apply default color class', () => {
      expect(compiled.classList.contains('z-button--primary')).toBe(true);
    });

    it('should not have type class when type is undefined', () => {
      expect(compiled.classList.contains('z-button--filled')).toBe(false);
      expect(compiled.classList.contains('z-button--tonal')).toBe(false);
      expect(compiled.classList.contains('z-button--outlined')).toBe(false);
    });
  });

  describe('Type input', () => {
    it('should apply filled type class', async () => {
      type.set('filled');
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--filled')).toBe(true);
    });

    it('should apply tonal type class', async () => {
      type.set('tonal');
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--tonal')).toBe(true);
    });

    it('should apply outlined type class', async () => {
      type.set('outlined');
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--outlined')).toBe(true);
    });

    it('should iterate through all button types', async () => {
      const buttonTypes: ZButtonType[] = ['filled', 'tonal', 'outlined'];

      for (const buttonType of buttonTypes) {
        type.set(buttonType);
        await fixture.whenStable();

        expect(compiled.classList.contains(`z-button--${buttonType}`)).toBe(true);
      }
    });
  });

  describe('TypeAlias input (zButton)', () => {
    it('should apply filled type class via alias', async () => {
      typeAlias.set('filled');
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--filled')).toBe(true);
    });

    it('should apply tonal type class via alias', async () => {
      typeAlias.set('tonal');
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--tonal')).toBe(true);
    });

    it('should apply outlined type class via alias', async () => {
      typeAlias.set('outlined');
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--outlined')).toBe(true);
    });

    it('should transform empty string to undefined', async () => {
      typeAlias.set('');
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--filled')).toBe(false);
      expect(compiled.classList.contains('z-button--tonal')).toBe(false);
      expect(compiled.classList.contains('z-button--outlined')).toBe(false);
    });

    it('should prioritize type input over typeAlias when both are set', async () => {
      type.set('filled');
      typeAlias.set('outlined');
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--filled')).toBe(true);
      expect(compiled.classList.contains('z-button--outlined')).toBe(false);
    });
  });

  describe('Color input', () => {
    it('should apply primary color class', async () => {
      color.set('primary');
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--primary')).toBe(true);
    });

    it('should apply secondary color class', async () => {
      color.set('secondary');
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--secondary')).toBe(true);
    });

    it('should apply error color class', async () => {
      color.set('error');
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--error')).toBe(true);
    });

    it('should iterate through all button colors', async () => {
      const buttonColors: ZButtonColor[] = ['primary', 'secondary', 'error'];

      for (const buttonColor of buttonColors) {
        color.set(buttonColor);
        await fixture.whenStable();

        expect(compiled.classList.contains(`z-button--${buttonColor}`)).toBe(true);
      }
    });
  });

  describe('Separator input', () => {
    it('should not add separator class when separator is false', () => {
      const labelEl = compiled.querySelector('.z-button__label');
      expect(labelEl?.classList.contains('z-button__label--separator')).toBe(false);
    });

    it('should not add separator class when no icon is present', async () => {
      separator.set(true);
      await fixture.whenStable();

      const labelEl = compiled.querySelector('.z-button__label');
      // No icon, so separator class should not be added even if separator is true
      expect(labelEl?.classList.contains('z-button__label--separator')).toBe(false);
    });

    it('should handle booleanAttribute transform with empty string', async () => {
      separator.set(''); // Empty string should be treated as true by booleanAttribute
      await fixture.whenStable();

      const labelEl = compiled.querySelector('.z-button__label');
      expect(labelEl?.classList.contains('z-button__label--separator')).toBe(false);
    });
  });

  describe('Vertical input', () => {
    it('should not add vertical class when vertical is false', () => {
      const containerEl = compiled.querySelector('.z-button__container');
      expect(containerEl?.classList.contains('z-button__container--vertical')).toBe(false);
    });

    it('should add vertical class when vertical is true', async () => {
      vertical.set(true);
      await fixture.whenStable();

      const containerEl = compiled.querySelector('.z-button__container');
      expect(containerEl?.classList.contains('z-button__container--vertical')).toBe(true);
    });

    it('should handle booleanAttribute transform with empty string', async () => {
      vertical.set(''); // Empty string should be treated as true by booleanAttribute
      await fixture.whenStable();

      const containerEl = compiled.querySelector('.z-button__container');
      expect(containerEl?.classList.contains('z-button__container--vertical')).toBe(true);
    });
  });

  describe('Rounded input', () => {
    it('should not add rounded class when rounded is false', () => {
      expect(compiled.classList.contains('z-button--rounded')).toBe(false);
    });

    it('should add rounded class when rounded is true', async () => {
      rounded.set(true);
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--rounded')).toBe(true);
    });

    it('should handle booleanAttribute transform with empty string', async () => {
      rounded.set(''); // Empty string should be treated as true by booleanAttribute
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--rounded')).toBe(true);
    });
  });

  describe('VerticalOnMobile input', () => {
    it('should not add vertical-on-mobile class when verticalOnMobile is false', () => {
      const containerEl = compiled.querySelector('.z-button__container');
      expect(containerEl?.classList.contains('z-button__container--vertical-on-mobile')).toBe(
        false,
      );
    });

    it('should add vertical-on-mobile class when verticalOnMobile is true', async () => {
      verticalOnMobile.set(true);
      await fixture.whenStable();

      const containerEl = compiled.querySelector('.z-button__container');
      expect(containerEl?.classList.contains('z-button__container--vertical-on-mobile')).toBe(true);
    });

    it('should handle booleanAttribute transform with empty string', async () => {
      verticalOnMobile.set(''); // Empty string should be treated as true by booleanAttribute
      await fixture.whenStable();

      const containerEl = compiled.querySelector('.z-button__container');
      expect(containerEl?.classList.contains('z-button__container--vertical-on-mobile')).toBe(true);
    });
  });

  describe('Reverse input', () => {
    it('should not add reverse class when reverse is false', () => {
      const containerEl = compiled.querySelector('.z-button__container');
      expect(containerEl?.classList.contains('z-button__container--reverse')).toBe(false);
    });

    it('should add reverse class when reverse is true', async () => {
      reverse.set(true);
      await fixture.whenStable();

      const containerEl = compiled.querySelector('.z-button__container');
      expect(containerEl?.classList.contains('z-button__container--reverse')).toBe(true);
    });

    it('should handle booleanAttribute transform with empty string', async () => {
      reverse.set(''); // Empty string should be treated as true by booleanAttribute
      await fixture.whenStable();

      const containerEl = compiled.querySelector('.z-button__container');
      expect(containerEl?.classList.contains('z-button__container--reverse')).toBe(true);
    });
  });

  describe('JustifyContent input', () => {
    it('should apply justify-content style', async () => {
      const buttonJustifyContents: ZButtonJustifyContent[] = [
        'start',
        'center',
        'end',
        'space-between',
        'space-evenly',
      ];

      for (const buttonJustifyContent of buttonJustifyContents) {
        justifyContent.set(buttonJustifyContent);
        await fixture.whenStable();

        const containerEl = compiled.querySelector('.z-button__container') as HTMLElement;
        expect(containerEl?.style.justifyContent).toBe(buttonJustifyContent);
      }
    });
  });

  describe('TextAlign input', () => {
    it('should apply text-align style', async () => {
      const buttonTextAligns: ZButtonTextAlign[] = ['start', 'center', 'end'];

      for (const buttonTextAlign of buttonTextAligns) {
        textAlign.set(buttonTextAlign);
        await fixture.whenStable();

        const containerEl = compiled.querySelector('.z-button__container') as HTMLElement;
        expect(containerEl?.style.textAlign).toBe(buttonTextAlign);
      }
    });
  });

  describe('Ripple interactions', () => {
    it('should trigger ripple on Enter key', async () => {
      const matRipple = fixture.debugElement.injector.get(MatRipple);
      const fadeOutSpy = vi.spyOn(matRipple, 'fadeOutAll');
      const launchSpy = vi.spyOn(matRipple, 'launch');

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      compiled.dispatchEvent(event);
      await fixture.whenStable();

      expect(fadeOutSpy).toHaveBeenCalled();
      expect(launchSpy).toHaveBeenCalledWith({ centered: true });
    });

    it('should trigger ripple on Space key (keyup)', async () => {
      const matRipple = fixture.debugElement.injector.get(MatRipple);
      const fadeOutSpy = vi.spyOn(matRipple, 'fadeOutAll');
      const launchSpy = vi.spyOn(matRipple, 'launch');

      const event = new KeyboardEvent('keyup', { key: ' ' });
      compiled.dispatchEvent(event);
      await fixture.whenStable();

      expect(fadeOutSpy).toHaveBeenCalled();
      expect(launchSpy).toHaveBeenCalledWith({ centered: true });
    });

    it('should not trigger ripple on other keys', async () => {
      const matRipple = fixture.debugElement.injector.get(MatRipple);
      const launchSpy = vi.spyOn(matRipple, 'launch');

      const event = new KeyboardEvent('keydown', { key: 'a' });
      compiled.dispatchEvent(event);
      await fixture.whenStable();

      expect(launchSpy).not.toHaveBeenCalled();
    });
  });

  describe('Template structure', () => {
    it('should render container element', () => {
      const containerEl = compiled.querySelector('.z-button__container');
      expect(containerEl).toBeTruthy();
    });

    it('should render label element', () => {
      const labelEl = compiled.querySelector('.z-button__label');
      expect(labelEl).toBeTruthy();
    });
  });

  describe('Complex scenarios', () => {
    it('should handle all inputs together', async () => {
      type.set('filled');
      color.set('error');
      vertical.set(true);
      rounded.set(true);
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--filled')).toBe(true);
      expect(compiled.classList.contains('z-button--error')).toBe(true);
      expect(compiled.classList.contains('z-button--rounded')).toBe(true);

      const containerEl = compiled.querySelector('.z-button__container');
      expect(containerEl?.classList.contains('z-button__container--vertical')).toBe(true);
    });

    it('should handle typeAlias fallback when type is undefined', async () => {
      type.set(undefined);
      typeAlias.set('tonal');
      await fixture.whenStable();

      expect(compiled.classList.contains('z-button--tonal')).toBe(true);
    });
  });
});

describe('ZButton with ZButtonIcon and separator', () => {
  @Component({
    selector: 'z-spec-button-with-icon',
    imports: [ZButton, ZButtonIcon],
    template: `
      <z-button separator [reverse]="reverse()">
        <span zButtonIcon>home</span>
        Label
      </z-button>
    `,
  })
  class SpecButtonWithIcon {
    reverse = signal(false);
  }

  let fixture: ComponentFixture<SpecButtonWithIcon>;
  let compiled: HTMLElement;
  let component: SpecButtonWithIcon;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(SpecButtonWithIcon);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should add separator class when separator is true and icon is present', async () => {
    await fixture.whenStable();

    const labelEl = compiled.querySelector('.z-button__label');
    expect(labelEl?.classList.contains('z-button__label--separator')).toBe(true);
    expect(labelEl?.classList.contains('z-button__label--separator-reverse')).toBe(false);
  });

  it('should add separator-reverse class when separator is true, icon is present and reverse is true', async () => {
    component.reverse.set(true);
    await fixture.whenStable();

    const labelEl = compiled.querySelector('.z-button__label');
    expect(labelEl?.classList.contains('z-button__label--separator')).toBe(false);
    expect(labelEl?.classList.contains('z-button__label--separator-reverse')).toBe(true);
  });
});

describe('ZButton with different selectors', () => {
  describe('button[zButton] selector', () => {
    @Component({
      selector: 'z-spec-button-element',
      imports: [ZButton],
      template: `<button zButton="filled">Click me</button>`,
    })
    class SpecButtonElement {}

    it('should work with button element and attribute selector', async () => {
      await TestBed.configureTestingModule({}).compileComponents();

      const fixture = TestBed.createComponent(SpecButtonElement);
      const compiled = fixture.nativeElement;
      await fixture.whenStable();

      const buttonEl = compiled.querySelector('button');
      expect(buttonEl?.classList.contains('z-button')).toBe(true);
      expect(buttonEl?.classList.contains('z-button--filled')).toBe(true);
      expect(buttonEl?.textContent).toContain('Click me');
    });
  });

  describe('a[zButton] selector', () => {
    @Component({
      selector: 'z-spec-anchor-element',
      imports: [ZButton],
      template: `<a zButton="outlined" href="#">Link button</a>`,
    })
    class SpecAnchorElement {}

    it('should work with anchor element and attribute selector', async () => {
      await TestBed.configureTestingModule({}).compileComponents();

      const fixture = TestBed.createComponent(SpecAnchorElement);
      const compiled = fixture.nativeElement;
      await fixture.whenStable();

      const anchorEl = compiled.querySelector('a');
      expect(anchorEl?.classList.contains('z-button')).toBe(true);
      expect(anchorEl?.classList.contains('z-button--outlined')).toBe(true);
      expect(anchorEl?.textContent).toContain('Link button');
    });
  });
});
