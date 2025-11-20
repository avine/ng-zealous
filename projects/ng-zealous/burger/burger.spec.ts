import { signal, twoWayBinding, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZBurger } from './burger';

describe('ZBurger', () => {
  let fixture: ComponentFixture<ZBurger>;
  let compiled: HTMLElement;

  let active: WritableSignal<boolean>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    active = signal(false);

    fixture = TestBed.createComponent(ZBurger, {
      bindings: [twoWayBinding('active', active)],
    });

    compiled = fixture.nativeElement;
    await fixture.whenStable();
  });

  describe('Component initialization', () => {
    it('should use input default values when created without bindings', async () => {
      const _fixture = TestBed.createComponent(ZBurger);
      const _compiled: HTMLElement = _fixture.nativeElement;

      await _fixture.whenStable();

      expect(_compiled.classList.contains('z-burger')).toBe(true);
      expect(_compiled.classList.contains('z-burger--active')).toBe(false);
    });
  });

  describe('Template structure', () => {
    it('should render three burger lines', () => {
      const lines = compiled.querySelectorAll('.z-burger__line');
      expect(lines.length).toBe(3);
    });
  });

  describe('Active state', () => {
    it('should have active class when active', async () => {
      expect(compiled.classList.contains('z-burger--active')).toBe(false);

      active.set(true);
      await fixture.whenStable();

      expect(compiled.classList.contains('z-burger--active')).toBe(true);
    });
  });

  describe('Click interaction', () => {
    it('should toggle to active state when clicked', async () => {
      compiled.click();
      await fixture.whenStable();

      expect(active()).toBe(true);
      expect(compiled.classList.contains('z-burger--active')).toBe(true);
    });

    it('should toggle to inactive state when clicked', async () => {
      active.set(true);
      await fixture.whenStable();

      compiled.click();
      await fixture.whenStable();

      expect(active()).toBe(false);
      expect(compiled.classList.contains('z-burger--active')).toBe(false);
    });
  });

  describe('Keyboard interaction', () => {
    it('should toggle to active state when Enter key is pressed', async () => {
      const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
      compiled.dispatchEvent(enterEvent);
      await fixture.whenStable();

      expect(active()).toBe(true);
      expect(compiled.classList.contains('z-burger--active')).toBe(true);
    });

    it('should toggle to inactive state when Enter key is pressed', async () => {
      active.set(true);
      await fixture.whenStable();

      const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
      compiled.dispatchEvent(enterEvent);
      await fixture.whenStable();

      expect(active()).toBe(false);
      expect(compiled.classList.contains('z-burger--active')).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      expect(compiled.getAttribute('tabIndex')).toBe('0');
    });
  });
});
