"use strict";
var L09_TowerDefenseStart;
(function (L09_TowerDefenseStart) {
    var ƒAid = FudgeAid;
    let Tower = /** @class */ (() => {
        class Tower extends ƒ.Node {
            constructor(_name, _pos) {
                super(_name);
                this.health = 1;
                this.strength = 0.1;
                this.range = 4;
                this.rate = 0.5;
                let base = new ƒAid.Node("Base", null, Tower.material, Tower.meshBase);
                this.top = new ƒAid.Node("Top", ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1)), Tower.material, Tower.meshTop);
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
                let distanceSquared = ƒ.Vector3.DIFFERENCE(this.mtxWorld.translation, _enemy.mtxWorld.translation).magnitudeSquared;
                if (distanceSquared > (this.range * this.range))
                    return;
                this.top.mtxLocal.lookAt(_enemy.mtxWorld.translation, ƒ.Vector3.Y());
                // this.gun.mtxLocal.lookAt(_enemy.mtxWorld.translation);
            }
        }
        Tower.material = new ƒ.Material("Tower", ƒ.ShaderFlat, new ƒ.CoatColored());
        Tower.meshBase = new ƒ.MeshPyramid();
        Tower.meshTop = new ƒ.MeshSphere(10, 4);
        Tower.meshGun = new ƒ.MeshCube();
        return Tower;
    })();
    L09_TowerDefenseStart.Tower = Tower;
})(L09_TowerDefenseStart || (L09_TowerDefenseStart = {}));
//# sourceMappingURL=Tower.js.map