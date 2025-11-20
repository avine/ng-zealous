import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZButtonGroup } from './button-group';

describe('ZButtonGroup', () => {
  @Component({
    selector: 'z-spec-host',
    imports: [ZButtonGroup],
    template: `
      <div zButtonGroup>
        <button>Button 1</button>
        <button>Button 2</button>
      </div>

      <div zButtonGroup vertical>
        <button>Button 1</button>
        <button>Button 2</button>
      </div>

      <div zButtonGroup [vertical]="vertical()">
        <button>Button 1</button>
        <button>Button 2</button>
      </div>
    `,
  })
  class SpecHost {
    vertical = signal(false);
  }

  let fixture: ComponentFixture<SpecHost>;
  let specHost: SpecHost;
  let buttonGroupHorizontal: HTMLElement;
  let buttonGroupVertical: HTMLElement;
  let buttonGroupDynamic: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(SpecHost);
    specHost = fixture.componentInstance;

    const all = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '[zButtonGroup]',
    );
    buttonGroupHorizontal = all.item(0);
    buttonGroupVertical = all.item(1);
    buttonGroupDynamic = all.item(2);

    await fixture.whenStable();
  });

  describe('Component initialization', () => {
    it('should apply directive to element', () => {
      [buttonGroupHorizontal, buttonGroupVertical, buttonGroupDynamic].forEach((buttonGroup) => {
        expect(buttonGroup).toBeTruthy();
        expect(buttonGroup.classList.contains('z-button-group')).toBe(true);
      });
    });

    it('should apply horizontal class by default', () => {
      expect(buttonGroupHorizontal.classList.contains('z-button-group--horizontal')).toBe(true);
      expect(buttonGroupHorizontal.classList.contains('z-button-group--vertical')).toBe(false);
    });
  });

  describe('Vertical input', () => {
    it('should handle booleanAttribute transform with empty string attribute', () => {
      // The 'vertical' attribute with no value is treated as true by booleanAttribute
      expect(buttonGroupVertical.classList.contains('z-button-group--horizontal')).toBe(false);
      expect(buttonGroupVertical.classList.contains('z-button-group--vertical')).toBe(true);
    });

    it('should apply horizontal class when vertical input is false', () => {
      expect(buttonGroupDynamic.classList.contains('z-button-group--horizontal')).toBe(true);
      expect(buttonGroupDynamic.classList.contains('z-button-group--vertical')).toBe(false);
    });

    it('should apply vertical class when vertical input is true', async () => {
      specHost.vertical.set(true);
      await fixture.whenStable();

      expect(buttonGroupDynamic.classList.contains('z-button-group--horizontal')).toBe(false);
      expect(buttonGroupDynamic.classList.contains('z-button-group--vertical')).toBe(true);
    });
  });
});
