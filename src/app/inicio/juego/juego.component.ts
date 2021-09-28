import { Component, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';
import Phaser from 'phaser';
import data from '../../../assets/preguntas.js';
import tema1 from './preguntas1.js'
import tema2 from './preguntas2.js'
import tema3 from './preguntas3.js'
import swal from 'sweetalert2';
import { ServicesService } from 'src/app/services/services.service';
//declare let txt;
declare let configJson;
@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  preguntas;
  screenHeight: number;
  screenWidth: number;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  forward(evt) {
    var sc = localStorage.getItem('identificacion');
    var sc1 = localStorage.getItem('score');

    if (!sc || !sc1) {
      swal.fire('Información', 'Debes terminar el juego.', 'error');
      evt.preventDefault();
    } else {
      var data = {
        "nombre": localStorage.getItem('jugador'),
        "numero_identificacion": localStorage.getItem('identificacion'),
        "score": localStorage.getItem('score'),
      };

      const tpoe = this.service.guardarRanking(localStorage.getItem('jugador'), localStorage.getItem('identificacion'), localStorage.getItem('score')).subscribe(data => {
        window.location.href = '#/inicio/ranking';
        tpoe.unsubscribe();
      });
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private service: ServicesService) {
    this.getScreenSize();

    this.preguntas = [];
    this.config = {
      title: 'Titulo del juego',
      url: 'http://k2digital.io',
      version: '0.0.1',

      pixelArt: true,

      type: Phaser.CANVAS,
      width: 540,
      height: 800,
      /* width: this.screenWidth,
      height: this.screenHeight, */
      parent: 'container',
      backgroundColor: '#34495E',

      banner: {
        hidePhaser: true,
        text: '#000000',
        background: [
          'red',
          'yellow',
          'red',
          'transparent'
        ]
      },

      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 40 },
          debug: false
        }
      },

      scene: [Homescene, Firstscene]
    };
  }
  ngOnInit() {



    this.phaserGame = new Phaser.Game(this.config);
  }

}

class Homescene extends Phaser.Scene {
  background: Phaser.GameObjects.Image;
  bionutrivia: Phaser.GameObjects.Image;
  bionutrec: Phaser.GameObjects.Image;
  inmufort: Phaser.GameObjects.Image;
  /*     niño: Phaser.GameObjects.Sprite;
    niña: Phaser.GameObjects.Sprite; */
  niño;
  niña;
  comenzarBtn: Phaser.GameObjects.Sprite;
  seleccion_txt: Phaser.GameObjects.Text;
  tiempo;

  constructor() {
    super("Homescene");
  }

  init() {
  }

  preload() {
    this.load.image('bghome', 'assets/backgroundHome.png');
    this.load.image('bionutrivia', 'assets/bionutrivia.png');
    this.load.image('bionutrec', 'assets/bionutrec.png');
    this.load.image('inmufort', 'assets/inmufort.png');

    this.load.spritesheet('niñosprite', 'assets/niñoSprite.png', { frameWidth: 170, frameHeight: 170 });
    this.load.spritesheet('niñasprite', 'assets/niñaSprite.png', { frameWidth: 170, frameHeight: 170 });
    this.load.spritesheet('comenzarsprite', 'assets/comenzarBtnSprite.png', { frameWidth: 170, frameHeight: 74 });
  }

  create() {
    this.tiempo = 0;

    this.background = this.add.image(270, 480, 'bghome');
    this.bionutrivia = this.add.image(270, 165, 'bionutrivia');
    this.bionutrec = this.add.image(170, 240, 'bionutrec');
    this.inmufort = this.add.image(375, 240, 'inmufort');
    this.niño = this.add.sprite(155, 420, 'niñosprite').setInteractive();
    this.niña = this.add.sprite(385, 420, 'niñasprite').setInteractive();
    this.comenzarBtn = this.add.sprite(270, 640, 'comenzarsprite').setInteractive();
    this.seleccion_txt = this.add.text(30, 520, "Selecciona tu jugador", { font: "bold 24px Verdana", color: "#fff", align: "center", fixedWidth: 480 });

    let personaje = 'assets/dependientesprite.png';

    this.niño.on('pointerover', () => {
      this.niño.setFrame(1);
    }).on('pointerout', () => {
      if (this.niña.frame == 1) {
        this.niño.setFrame(0);
      }
    }).on('pointerdown', () => {
      this.niño.setFrame(1);
      this.niña.setFrame(0);
      personaje = 'assets/dependientesprite.png';
    })

    this.niña.on('pointerover', () => {
      this.niña.setFrame(1);
    }).on('pointerout', () => {
      if (this.niño.frame == 1) {
        this.niña.setFrame(0);
      }
    }).on('pointerdown', () => {
      this.niña.setFrame(1);
      this.niño.setFrame(0);
      personaje = 'assets/dependientesprite_mujer.png';
    })

    this.comenzarBtn.on('pointerover', () => {
      this.comenzarBtn.setFrame(1);
    }).on('pointerout', () => {
      this.comenzarBtn.setFrame(0);
    }).on('pointerdown', () => {
      this.scene.start("Firstscene", {
        "path_dependiente": personaje,
        "comenzar": true,
        "time": this.tiempo
      });
    });
  }

