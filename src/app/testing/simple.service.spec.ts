import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SimpleService } from './simple.service';

fdescribe('SimpleService', () => {
  let service: SimpleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SimpleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get something', () => {
    service.getSomething().subscribe();
    const req = httpTestingController.expectOne('http://www.codehub.gr');
    expect(req.request.method).toBe('GET');
    req.flush('');
  });

  it('should post something', () => {
    service.postSomething().subscribe();
    const req = httpTestingController.expectOne('http://www.codehub.gr');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({name: 'Fake text'});
    req.flush('');
  });

  it('should post a value', () => {
    const fakeResponse = {text: 'Fake text'};

    service.postSomething('Hello World').subscribe(result => expect(result).toEqual(fakeResponse));

    const req = httpTestingController.expectOne('http://www.codehub.gr');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual('Hello World');

    req.flush(fakeResponse);
  });
});
