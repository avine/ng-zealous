import { inputBinding, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZAvatar } from './avatar';

describe('ZAvatar', () => {
  let fixture: ComponentFixture<ZAvatar>;
  let compiled: HTMLElement;

  let photoUrl: WritableSignal<string | undefined>;
  let name: WritableSignal<string | undefined>;
  let icon: WritableSignal<string>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZAvatar],
    }).compileComponents();

    photoUrl = signal(undefined);
    name = signal(undefined);
    icon = signal('person');

    fixture = TestBed.createComponent(ZAvatar, {
      bindings: [
        inputBinding('photoUrl', photoUrl),
        inputBinding('name', name),
        inputBinding('icon', icon),
      ],
    });
    compiled = fixture.nativeElement;
    await fixture.whenStable();
  });

  describe('Component initialization', () => {
    it('should use input default values when created without bindings', async () => {
      // Create a new component without inputBinding to test default values
      const _fixture = TestBed.createComponent(ZAvatar);
      const _compiled: HTMLElement = _fixture.nativeElement;
      await _fixture.whenStable();

      expect(_compiled.classList.contains('z-avatar')).toBe(true);
      expect(_compiled.style.backgroundImage).toBe('');
      expect(_compiled.querySelector('.z-avatar__initials')).toBeNull();
      expect(_compiled.querySelector('.z-avatar__icon')?.textContent).toContain('person');
    });
  });

  describe('PhotoUrl input', () => {
    it('should not render initials or icon when photoUrl is provided', async () => {
      photoUrl.set('https://example.com/avatar.jpg');
      name.set('John Doe');
      icon.set('face');
      await fixture.whenStable();

      expect(compiled.querySelector('.z-avatar__initials')).toBeNull();
      expect(compiled.querySelector('.z-avatar__icon')).toBeNull();
    });

    it('should set background-image style when photoUrl is provided', async () => {
      photoUrl.set('https://example.com/avatar.jpg');
      await fixture.whenStable();

      const bgImage = compiled.style.backgroundImage;
      expect(bgImage).toBe('url("https://example.com/avatar.jpg")');
    });
  });

  describe('Name input', () => {
    it('should not render icon when name is provided', async () => {
      name.set('John Doe');
      icon.set('face');
      await fixture.whenStable();

      expect(compiled.querySelector('.z-avatar__icon')).toBeNull();
    });

    it('should display initials when name is provided without photoUrl', async () => {
      name.set('John Doe');
      await fixture.whenStable();

      const initialsEl = compiled.querySelector('.z-avatar__initials');
      expect(initialsEl?.textContent).toContain('JD');
    });

    it('should transform name to uppercase initials', async () => {
      name.set('jane smith');
      await fixture.whenStable();

      const initialsEl = compiled.querySelector('.z-avatar__initials');
      expect(initialsEl?.textContent).toContain('JS');
    });

    it('should handle single word names', async () => {
      name.set('Alice');
      await fixture.whenStable();

      const initialsEl = compiled.querySelector('.z-avatar__initials');
      expect(initialsEl?.textContent).toContain('A');
    });

    it('should handle names with more than two words', async () => {
      name.set('John Michael Doe');
      await fixture.whenStable();

      const initialsEl = compiled.querySelector('.z-avatar__initials');
      expect(initialsEl?.textContent).toContain('JM');
    });

    it('should handle names with extra whitespace', async () => {
      name.set('  John   Doe  ');
      await fixture.whenStable();

      const initialsEl = compiled.querySelector('.z-avatar__initials');
      expect(initialsEl?.textContent).toContain('JD');
    });
  });

  describe('Icon input', () => {
    it('should display default icon when neither photoUrl nor name is provided', async () => {
      const iconEl = compiled.querySelector('.z-avatar__icon');
      expect(iconEl?.textContent).toContain('person');
    });

    it('should display custom icon', async () => {
      icon.set('face');
      await fixture.whenStable();

      const iconEl = compiled.querySelector('.z-avatar__icon');
      expect(iconEl?.textContent).toContain('face');
    });
  });
});
