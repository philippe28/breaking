import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {


  episodes:any;
  filterStatus:any;
  filterButtons:any;
  queryParams:any;
 
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {


    this.apiService.getepisodes().
    subscribe(episodes =>{ 
      this.episodes = episodes
      //  this.charactersMap(characters)
      })
 
  }


}
