var app1 = angular.module('eplApp',['ngRoute']);



// First Controller
app1.controller('engPreLea2',['$http',function($http){
  console.log("dad");
  var main = this;  
  this.datas = [];
  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master';

  this.eplData = function(date,tName){
    $http({
      method: 'GET',
      url: main.baseUrl+'/2016-17/en.1.json'
    }).then(function successCallback(response){
console.log("dafdsfdsfd");
          main.datas = response.data.rounds;
          console.log(main.datas);

          // Passing date and teamCode as a routing path
          for(i in response.data.rounds){
            for(j in response.data.rounds[i].matches){
              main.date = response.data.rounds[i].matches[j];
              main.tCode = response.data.rounds[i].matches[j].team1.code;
              main.tCode2 = response.data.rounds[i].matches[j].team2.code;
            }
          }

      }, function errorCallback(response){
      alert("Not Found");
    })//End of http
  };//End of eplData

}]); //End of controller


app1.controller('matchDetails',['$http','$routeParams',function($http,$routeParams){

var main = this;
this.datas = [];

this.date = $routeParams.date;
console.log(this.date);
this.y = $routeParams.matchDetails;
console.log(this.y);
this.t1Code = $routeParams.tCode;
//console.log(this.t1Code);

this.t2Code = $routeParams.tCode2;
//console.log(this.t2Code);

this.t1;  //team 1 
this.t2;  //team 2
this.s1;  //score 1
this.s2;  //score 2
this.winner;

this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master';

this.winTeam = function(){
  $http({
    method:'GET',
    url: main.baseUrl+'/2016-17/en.1.json'
    //console.log(response);
  }).then(function successCallback(response){
    console.log("hello");
    console.log(response.data);
    main.datas = response.data.rounds;
    console.log(main.datas);

    // for showing individual match information
    for(var i in main.datas){
      //console.log(i);
      for(var j in main.datas[i].matches){

        if(main.datas[i].matches[j].team1.code == main.t1Code && main.datas[i].matches[j].team2.code == main.t2Code && main.datas[i].matches[j].date == main.date){
          main.s1 = main.datas[i].matches[j].score1;
          //console.log(main.s1);
          main.s2 = main.datas[i].matches[j].score2;
          //console.log(main.s1);
          main.t1 = main.datas[i].matches[j].team1.name;
          main.t2 = main.datas[i].matches[j].team2.name;
          
          if(main.s1 < main.s2){
            main.winner = main.t2+" Won";
          }
          else if(main.s2 < main.s1){
            main.winner = main.t1+" Won";
          }
          else{
            main.winner = "Match Drawn";
          }
        }
        else{
          console.log("Please Enter Correct Input");
        }
      }
    }
  },function errorCallback(response){
      console.log("Not Found");
  })
};
}]);




