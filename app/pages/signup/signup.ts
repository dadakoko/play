import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {Auth} from '../../providers/auth/auth';
import {Routes} from '../../providers/routes/routes';
//import jsonApiSerializer = require('jsonapi-serializer');

/*
 Generated class for the SignupPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {

    email:string;
    password:string;
    error:string;
    name:string;

    static get parameters() {
        return [[ViewController], [Auth], [NavController], [Routes]];
    }

    constructor(public viewCtrl:ViewController, private auth:Auth, private nav:NavController, private routes:Routes) {
    }

    signup() {

        var data = {name: this.name, email: this.email, password: this.password};
        // var UserSerializer = new jsonApiSerializer.Serializer('users', {
        //     attributes: ['name', 'email', 'password']
        // });
        //
        // var user = UserSerializer.serialize(data);
        var user = {
            "data": {
                "type": "users",
                "attributes": {
                    "name": this.name,
                    "email": this.email,
                    "password": this.password
                }
            }
        };

        this.auth.signup(user)
            .then((success)=> {

                this.goPage();

            }, (error)=> {
                this.error = error._body;
            })

    }

    goPage() {
        this.nav.push(this.routes.getPage(this.routes.LOGIN));
    }

    close() {
        this.viewCtrl.dismiss();
    }

}
