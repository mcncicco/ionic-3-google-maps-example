import { Component, NgZone } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SigninPage } from '../signin/signin';
import { AngularFireAuth } from 'angularfire2/auth';
import { CityProvider } from '../../providers/city/city';
import { CityPage } from '../city/city';
import { MapsProvider } from '../../providers/maps/maps';
import { MapsPage } from '../maps/maps';
import { TabsPage } from '../tabs/tabs';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  displayName: string;
  photoURL: string;
  email: string;

  public refresher;
  public isRefreshing: boolean = false;

  public listCities = new Array<any>();

  constructor(public navCtrl: NavController,
    private authServiceProvider: AuthServiceProvider,
    private afAhth: AngularFireAuth,
    private cityProvider: CityProvider,
    private app: App,
    private mapsProvider: MapsProvider

  ) {
    

  }
  joinChat(key:string){
    this.navCtrl.push(ChatPage, {key});
  }

  verNoMapa(nomeCidade:string) {
    this.navCtrl.push(MapsPage, {nomeCidade});
  }

  openDetails(nomeCidade: string) {
    console.log('home' + nomeCidade);
    this.navCtrl.push(CityPage, { nomeCidade });
  }

  getCities() {

    this.cityProvider.getAllCities().subscribe(
      data => {
//        console.log(data);
        this.listCities = data;
        /*const response = (data as any);
        console.log(response);
        const objeto_retorno = JSON.parse(response._body);
        console.log(objeto_retorno);
        this.listCities = objeto_retorno;*/
      });
  }

  signOut() {
    this.authServiceProvider.signOut().then(() => {
      this.app.getRootNav().setRoot(SigninPage);

    })
      .catch((error) => {
        console.error(error);
        this.navCtrl.setRoot(SigninPage);
      });
    this.navCtrl.setRoot(SigninPage);
  }

  doRefresh(refresher) {
    this.isRefreshing = refresher;
    this.isRefreshing = true;
    console.log('Begin async operation', refresher);


    if (this.isRefreshing) {
      refresher.complete();
      this.isRefreshing = false;
    }

  }

  ionViewDidEnter() {
    this.getCities();
    console.log("HomePage");
  }




  public horaRecife = null;
  getHour(nomeCidade: string) {
    console.log("GETHOUR");
    //console.log(this.horaRecife); 
    if (this.horaRecife == null) {
      /*console.log("if");
      this.cityProvider.getHour().subscribe(
        data => {
          console.log(data);
          const response = (data as any);
          console.log(response.formatted.string);
          console.log(JSON.stringify(response));
          console.log(JSON.stringify(response.formatted).split(" ")[1]);
          this.horaRecife = JSON.stringify(response.formatted).split(" ")[1];
          
        }, error => {
          console.log(error);
        }
      )*/

    }
    return this.horaRecife;
  }


}