  update(time, delta) {
    this.tiempo = time;
  }
}
//export default Homescene;

class Firstscene extends Phaser.Scene {
  respawn: number;
  path_dependiente: any;
  comenzar: any;
  mode: number;
  pillCollition: boolean;
  sideCollition: number;
  question_id: number;
  answer: any;
  correctAnswer: number;
  balloon_ok: any;
  balloon_fail: any;
  bg_audio: Phaser.Sound.BaseSound;
  swallow: Phaser.Sound.BaseSound;
  background: Phaser.GameObjects.Image;
  backgrounds: string[];
  balloon: Phaser.GameObjects.Image;
  ground: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  instruccion: Phaser.GameObjects.Text;
  pregunta: Phaser.GameObjects.Text;
  respuesta1: Phaser.GameObjects.Text;
  respuesta2: Phaser.GameObjects.Text;
  respuesta3: Phaser.GameObjects.Text;
  respuesta4: Phaser.GameObjects.Text;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  checker1: Phaser.GameObjects.Sprite;
  checker2: Phaser.GameObjects.Sprite;
  checker3: Phaser.GameObjects.Sprite;
  checker4: Phaser.GameObjects.Sprite;
  checker5: Phaser.GameObjects.Sprite;
  checkers: any[];
  pills: Phaser.Physics.Arcade.Group;
  right: number;
  score: number;
  goright: boolean;
  goleft: boolean;
  touchleft: Phaser.GameObjects.Rectangle;
  touchright: Phaser.GameObjects.Rectangle;
  constructor() {
    super('Firstscene');
  }

  init(data) {
    this.respawn = data.time;
    this.path_dependiente = data.path_dependiente;
    this.comenzar = data.comenzar;
  }

  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('background2', 'assets/background2.png');
    this.load.image('background3', 'assets/background3.png');
    this.load.image('background4', 'assets/background4.png');
    this.load.image('background5', 'assets/background5.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('balloon', 'assets/balloon.png');
    this.load.image('balloon_ok', 'assets/balloon_ok.png');
    this.load.image('balloon_fail', 'assets/balloon_fail.png');
    this.load.image('ganaste', 'assets/ganaste.png');
    this.load.image('perdiste', 'assets/perdiste.png');

    this.load.spritesheet('dependientesprite', this.path_dependiente, { frameWidth: 95, frameHeight: 136 });
    this.load.spritesheet('pill', 'assets/spritePill.png', { frameWidth: 95, frameHeight: 95 });
    this.load.spritesheet('checker', 'assets/checkbox.png', { frameWidth: 29, frameHeight: 25 });
    this.load.image('bullet', 'assets/bullet.png');
    this.load.audio('bg_audio', ['assets/latin1.mp3']);
    this.load.audio('swallow', ['assets/swallow.mp3']);
  }

