import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbuttons } from './navbuttons';

describe('Navbuttons', () => {
  let component: Navbuttons;
  let fixture: ComponentFixture<Navbuttons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbuttons],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbuttons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