app1.controller('leagueSummary',['$http','$routeParams',function($http,$routeParams){

var main = this;
//this.datas = [];

//this.date = $routeParams.date;
//console.log(this.date);

this.t1code ;

console.log("wdadas");
//console.log(this.t1Code);

//this.t2Code = $routeParams.tCode2;
//console.log(this.t2Code);

this.t1;  //team 1 
this.t2;  //team 2
this.s1;  //score 1
this.s2;  //score 2
this.wins = 0;
this.draws =0;
this.losses = 0 ;
this.totalMatches = 0;
this.goalScored = 0;

this.goalsConceded = 0;
//console.log(this.losses);
this.teamNames = [];
this.jsonArr = {
  teamss:[]
};
this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master';

this.statistics = function(){
  $http({
    method:'GET',
    url: main.baseUrl+'/2016-17/en.1.json'

  }).then(function successCallback(response){
    main.datas = response.data.rounds;
    console.log(main.datas);
    //console.log(main.losses);
    var k = 0;
    // fetching Team names
    for (var i in main.datas[0].matches){
      
     //console.log("hello");
      //console.log(main.datas[0].matches[i].team1.name);
      main.teamNames[k] = main.datas[0].matches[i].team1.name;
      k=k+1;
      main.teamNames[k] = main.datas[0].matches[i].team2.name;
      k=k+1;
    }

    //console.log(main.teamNames);

    for(var i in main.teamNames){

      main.wins = 0;
      main.losses=0;
      main.draws = 0;
      main.goalScored = 0 ;
      main.goalsConceded = 0 ;
      main.totalMatches = 0;

      for(var j in main.datas){

        for(var k in main.datas[j].matches){

          if(main.teamNames[i] == main.datas[j].matches[k].team1.name || main.teamNames[i] == main.datas[j].matches[k].team2.name){
             //console.log("hhhlhdsdfsf");
            if(main.datas[j].matches[k].team1.name == main.teamNames[i]){
              main.s1 = main.datas[j].matches[k].score1;
              main.goalScored = main.goalScored+ main.s1;
              main.t1code = main.datas[j].matches[k].team1.code;
              //console.log(main.s1);
              main.s2 = main.datas[j].matches[k].score2;
              //console.log(main.s1);
              main.goalsConceded = main.goalsConceded + main.s2;
              main.t1 = main.datas[j].matches[k].team1.name;
              main.t2 = main.datas[j].matches[k].team2.name; 
            }
            else if(main.datas[j].matches[k].team2.name == main.teamNames[i]){
              main.t1code = main.datas[j].matches[k].team2.code;
              main.s1 = main.datas[j].matches[k].score2;
              //console.log(main.s1);
              main.goalScored = main.goalScored+ main.s1;
              main.s2 = main.datas[j].matches[k].score1;
              //console.log(main.s1);
              main.goalsConceded = main.goalsConceded + main.s2;
              main.t1 = main.datas[j].matches[k].team2.name;
              main.t2 = main.datas[j].matches[k].team1.name;
              
            }

            if(main.s1 < main.s2){
              main.losses = main.losses +1;
             }
            else if(main.s2 < main.s1){
              main.wins = main.wins+1;
            }
            else if(main.s2 == main.s1){
              main.draws = main.draws+1;
            }
          }
        }

      }
      //console.log("ddD");
      main.totalMatches = main.wins + main.losses + main.draws;
      //console.log(main.teamNames[i]);
      main.jsonArr.teamss.push({
        "team":main.teamNames[i],
        "totalMatches":main.totalMatches,
        "losses": main.losses,
        "wins" : main.wins,
        "draws": main.draws,
        "goalScored" : main.goalScored,
        "goalsConceded" : main.goalsConceded,
        "t1code":main.t1code
      });
    }
  },function errorCallback(response){
      console.log("Not Found");
  })
  console.log(this.jsonArr);
  //console.log(this.jsonArr.teamss[0].t1code)
};
}]);




app1.controller('teamSpecific',['$http','$routeParams',function($http,$routeParams){

var main = this;

this.t1Code = $routeParams.tCode;

this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master';
this.jsonArr = {
  teamss:[]
};
this.teamDetails = function(){
  $http({
    method:'GET',
    url: main.baseUrl+'/2016-17/en.1.json'

  }).then(function successCallback(response){
    main.datas = response.data.rounds;
    console.log(main.datas);
    //console.log(main.losses);
    var k = 0;
    // fetching Team names
      for(i in response.data.rounds){
        for(j in response.data.rounds[i].matches){

          if(main.t1Code == main.datas[i].matches[j].team1.code || main.t1Code == main.datas[i].matches[j].team2.code){
            main.date = response.data.rounds[i].matches[j];
            main.tCode = response.data.rounds[i].matches[j].team1.code;
            main.tCode2 = response.data.rounds[i].matches[j].team2.code;
            main.jsonArr.teamss.push({
              "t1team":response.data.rounds[i].matches[j].team1.name,
              "t1code":response.data.rounds[i].matches[j].team1.code,
              "date":response.data.rounds[i].matches[j].date,
              "t2team":response.data.rounds[i].matches[j].team2.name,
              "t2code":response.data.rounds[i].matches[j].team2.code,
              "name":response.data.rounds[i].name,

          });

          }
        }
   }
  },function errorCallback(response){
      console.log("Not Found");
  })
  console.log("dsad");
  console.log(this.jsonArr);
};
}]);