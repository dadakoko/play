import { Component, Input, EventEmitter, Output } from '@angular/core';
/*
 Generated class for the ButtonMenu directive.

 See https://angular.io/docs/ts/latest/api/core/DirectiveMetadata-class.html
 for more info on Angular 2 Directives.
 */
@Component({
  selector: 'header-content', // Attribute selector
  templateUrl: 'build/components/header-content/header-content.html',
  styles: [`
    .thumb_title {
    
        height: 40px;
        width: 40px;
        border-radius: 40px;
        vertical-align: middle;
        margin-bottom: 1px;
        overflow: hidden;
    }
  `]
})
export class HeaderContent {

  @Input() title: string;
  @Input() thumbnail: string;
  @Input() backEnabled: Boolean;
  @Input() burgerEnabled: Boolean;
  showBack:Boolean;
  showBurger:Boolean=true;

  @Output() onBack: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.showBack = this.backEnabled;
    this.showBurger = this.burgerEnabled;
  }

  onClickBack(){
    this.onBack.emit({})
  }
}
