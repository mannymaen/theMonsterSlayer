new Vue({
  el:'#app',
  data:{
  	playerName: ' ',
  	playerLife: 100,
  	monsterLife: 100,
  	playerLifeProgressBar:{
  		width: '100%'
  	},
  	monsterLifeProgressBar:{
  		width: '100%'
  	},
  	attackLogs: [],
  	isGameStarted: false
  },
  methods:{
  	startGame: function () {
  		this.isGameStarted = true;
  	},
  	affectLife: function (type) {
  		if (type === 'normal') {
  			this.attack(20)
  		}else if (type === 'special') {
  			this.attack(30)
  		}else if (type === 'heal'){
  			let monsterAttack = Math.ceil((Math.random() * 3));
  			let playerRecover = Math.ceil((Math.random() * 10));
  			this.playerLife -= monsterAttack;
  			this.playerLife += playerRecover;
  			this.playerLifeProgressBar = {width: this.playerLife+'%'};
  		}
  	},
  	updateAttacksLog: function (playersHit, monstersHit) {
  		this.attackLogs.push('Monster hits you for '+monstersHit);
  		this.attackLogs.push(this.playerName+' hits monster for '+playersHit);
  	},
  	attack: function (damageLimit) {
  		let monsterAttack = Math.ceil((Math.random() * damageLimit));
			let playerAttack = Math.ceil((Math.random() * damageLimit));
			this.setLifeAndLifeProgressBar(playerAttack, monsterAttack);
			this.updateAttacksLog(playerAttack, monsterAttack);
			this.checkWinner();
  	},
  	checkWinner: function () {
  		if (this.monsterLife <= 0 && this.playerLife <= 0) {
  			alert('It\'s a draw 😱');
  			this.endGame();
  		}else if (this.monsterLife <= 0) {
  			alert(this.playerName+' Won! 🥳 Te amo!');
  			this.endGame();
  		}else if(this.playerLife <= 0){
  			alert('Monster Won 😭');
  			this.endGame();
  		}
  	},
  	endGame: function () {
  		this.isGameStarted = false;
  		this.setLifeAndLifeProgressBar(100, 100);
  		this.attackLogs = [];
  	},
  	setLifeAndLifeProgressBar: function (playerAttack, monsterAttack) {
  		if (playerAttack === 100 && monsterAttack === 100) {
  			this.monsterLife = playerAttack;
				this.playerLife = monsterAttack;
				this.monsterLifeProgressBar = {width: this.monsterLife+'%'};
				this.playerLifeProgressBar = {width: this.playerLife+'%'};	
  		}else{
  			this.monsterLife -= playerAttack;
				this.playerLife -= monsterAttack;
				this.monsterLifeProgressBar = {width: this.monsterLife+'%'};
				this.playerLifeProgressBar = {width: this.playerLife+'%'};
  		}
  	}
  }
});






















