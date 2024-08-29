import { AfterViewInit, Component } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import Step from 'shepherd.js/src/types/step';
import { getSteps as defaultSteps, requiredElements, defaultStepOptions} from './utils/shepherd-service.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements AfterViewInit{
  constructor(private shepherdService: ShepherdService, public router: Router) { }

  ngAfterViewInit() {
    this.shepherdService.defaultStepOptions = defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.requiredElements = requiredElements;
    const steps = defaultSteps(this.shepherdService);
    this.shepherdService.addSteps(steps as Array<Step.StepOptions>);
    // this.shepherdService.addSteps(defaultSteps);
    
   
  }
  
}
