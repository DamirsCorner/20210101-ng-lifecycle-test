import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleService } from '../sample.service';

import { SampleComponent } from './sample.component';

describe('SampleComponent', () => {
  let component: SampleComponent;
  let fixture: ComponentFixture<SampleComponent>;

  let sampleServiceMock: jasmine.SpyObj<SampleService>;

  beforeEach(async () => {
    sampleServiceMock = jasmine.createSpyObj<SampleService>('SampleService', [
      'sampleMethod',
    ]);

    await TestBed.configureTestingModule({
      declarations: [SampleComponent],
      providers: [{ provide: SampleService, useValue: sampleServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sample method calls', () => {
    it('should include one from implicit ngAfterViewInit invocation', () => {
      component.ngAfterViewInit();

      expect(sampleServiceMock.sampleMethod).toHaveBeenCalledTimes(2);
    });

    it('should include one even without explicit ngAfterViewInit call', () => {
      expect(sampleServiceMock.sampleMethod).toHaveBeenCalledTimes(1);
    });

    it('should include args from implicit ngAfterViewInit invocation', () => {
      component.sampleValue = true;
      component.ngAfterViewInit();

      expect(sampleServiceMock.sampleMethod).toHaveBeenCalledWith(false);
    });

    it('should include args from explicit ngAfterViewInit call', () => {
      component.sampleValue = true;
      component.ngAfterViewInit();

      expect(sampleServiceMock.sampleMethod).toHaveBeenCalledWith(true);
    });

    it('most recent should not include args from implicit ngAfterViewInit invocation', () => {
      component.sampleValue = true;
      component.ngAfterViewInit();

      expect(
        sampleServiceMock.sampleMethod.calls.mostRecent().args
      ).not.toEqual([false]);
    });

    it('most recent should include args from explicit ngAfterViewInit call', () => {
      component.sampleValue = true;
      component.ngAfterViewInit();

      expect(sampleServiceMock.sampleMethod.calls.mostRecent().args).toEqual([
        true,
      ]);
    });

    it('should only include one from explicit ngAfterViewInit call after reset', () => {
      sampleServiceMock.sampleMethod.calls.reset();

      component.ngAfterViewInit();

      expect(sampleServiceMock.sampleMethod).toHaveBeenCalledTimes(1);
    });

    it('should only include args from explicit ngAfterViewInit call after reset', () => {
      sampleServiceMock.sampleMethod.calls.reset();

      component.sampleValue = true;
      component.ngAfterViewInit();

      expect(sampleServiceMock.sampleMethod).toHaveBeenCalledOnceWith(true);
    });
  });
});
