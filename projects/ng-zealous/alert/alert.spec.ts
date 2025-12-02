import { Component, inputBinding, signal, twoWayBinding, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZAlert } from './alert';
import { ZAlertIntl } from './alert-intl';
import { ZAlertType } from './alert-types';
import { ZAlertModule } from './index';

describe('ZAlert with content', () => {
  @Component({
    selector: 'z-spec-host',
    imports: [ZAlertModule],
    template: `
      <z-alert>
        <div zAlertSection>SECTION_A</div>
        <div zAlertSection>SECTION_B <a href="#" zAlertLink>LINK_B</a></div>
      </z-alert>
    `,
  })
  class SpecHost {}

  let fixture: ComponentFixture<SpecHost>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(SpecHost);
    compiled = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should render content', async () => {
    const contentEl = compiled.querySelector('.z-alert__content');
    expect(contentEl?.textContent).toContain('SECTION_A');
  });

  it('should render sections', async () => {
    const sectionEls = compiled.querySelectorAll('.z-alert__section');
    expect(sectionEls.length).toBe(2);
    expect(sectionEls.item(0).textContent).toContain('SECTION_A');
    expect(sectionEls.item(1).textContent).toContain('SECTION_B');
  });

  it('should render link', async () => {
    const linkEl = compiled.querySelector('.z-alert__link');
    expect(linkEl?.textContent).toContain('LINK_B');
  });
});

