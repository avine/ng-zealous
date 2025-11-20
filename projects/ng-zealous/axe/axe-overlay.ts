import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { ZAxeContainer } from './axe-container';

@Injectable({
  providedIn: 'root',
})
export class ZAxeOverlay {
  private readonly overlay = inject(Overlay);

  private overlayRef?: OverlayRef;

  attach() {
    if (this.overlayRef) {
      return;
    }
    this.overlayRef = this.overlay.create({ panelClass: 'z-axe-overlay' });
    this.overlayRef.attach(new ComponentPortal(ZAxeContainer));
  }

  dispose() {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }
}
