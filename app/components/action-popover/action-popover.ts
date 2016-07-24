import { Component } from '@angular/core';

/*
  Generated class for the ActionPopover component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'action-popover',
  templateUrl: 'build/components/action-popover/action-popover.html'
})
export class ActionPopover {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }
}
