"use strict";
var L11_TowerDefenseFire;
(function (L11_TowerDefenseFire) {
    var ƒAid = FudgeAid;
    let Tower = /** @class */ (() => {
        class Tower extends ƒ.Node {
            constructor(_name, _pos) {
                super(_name);
                this.health = 1;
                this.strength = 0.1;
                this.range = 4;
                this.rate = 0.5;
                this.timer = new ƒ.Timer(ƒ.Time.game, 500, 0, this.fire.bind(this));
                console.log(this.timer);
                let base = new ƒAid.Node("Base", null, Tower.material, Tower.meshBase);
                this.top = new ƒAid.Node("Top", ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1)), Tower.material, Tower.meshTop);
                let mtxTop = this.top.getComponent(ƒ.ComponentMesh).pivot;
                mtxTop.rotateZ(90);
                this.gun = new ƒAid.Node("Base", ƒ.Matrix4x4.IDENTITY(), Tower.material, Tower.meshGun);
                let mtxGun = this.gun.getComponent(ƒ.ComponentMesh).pivot;
                mtxGun.scale(new ƒ.Vector3(0.1, 0.1, 1));
                mtxGun.translateZ(0.5);
                this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));
                this.addChild(base);
                this.addChild(this.top);
                this.top.addChild(this.gun);
            }
            follow(_enemy) {
                this.target = null;
                let distanceSquared = ƒ.Vector3.DIFFERENCE(this.mtxWorld.translation, _enemy.mtxWorld.translation).magnitudeSquared;
                if (distanceSquared > (this.range * this.range))
                    return;
                this.top.cmpTransform.lookAt(_enemy.mtxWorld.translation, ƒ.Vector3.Y());
                this.target = _enemy;
            }
            fire() {
                // console.log("Fire", this);
                if (!this.target)
                    return;
                let projectile = new L11_TowerDefenseFire.Projectile(this.top.mtxWorld.translation, this.target);
                console.log("Fire", projectile);
            }
        }
        Tower.material = new ƒ.Material("Tower", ƒ.ShaderFlat, new ƒ.CoatColored());
        Tower.meshBase = new ƒ.MeshPyramid();
        Tower.meshTop = new ƒ.MeshSphere(10, 4);
        Tower.meshGun = new ƒ.MeshCube();
        return Tower;
    })();
    L11_TowerDefenseFire.Tower = Tower;
})(L11_TowerDefenseFire || (L11_TowerDefenseFire = {}));
//# sourceMappingURL=Tower.js.map