function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
class ManageGame{
//variable par default du jeu 
static myGame = null
currentUser = 0
player = 1
scoreId = 'scorePlayer1'
playerZone ='playerZone1'
playerWinner = 'playerWinner1'
scoreMax = 100


//class principal du jeu 
static getNewGame(){
    if (ManageGame.myGame === null)
    ManageGame.myGame = new ManageGame()
    return ManageGame.myGame
    
}
constructor(){
    this.players=[]
    this.players.push(new Player('Joueur 1'))
    this.players.push(new Player('Joueur 2'))
    this.myDice = new Dice()
}
// remise a zero du jeu 
onNewClick(){
    ManageGame.getNewGame()
    document.getElementById('scorePlayer2').innerText=this.currentPlayer.currentScore =0
    document.getElementById('scorePlayer1').innerText=this.currentPlayer.currentScore =0
    document.getElementById('currentScore1').innerText=this.currentPlayer.currentScore =0
    document.getElementById('currentScore2').innerText=this.currentPlayer.currentScore =0
    document.getElementById(this.playerZone).classList.remove('confetti')
    document.getElementById('playerWinner'+this.player).innerText= null
    document.getElementById(this.playerWinner).style.display = null
    document.getElementById('currentScoreBox'+this.player).style.display = null
}
// quand je clic sur le dés
onDiceClick(){
    this.myDice.rollDice()
//une fois le dés sur 1 il switch de joueur
    if (this.myDice.myCurrentFace===1)
    {
        this.changeDice()
        this.players[this.currentUser].currentScore=0
        document.getElementById('currentScore'+this.player).innerText=this.currentPlayer.currentScore
        this.changeUser()
        
    } 
    else 
    {
        //si le des n'est pas 1 il continue de jouer et addition les currentScore
        this.players[this.currentUser].currentScore=this.players[this.currentUser].currentScore+this.myDice.myCurrentFace
        this.player1 = this.players[0]
        this.player2 = this.players[1]
        this.currentPlayer =this.players[this.currentUser] 

    

    document.getElementById('currentScore'+this.player).innerText=this.currentPlayer.currentScore
        
    document.getElementById('playerName'+this.player).innerText = this.currentPlayer.name
    this.changeDice()

    }
    console.log('totalScore %s',this.players[this.currentUser].totalScore
    )
    }

//quand je clic sur hold; addition des score dans score total et si le score est > ou = alors il met en place PlayerWinner et met des confetti 
onHoldClick(){

    this.players[this.currentUser].totalScore=this.players[this.currentUser].totalScore +  this.players[this.currentUser].currentScore
    this.players[this.currentUser].currentScore = 0
    this.changeTotalScore()  
    if(this.players[this.currentUser].totalScore>= this.scoreMax){
        document.getElementById(this.playerZone).classList.add('confetti')
        document.getElementById(this.playerWinner).style.display = 'block' 
        document.getElementById('currentScoreBox'+this.player).style.display = 'none'
        document.getElementById('playerWinner'+this.player).innerText= this.players[this.currentUser].name+' a gagné'
    
    }
    else
    this.changeUser()


}

changeUser(){   
//met en place le joueur actif
document.getElementById(this.playerZone).classList.remove('active')

if (this.currentUser ===0)
this.currentUser = 1
else this.currentUser=0
this.player = this.currentUser + 1
this.scoreId = 'scorePlayer'+this.player 
this.playerZone='playerZone'+this.player
this.playerWinner = 'playerWinner' + this.player

document.getElementById(this.playerZone).classList.add('active')

}

changeTotalScore()
{      
document.getElementById(this.scoreId).innerText = this.players[this.currentUser].totalScore
}

// mais en place le random des image du dés
changeDice(){
document.getElementById('diceImage').classList.remove(getMyClassName(this.myDice.oldFace))
document.getElementById('diceImage').classList.add(getMyClassName(this.myDice.myCurrentFace))
}
}

//met en place les image par rapport au random 
const getMyClassName = (myNumberOfDice) => diceName[myNumberOfDice-1]

const diceName = ['one', 'two','three','four','five','six']
 

class Player{
    constructor(name){
      this.name = name
      this.currentScore = 0
      this.totalScore = 0
    }
}

class Dice {   
    rollDice(){
      this.oldFace=this.myCurrentFace
      //random +1 pour avoir un chiffre de 1 a 6
      this.myCurrentFace = getRandomInt(6) + 1
    
    }
}

const btnCloseModal= document.querySelector ('.closeModal')
const overlay= document.querySelector ('.overlay')
const modal= document.querySelector ('.modal')
function closeModal(){
  modal.style.display = "none"
  overlay.style.display = "none"
}

btnCloseModal.addEventListener('click',closeModal)