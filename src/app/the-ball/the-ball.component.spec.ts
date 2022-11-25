import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheBallComponent } from './the-ball.component';

describe('TheBallComponent', () => {
  let component: TheBallComponent;
  let fixture: ComponentFixture<TheBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheBallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
