import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {


  episodes:any;
  filterStatus:any;
  filterButtons:any;
  queryParams:any;
  profileForm:any;

  toast:string = 'hide';
 
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { 

    this.profileForm = new FormGroup({
      author: new FormControl(''),
      message: new FormControl(''),
    });


  }

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
          subscribe(episodes =>{ 
            console.log('entrou')
            this.episodes = episodes
            //  this.charactersMap(characters)
            })
        }else{
          this.apiService.getepisodes().
          subscribe(episodes =>{ 
            this.episodes = episodes
            //  this.charactersMap(characters)
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


  
    console.log(this.episodes)
  }

  filterClick(e){
    console.log(e)


    if(this.episodes.length <= 1){
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

    if(this.filterStatus.search == '' || this.episodes.lenght <= 1){
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


  charactersMap(episodes){

    this.episodes = episodes.map(item=>{

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

  submitSugestion(){
    
    let formObj = this.profileForm.getRawValue(); // {name: '', description: ''}

    let serializedForm = JSON.stringify(formObj);
    console.log(serializedForm)
  
    this.apiService.postMensagem(serializedForm).
    subscribe(response =>{ 
      this.toast = '';
      
      //  this.charactersMap(characters)
      })

  }


}
