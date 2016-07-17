import { Component, Input, EventEmitter, Output } from '@angular/core';
/*
 Generated class for the ButtonMenu directive.

 See https://angular.io/docs/ts/latest/api/core/DirectiveMetadata-class.html
 for more info on Angular 2 Directives.
 */
@Component({
  selector: 'header-content', // Attribute selector
  templateUrl: 'build/components/header-content/header-content.html',
})
export class HeaderContent {

  @Input() title: string;
  @Input() backEnabled: Boolean;
  showBack:Boolean;

  @Output() onBack: EventEmitter<any> = new EventEmitter();

  constructor() {
  }
  
  ngOnInit() {
    this.showBack = this.backEnabled;
  }

  onClickBack(){
    this.onBack.emit({})
  }
}
