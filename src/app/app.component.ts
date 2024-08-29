import { AfterViewInit, Component } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import { steps , requiredElements, defaultStepOptions} from '../app/utils/shepherd-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements AfterViewInit{
  constructor(private shepherdService: ShepherdService) { }

  ngAfterViewInit() {
    this.shepherdService.defaultStepOptions = defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.requiredElements = requiredElements;
    this.shepherdService.addSteps(steps);
    
   
  }
  
}