  create() {
    this.mode = parseInt(localStorage.getItem('modoJuego'));
    this.right = 0;
    this.score = 0;
    this.pillCollition = false;
    this.sideCollition = 1;
    this.question_id = 1;
    this.answer;
    this.correctAnswer = 0;
    this.balloon_ok = null;
    this.balloon_fail = null;
    this.goright = false;
    this.goleft = false;

    this.bg_audio = this.sound.add('bg_audio', { loop: true });
    this.bg_audio.play();
    this.swallow = this.sound.add('swallow', { loop: false });

    this.background = this.add.image(270, 480, 'background');
    this.backgrounds = ["background", "background2", "background3", "background4", "background5"];
    this.balloon = this.add.image(270, 50, 'balloon').setDepth(1).setAlpha(0.95);
    this.ground = this.physics.add.image(270, 840, 'ground').setDepth(1);

    this.instruccion = this.add.text(50, 610, 'Ayuda al personaje a atrapar la pastilla correcta!', { font: "bold 16px Verdana", color: "#a40" }).setDepth(1);

    this.pregunta = this.add.text(30, 22, "", { font: "bold 14px Verdana", color: "#006", align: "center", fixedWidth: 490 }).setDepth(1);
    this.respuesta1 = this.add.text(75, 650, "", { font: "bold 12px Verdana", color: "#006" }).setDepth(1);
    this.respuesta2 = this.add.text(325, 650, "", { font: "bold 12px Verdana", color: "#006" }).setDepth(1);
    this.respuesta3 = this.add.text(75, 715, "", { font: "bold 12px Verdana", color: "#006" }).setDepth(1);
    this.respuesta4 = this.add.text(325, 715, "", { font: "bold 12px Verdana", color: "#006" }).setDepth(1);
    this.load_questions();
    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = this.physics.add.sprite(this.sys.game.canvas.width / 2, this.sys.canvas.height - 310, 'dependientesprite');
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(60, 120, true);
    this.player.body.offset.y = 16;

    this.checker1 = this.add.sprite(520, 120, 'checker');
    this.checker2 = this.add.sprite(520, 150, 'checker');
    this.checker3 = this.add.sprite(520, 180, 'checker');
    this.checker4 = this.add.sprite(520, 210, 'checker');
    this.checker5 = this.add.sprite(520, 240, 'checker');

    this.checkers = [this.checker1, this.checker2, this.checker3, this.checker4, this.checker5];

    this.ground.setCollideWorldBounds(true);
    this.ground.setImmovable(true);

    this.animatePlayer();

    this.touchleft = this.add.rectangle(40, 600, 80, 80).setDepth(1).setInteractive();
    this.touchright = this.add.rectangle(500, 600, 80, 80).setDepth(1).setInteractive();
    this.touchleft.on('pointerdown', () => {
      this.goright = false;
      this.goleft = true;
    });
    this.touchleft.on('pointerup', () => {
      this.goright = false;
      this.goleft = false;
    });
    this.touchright.on('pointerdown', () => {
      this.goright = true;
      this.goleft = false;
    });
    this.touchright.on('pointerup', () => {
      this.goright = false;
      this.goleft = false;
    });

    this.pills = this.physics.add.group({
      defaultKey: 'pill'
    });

    this.physics.add.collider(
      this.player,
      this.pills,
      this.eatPill,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.ground,
      () => true,
      null,
      this
    );

  }

  update(time, delta) {

    if (this.pillCollition) {
      if (this.sideCollition) {
        this.player.anims.play('eatFromRight');
      } else {
        this.player.anims.play('eatFromLeft');
      }
      this.scene.pause();
      setTimeout(() => {
        if (this.answer == this.correctAnswer) {
          this.player.anims.play('correct');
          this.balloon_ok = this.add.image(this.player.x, this.player.y - 90, 'balloon_ok');
        } else {
          this.player.anims.play('fail');
          this.balloon_fail = this.add.image(this.player.x, this.player.y - 90, 'balloon_fail');
        }
      }, 166);
      setTimeout(() => {
        if (this.mode == 1) {
          this.pills.clear(true, true);
          if (this.answer == this.correctAnswer) {
            this.check(this.question_id, true);
            this.right++;
            console.log(this.right);
          } else {
            this.check(this.question_id, false);
          }
          this.next_question();
        }
        if (this.mode == 0) {
          this.pills.clear(true, true);
          if (this.answer == this.correctAnswer) {
            this.check(this.question_id, true);
            this.right++;
            console.log(this.right);
            this.next_question();
          } else {
            this.results();
          }
        }
      }, 500);
    } else if (this.cursors.left.isDown || this.goleft) {
      this.player.setVelocityX(-220);
      this.player.setVelocityY(0);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown || this.goright) {
      this.player.setVelocityX(220);
      this.player.setVelocityY(0);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn')
    }

    /* this.touchleft.on('pointerdown', () => {
      this.player.setVelocityX(-220);
      this.player.setVelocityY(0);
      this.player.anims.play('left', true);
    });

    this.touchright.on('pointerdown', () => {
      this.player.setVelocityX(220);
      this.player.setVelocityY(0);
      this.player.anims.play('right', true);
    }); */

    if (time > this.respawn) {
      this.pillsFalling();
      this.respawn += 2000;
    }

    this.pillCollition = false;
  }

