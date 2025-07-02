import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockTimeUnitComponent } from './clock-time-unit.component';

describe('ClockTimeUnitComponent', () => {
  let component: ClockTimeUnitComponent;
  let fixture: ComponentFixture<ClockTimeUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockTimeUnitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClockTimeUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
