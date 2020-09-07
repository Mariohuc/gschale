import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupVoluntaryComponent } from './signup-voluntary.component';

describe('SignupVoluntaryComponent', () => {
  let component: SignupVoluntaryComponent;
  let fixture: ComponentFixture<SignupVoluntaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupVoluntaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupVoluntaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