  animatePlayer() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dependientesprite', { start: 5, end: 1 }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dependientesprite', frame: 6 }],
      frameRate: 4
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dependientesprite', { start: 7, end: 11 }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'eatFromRight',
      frames: [{ key: 'dependientesprite', frame: 0 }],
      frameRate: 4,
      duration: 500
    });

    this.anims.create({
      key: 'eatFromLeft',
      frames: [{ key: 'dependientesprite', frame: 12 }],
      frameRate: 4,
      duration: 500
    });

    this.anims.create({
      key: 'fail',
      frames: [{ key: 'dependientesprite', frame: 13 }],
      frameRate: 4,
      duration: 500
    });

    this.anims.create({
      key: 'correct',
      frames: [{ key: 'dependientesprite', frame: 14 }],
      frameRate: 4,
      duration: 500
    });
  }

  pillsFalling() {
    var pill = this.pills.get(this.getRandomInt(50, 490), -68).setCircle(30, 12.5, 12.5);
    pill.answer = this.getRandomInt(1, 5);
    pill.setFrame(pill.answer - 1);
    console.log(this.comenzar);
  }

  eatPill(player, pill) {
    this.answer = pill.answer;
    this.pillCollition = true;
    this.sideCollition = player.x > pill.x ? 1 : 0;
    this.swallow.play();
    this.bg_audio.pause();
    pill.destroy();
    this.goright = false;
    this.goleft = false;
  }

  next_question() {
    if (this.question_id < 5) {
      this.load_questions();
      if (this.balloon_ok) { this.balloon_ok.destroy(); }
      if (this.balloon_fail) { this.balloon_fail.destroy(); }
      this.scene.resume('Firstscene');
      this.bg_audio.resume();
      this.background.setTexture(this.backgrounds[this.question_id], 0);
      this.question_id++;
    } else {
      this.results();
      /*   swal.fire({
          title: 'Información',
          text: 'Encuesta terminada',
          confirmButtonText: `Aceptar`,
        }).then((result) => {    
          this.sys.game.destroy(true);
          window.location.href='#/inicio/ranking';
        }) */
    }
  }

  results() {
    if (this.mode) {
      this.score = this.right * 20;
      if (this.right > 2) {
        this.add.image(270, 320, 'ganaste');
        this.add.text(70, 370, this.score + " pts. / " + this.right + " respuestas correctas de 5", {
          font: "bold 16px Verdana",
          color: "#fff",
          align: "center",
          fixedWidth: 400
        }).setDepth(1);
        if (this.balloon_ok) { this.balloon_ok.destroy(); }
        if (this.balloon_fail) { this.balloon_fail.destroy(); }
      } else {
        this.add.image(270, 320, 'perdiste');
        this.add.text(70, 370, this.score + " pts. / " + this.right + " respuestas correctas de 5", {
          font: "bold 16px Verdana",
          color: "#fff",
          align: "center",
          fixedWidth: 400
        }).setDepth(1);
        this.add.text(70, 395, "Intentalo nuevamente!", {
          font: "bold 16px Verdana",
          color: "#fff",
          align: "center",
          fixedWidth: 400
        }).setDepth(1);
        if (this.balloon_ok) { this.balloon_ok.destroy(); }
        if (this.balloon_fail) { this.balloon_fail.destroy(); }
      }
    } else {
      if (this.right == 5) {
        this.score = 70;
        this.add.image(270, 320, 'ganaste');
        this.add.text(70, 370, this.score + " pts. / " + this.right + " respuestas correctas de 5", {
          font: "bold 16px Verdana",
          color: "#fff",
          align: "center",
          fixedWidth: 400
        }).setDepth(1);
        if (this.balloon_ok) { this.balloon_ok.destroy(); }
        if (this.balloon_fail) { this.balloon_fail.destroy(); }
      } else {
        this.add.image(270, 320, 'perdiste');
        this.add.text(70, 370, this.score + " pts. / " + "Ahhh! fallaste una respuesta...", {
          font: "bold 16px Verdana",
          color: "#fff",
          align: "center",
          fixedWidth: 400
        }).setDepth(1);
        this.add.text(70, 395, "Intentalo nuevamente!", {
          font: "bold 16px Verdana",
          color: "#fff",
          align: "center",
          fixedWidth: 400
        }).setDepth(1);
        if (this.balloon_ok) { this.balloon_ok.destroy(); }
        if (this.balloon_fail) { this.balloon_fail.destroy(); }
      }
    }
    console.log(this.score);
    localStorage.setItem('score', this.score.toString());
  }

  check(id, state) {
    if (state) {
      this.checkers[id - 1].setFrame(2);
    } else {
      this.checkers[id - 1].setFrame(1);
    }
  }

  load_questions() {

    var tema = localStorage.getItem('tema');
    let pregunta_index;
    let item;
    switch (tema) {
      case "1":
        console.log("inmufort");
        //inmufort
        pregunta_index = this.getRandomInt(0, tema1.data.length - 1);
        item = tema1.data.splice(pregunta_index, 1)[0];
        break;
      case "2":
        console.log("preguntas_probioticos_bionutrec");
        //preguntas_probioticos_bionutrec
        pregunta_index = this.getRandomInt(0, tema2.data.length - 1);
        item = tema2.data.splice(pregunta_index, 1)[0];
        break;
      case "3":
        //PROCILUS
        console.log("PROCILUS");
        pregunta_index = this.getRandomInt(0, tema3.data.length - 1);
        item = tema3.data.splice(pregunta_index, 1)[0];
        break;
      default:
        break;
    }


    this.pregunta.setText(item.pregunta);
    this.respuesta1.setText(item.respuesta.uno);
    this.respuesta2.setText(item.respuesta.dos);
    this.respuesta3.setText(item.respuesta.tres);
    this.respuesta4.setText(item.respuesta.cuatro);
    this.correctAnswer = item.correcta
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
export default [Firstscene, Homescene];