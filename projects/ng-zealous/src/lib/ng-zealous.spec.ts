import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgZealous } from './ng-zealous';

describe('NgZealous', () => {
  let component: NgZealous;
  let fixture: ComponentFixture<NgZealous>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgZealous]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgZealous);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
