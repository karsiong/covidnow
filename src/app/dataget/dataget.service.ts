import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatagetService {
  socket:string;
  private _storage: Storage | null = null;

  //language package
  public lang_sel:String="EN";

  public lang_tab1:String = 'New';
  public lang_tab2:String = 'State';

  public lang_up:String="Update on";
  public lang_t1:String="Latest Covid Case";
  public lang_t2:String="Test Conducted";
  public lang_t3:String="Deaths Due To Covid";
  public lang_c1:String="New Case";
  public lang_c2:String="Recovery";
  public lang_c3:String="Death";
  public lang_c3_1:String="Total Deaths";
  public lang_c3_2:String="BID";
  public lang_c4:String="Tested";
  public lang_c5:String="Cases";

  public lang_h1:String="State Case";

  public lang_p1:string="Choose Language";
  public lang_p2:string="Cancel";



  constructor(
    public http: HttpClient,
    private storage: Storage,
    public toast:ToastController
  ) {
    this.init();
    this.socket='https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/'
  }

//create simple database
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.preset_lang();
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
    this.lang_tab1 = value;
  }

  public get(key: string):Promise<String> {
    return this._storage?.get(key).then((data)=>{
      return data;
    });
  }

//get last data in string form
  conv_latestdata(data:String){
    let list = data.split("\n");
    let listnn = list[list.length-2].split(",");
    return listnn;
  }

//spliter for each state case
  conv_statecase(data:String){
    let list = data.split("\n").reverse();
    let last16line:any[]=[];
    let eachline:any[][]=[];
    let importcase:number = 0;

    for (let i = 0; i < 16; i++) {
      last16line[i] = list[i+1];
      eachline[i]=last16line[i].split(",");
      importcase += Number(eachline[i][2]);
    }
    eachline.push(
      ["","Import case","",importcase.toString()]
    );
    return eachline;
  }

  conv_dead_statecase(data:String){
    let list = data.split("\n").reverse();
    let last16line:any[]=[];
    let eachline:any[][]=[];

    for (let i = 0; i < 16; i++) {
      last16line[i] = list[i+1];
      eachline[i]=last16line[i].split(",");
    }
    return eachline;
  }

//get total case
  get_totalcase():Promise<String>{
    let url = this.socket+'cases_malaysia.csv';
    let result:String[]=[];

    return this.http.get(url,{responseType:'text'})
    .toPromise()
    .then(rawdata=> rawdata as String
    )
    .catch(e=>{
      this.toast_msg("Error code c1 !!");
      return "error"
    });
  }

  get_deadcase():Promise<String>{
    let url = this.socket+'deaths_malaysia.csv';
    let result:String[]=[];

    return this.http.get(url,{responseType:'text'})
    .toPromise()
    .then(rawdata=> rawdata as String
    )
    .catch(e=>{
      this.toast_msg("Error code d1 !!");
      return "error"
    });
  }

  get_dead_statecase():Promise<String>{
    let url = this.socket+'deaths_state.csv';
    let result:String[]=[];

    return this.http.get(url,{responseType:'text'})
    .toPromise()
    .then(rawdata=> rawdata as String
    )
    .catch(e=>{
      this.toast_msg("Error code s1 !!");
      return "error"
    });
  }

  get_testcon():Promise<String>{
    let url = this.socket+'tests_malaysia.csv';
    let result:String[]=[];

    return this.http.get(url,{responseType:'text'})
    .toPromise()
    .then(rawdata=> rawdata as String
    )
    .catch(e=>{
      this.toast_msg("Error code t1 !!");
      return "error"
    });
  }

  get_statecase():Promise<String>{
    let url = this.socket+'cases_state.csv';
    let result:String[]=[];

    return this.http.get(url,{responseType:'text'})
    .toPromise()
    .then(rawdata=> rawdata as String
    )
    .catch(e=>{
      this.toast_msg("Error code s2 !!");
      return "error"
    });
  }

  change_lang(str_sel:String){
    switch (str_sel) {
      case 'BM':
        this.set('lang','BM');
        this.lang_sel="BM";
        this.lang_tab1 = 'Baharu';
        this.lang_tab2 = 'Negeri';
        this.lang_up="Data setakat";
        this.lang_t1="Kes Covid Baharu";
        this.lang_t2="Ujian Saringan";
        this.lang_t3="Kes Kematian Covid";
        this.lang_c1="Kes Baru";
        this.lang_c2="Sembuh";
        this.lang_c3="Kematian";
        this.lang_c3_1="Jumlah Kematian";
        this.lang_c3_2="BID";
        this.lang_c4="Ujian";
        this.lang_c5="Kes";
        this.lang_h1="Kes Negeri";
        this.lang_p1="Pilih Bahasa";
        this.lang_p2="Batalkan";
        break;
      case 'CH':
        this.set('lang','CH');
        this.lang_sel="CH";
        this.lang_tab1 = '最新';
        this.lang_tab2 = '州屬';
        this.lang_up="更新于";
        this.lang_t1="最新新冠病例";
        this.lang_t2="新冠病毒檢測";
        this.lang_t3="死予新冠病";
        this.lang_c1="新增病例";
        this.lang_c2="恢復";
        this.lang_c3="死亡";
        this.lang_c3_1="總死亡例";
        this.lang_c3_2="院前死亡";
        this.lang_c4="已測試";
        this.lang_c5="病例";
        this.lang_h1="各州屬病例";
        this.lang_p1="选择语言";
        this.lang_p2="取消";
        break;
      default:
        this.set('lang','EN');
        this.lang_sel="EN";
        this.lang_tab1 = 'New';
        this.lang_tab2 = 'State';
        this.lang_up="Update on";
        this.lang_t1="Latest Covid Case";
        this.lang_t2="Test Conducted";
        this.lang_t3="Deaths Due To Covid";
        this.lang_c1="New Case";
        this.lang_c2="Recovery";
        this.lang_c3="Death";
        this.lang_c3_1="Total Deaths";
        this.lang_c3_2="BID";
        this.lang_c4="Tested";
        this.lang_c5="Cases";
        this.lang_h1="State Cases";
        this.lang_p1="Choose Language";
        this.lang_p2="Cancel";
        break;
    }
  }

  preset_lang(){
    this.get("lang").then(res=>{
      if(res == null){
        this.set("lang","EN");
        this.change_lang("EN");
      }else{
        this.get("lang").then(sel=>{
          this.change_lang(sel);
        });
      }
    });
  }

  async toast_msg(msg:string){
    const toast= await this.toast.create({
      message:msg,
      duration: 3000
    });
    toast.present();
  }


}
