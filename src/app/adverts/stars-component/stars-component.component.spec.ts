import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsComponentComponent } from './stars-component.component';

describe('StarsComponentComponent', () => {
  let component: StarsComponentComponent;
  let fixture: ComponentFixture<StarsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
