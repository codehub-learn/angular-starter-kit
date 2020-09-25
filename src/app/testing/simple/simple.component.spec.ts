import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleService } from '../simple.service';

import { SimpleComponent } from './simple.component';

fdescribe('SimpleComponent', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleComponent ],
      imports: [HttpClientTestingModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title', () => {
    const titleDisplay: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(titleDisplay.textContent).toEqual('Simple component works');
  });

  it('should set the title (cross-platform)', () => {
    const titleDe: DebugElement = fixture.debugElement.query(By.css('p'));
    expect(titleDe.nativeElement.textContent).toEqual('Simple component works');
  });

  describe('loggedIn', () => {
    let loggedInDisplay: HTMLElement;
    let simpleService: SimpleService;

    beforeEach(() => {
      loggedInDisplay = fixture.nativeElement.querySelector('span');
      simpleService = TestBed.inject(SimpleService);
    });

    it('should display `logged in`', () => {
      simpleService.isLoggedIn = true;
      component.ngOnInit();
      fixture.detectChanges();
      expect(loggedInDisplay.textContent).toContain('logged in');
    });

    it('should display not `logged in`', () => {
      simpleService.isLoggedIn = false;
      component.ngOnInit();
      fixture.detectChanges();
      expect(loggedInDisplay.textContent).toContain('not logged in');
    });
  });
});

fdescribe('SimpleComponent with mock', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;
  const mockSimpleService: Partial<SimpleService> = {
    isLoggedIn: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleComponent ],
      providers: [
        { provide: SimpleService, useValue: mockSimpleService }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display `logged in`', () => {
    const loggedInDisplay: HTMLElement = fixture.nativeElement.querySelector('span');
    const service = TestBed.inject(SimpleService);
    service.isLoggedIn = false;
    component.ngOnInit();
    fixture.detectChanges();
    expect(loggedInDisplay.textContent).toContain('logged in');
  });
});

fdescribe('SimpleComponent with spy', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;
  let simpleServiceSpy: jasmine.SpyObj<SimpleService>;

  beforeEach(async () => {
    simpleServiceSpy = jasmine.createSpyObj('SimpleService', ['doSomething']);

    await TestBed.configureTestingModule({
      declarations: [ SimpleComponent ],
      providers: [
        { provide: SimpleService, useValue: simpleServiceSpy }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call doSomething', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();
    expect(simpleServiceSpy.doSomething.calls.any()).toBeTrue();
  });
});
