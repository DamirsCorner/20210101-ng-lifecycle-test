import { AfterViewInit, Component, Input } from '@angular/core';
import { SampleService } from '../sample.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
})
export class SampleComponent implements AfterViewInit {
  @Input()
  public sampleValue = false;

  constructor(private sampleService: SampleService) {}

  ngAfterViewInit(): void {
    this.sampleService.sampleMethod(this.sampleValue);
  }
}
