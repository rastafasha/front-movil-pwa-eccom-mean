import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import {ApiRestService} from './services/apirest.service';
import { DbPwaService } from './services/db-pwa.service';
import { ConnectionService } from 'ngx-connection-service';
import { CongeneralService } from './services/congeneral.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecomerceAppMovil';
  //notificaciones
  vapidKey = environment.notificacionApiPublickey;
  public readonly VAPID_PUBLIC_KEY = this.vapidKey;

  //cache offline
  list: Array<any> = [];
  hasNetworkConnection: boolean;
  hasInternectAccess: boolean;
  status: boolean;


  constructor(
    private swPush: SwPush,
    private apiRes: ApiRestService,
    private dbPwaService: DbPwaService,
    private configuracionService: CongeneralService
    ){
      this.subscribeToNotifications();
    }

    subscribeToNotifications():any{
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      }).then(sub=>{
        const token = JSON.parse(JSON.stringify(sub));
        console.log('ojo', token);

        this.apiRes.saveToken(token).subscribe((res)=>{
          console.log(res);
        }, Error =>{
          console.log('error', Error);
        });

      }).catch(err => console.error("Could not subscribe to notifications", err));
    }


}
