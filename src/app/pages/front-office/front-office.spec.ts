import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontOffice } from './front-office';

describe('FrontOffice', () => {
  let component: FrontOffice;
  let fixture: ComponentFixture<FrontOffice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontOffice],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontOffice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