describe('ZAlert', () => {
  let fixture: ComponentFixture<ZAlert>;
  let compiled: HTMLElement;

  let type: WritableSignal<ZAlertType>;
  let icon: WritableSignal<string | undefined>;
  let heading: WritableSignal<string | undefined>;
  let nonClosable: WritableSignal<boolean | string>; // Allow `string` to test `booleanAttribute` transform.
  let visible: WritableSignal<boolean>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    type = signal('light');
    icon = signal(undefined);
    heading = signal(undefined);
    nonClosable = signal(false);
    visible = signal(true);

    fixture = TestBed.createComponent(ZAlert, {
      bindings: [
        inputBinding('type', type),
        inputBinding('icon', icon),
        inputBinding('heading', heading),
        inputBinding('nonClosable', nonClosable),
        twoWayBinding('visible', visible),
      ],
    });
    compiled = fixture.nativeElement;
    await fixture.whenStable();
  });

  describe('Component initialization', () => {
    it('should use input default values when created without bindings', async () => {
      // Create a new component without inputBinding to test default values
      const _fixture = TestBed.createComponent(ZAlert);
      const _compiled: HTMLElement = _fixture.nativeElement;
      await _fixture.whenStable();

      expect(_compiled.classList.contains('z-alert')).toBe(true);
      expect(_compiled.classList.contains('z-alert--light')).toBe(true);
      expect(_compiled.classList.contains('z-alert--hidden')).toBe(false);
      expect(_compiled.querySelector('.z-alert__close')).toBeTruthy();
    });
  });

  describe('Type input', () => {
    it('should render with type class', async () => {
      const alertTypes: ZAlertType[] = ['info', 'success', 'danger', 'light'];

      for (const alertType of alertTypes) {
        type.set(alertType);
        await fixture.whenStable();

        expect(compiled.classList.contains(`z-alert--${alertType}`)).toBe(true);
      }
    });

    it('should render default icon for each type', async () => {
      let iconEl: Element | null;

      type.set('info');
      await fixture.whenStable();
      iconEl = compiled.querySelector('.z-alert__icon');
      expect(iconEl?.textContent).toContain('info');

      type.set('success');
      await fixture.whenStable();
      iconEl = compiled.querySelector('.z-alert__icon');
      expect(iconEl?.textContent).toContain('check_circle');

      type.set('danger');
      await fixture.whenStable();
      iconEl = compiled.querySelector('.z-alert__icon');
      expect(iconEl?.textContent).toContain('warning');

      type.set('light');
      await fixture.whenStable();
      iconEl = compiled.querySelector('.z-alert__icon');
      expect(iconEl).toBeNull();
    });
  });

  describe('Icon input', () => {
    it('should render custom icon for light type', async () => {
      icon.set('star');
      await fixture.whenStable();

      const iconEl = compiled.querySelector('.z-alert__icon');
      expect(iconEl?.textContent).toContain('star');
    });

    it('should override default icon with custom icon', async () => {
      type.set('info');
      icon.set('star');
      await fixture.whenStable();

      const iconEl = compiled.querySelector('.z-alert__icon');
      expect(iconEl?.textContent).toContain('star');
    });

    it('should not use default icon when using empty string icon explicitly', async () => {
      type.set('info');
      icon.set(''); // Explicitly set to empty string (not nullish!)
      await fixture.whenStable();

      const iconEl = compiled.querySelector('.z-alert__icon');
      expect(iconEl).toBeNull();
    });

    it('should add with-icon class to container when icon present', async () => {
      const container = compiled.querySelector('.z-alert__container');
      expect(container?.classList.contains('z-alert__container--with-icon')).toBe(false);

      icon.set('star');
      await fixture.whenStable();

      expect(container?.classList.contains('z-alert__container--with-icon')).toBe(true);
    });
  });

  describe('Heading input', () => {
    it('should not render heading when not provided', () => {
      const headingEl = compiled.querySelector('.z-alert__heading');
      expect(headingEl).toBeNull();
    });

    it('should render heading when provided', async () => {
      heading.set('Test Heading');
      await fixture.whenStable();

      const headingEl = compiled.querySelector('.z-alert__heading');
      expect(headingEl?.textContent?.trim()).toBe('Test Heading');
    });
  });

  describe('NonClosable input', () => {
    it('should render close button when closable', () => {
      const closeBtn = compiled.querySelector('.z-alert__close');
      expect(closeBtn).toBeTruthy();
    });

    it('should not render close button when not closable', async () => {
      nonClosable.set(true);
      await fixture.whenStable();

      const closeBtn = compiled.querySelector('.z-alert__close');
      expect(closeBtn).toBeNull();
    });

    it('should add closable class to container when closable', () => {
      const container = compiled.querySelector('.z-alert__container');
      expect(container?.classList.contains('z-alert__container--closable')).toBe(true);
    });

    it('should not add closable class when not closable', async () => {
      nonClosable.set(true);
      await fixture.whenStable();

      const container = compiled.querySelector('.z-alert__container');
      expect(container?.classList.contains('z-alert__container--closable')).toBe(false);
    });

    it('should handle booleanAttribute transform with empty string', async () => {
      nonClosable.set(''); // Empty string should be treated as true by booleanAttribute
      await fixture.whenStable();

      expect(compiled.querySelector('.z-alert__close')).toBeNull();
    });
  });

  describe('Visible model', () => {
    it('should add hidden class when not visible', async () => {
      expect(compiled.classList.contains('z-alert--hidden')).toBe(false);

      visible.set(false);
      await fixture.whenStable();

      expect(compiled.classList.contains('z-alert--hidden')).toBe(true);
    });
  });

  describe('Close button interactions', () => {
    it('should hide alert when close button is clicked', async () => {
      expect(compiled.classList.contains('z-alert--hidden')).toBe(false);

      const closeBtn = compiled.querySelector('.z-alert__close') as HTMLButtonElement | null;
      closeBtn?.click();
      await fixture.whenStable();

      expect(compiled.classList.contains('z-alert--hidden')).toBe(true);
    });

    it('should set visible model to false on close', () => {
      expect(visible()).toBe(true);

      const closeBtn = compiled.querySelector('.z-alert__close') as HTMLButtonElement | null;
      closeBtn?.click();

      expect(visible()).toBe(false);
    });

    it('should have button type attribute', () => {
      const closeBtn = compiled.querySelector('.z-alert__close') as HTMLButtonElement | null;
      expect(closeBtn?.type).toBe('button');
    });
  });

  describe('Accessibility', () => {
    it('should use intl.Close for aria-label', () => {
      const closeBtn = compiled.querySelector('.z-alert__close') as HTMLButtonElement | null;
      const ariaLabel = closeBtn?.getAttribute('aria-label');
      const intl = TestBed.inject(ZAlertIntl);

      expect(ariaLabel).toBe(intl.Close);
    });
  });
});
