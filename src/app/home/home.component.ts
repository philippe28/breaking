import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  characters:any;
  filterStatus:any;
  filterButtons:any;
  queryParams:any;
 
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.filterStatus = {
      button:  "",
      search:'',
    }

   this.queryParams = this.route.queryParams
      .subscribe(params => {
        if(params.character){
          this.filterStatus.search = params.character
          this.apiService.getCharactersSearch(params.character).
          subscribe(characters =>{ 
            console.log('entrou')
             this.charactersMap(characters)
            })
        }else{
          this.apiService.getCharacters().
          subscribe(characters =>{ 
       
             this.charactersMap(characters)
            })
        }
        console.log(params); // {order: "popular"}

        return params
      });
    



    this.filterButtons = [
      {
        title:'Vivo',
        statusClassCss:'alive'
      },
      {
        title:'Falecido',
        statusClassCss:'deceased'
      },
      {
        title:'Todos',
        statusClassCss:''
      }
  ]


  //this.characters = this.apiService.getCharacters()


  
    console.log(this.characters)
  }

  filterClick(e){
    console.log(e)


    if(this.characters.length <= 1){
      this.apiService.getCharacters().
      subscribe(async characters =>{ 
   
         await this.charactersMap(characters)

         this.filterStatus = {
          button:  e,
          search:''
        }
        })
    }else{
      this.filterStatus = {
        button:  e,
        search:''
      }
    }


  }

  onSearch(e){
    console.log(e)

    if(this.filterStatus.search == '' || this.characters.lenght <= 1){
      this.apiService.getCharacters().
      subscribe(characters =>{ 
   
         this.charactersMap(characters)
        })
    }else{
      this.filterStatus = {
        button:  '',
        search:e
      }
    }


  }


  charactersMap(characters){

    this.characters = characters.map(item=>{

      switch(item.status){
        case 'Alive':
          item.statusTranslations = 'Vivo';
          item.statusClassCss = 'alive';
          break;
        case 'Deceased':
            item.statusTranslations = 'Falecido';
            item.statusClassCss = 'deceased';
            break;
        default:
            item.statusTranslations = 'Falecido';
            item.statusClassCss = 'deceased'
            break;
      }

      item.occupation = item.occupation.filter(i => i.toLowerCase() != 'unknown' )
      item.birthday = item.birthday.toLowerCase() != 'unknown'?item.birthday:''
        return item

    

  })
  }




}
