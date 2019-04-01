import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
      constructor(public navCtrl: NavController, public http : HttpClient) {
      }
      event: string = 'vote';
      vote: string = '';
      ifVoted : boolean = false;
      voteCount = {
        ngo: 0,
        mwa: 0,
        agi: 0,
        chr: 0,
      };
      playerData = [
        {
          name: 'Ngosa',
          votes: 30,
          shortName: 'ngo'
          //image: 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p118748.png'
        },
        {
          name: 'Mwansa',
          votes: 8,
          shortName: 'mwa'
          //image: 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p80607.png',
        },
        {
          name: 'Agness',
          votes: 26,
          shortName: 'agi'
          //image:'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p78830.png',
        },
        {
          name: "Chris",
          votes: 10,
          shortName: 'chr'
          //image: 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p61366.png',
        },
    ];
      sendVotes(player){
        this.http.post('http://localhost:4000/vote', { player }).subscribe((res : any) => {
          this.vote  = res.player;
          this.ifVoted = true;
        })
      }
      getVoteClasses(player){
        return {
          elect : this.ifVoted && this.vote === player,
          lost : this.ifVoted && this.vote !== player
        }
      }
      ionViewDidLoad(){}
    }
