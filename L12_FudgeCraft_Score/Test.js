"use strict";
var L12_FudgeCraft_Points;
(function (L12_FudgeCraft_Points) {
    function startTests() {
        switch (L12_FudgeCraft_Points.args.get("test")) {
            case "grid":
                testGrid();
                break;
            case "combos":
                testCombos();
                break;
            case "compression":
                testCompression();
                break;
            case "camera":
                testCamera();
                break;
        }
    }
    L12_FudgeCraft_Points.startTests = startTests;
    function testCamera() {
        let setups = [
            { type: L12_FudgeCraft_Points.CUBE_TYPE.BLACK, positions: [[0, 0, 0]] }
        ];
        setupGrid(setups);
        L12_FudgeCraft_Points.startRandomFragment();
        L12_FudgeCraft_Points.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, rotateY);
        L12_FudgeCraft_Points.ƒ.Loop.start();
        // ƒ.Time.game.setTimer(4, 0, rotateY);
        function rotateY(_event) {
            L12_FudgeCraft_Points.camera.rotateY(1 * L12_FudgeCraft_Points.ƒ.Loop.timeFrameReal);
            // camera.rotateX(5 * Math.sin(ƒ.Time.game.get() / 100));
            L12_FudgeCraft_Points.updateDisplay();
        }
    }
    async function testCompression() {
        let setups = [
            { type: L12_FudgeCraft_Points.CUBE_TYPE.BLACK, positions: [[0, 0, 0]] },
            // { type: CUBE_TYPE.RED, positions: [[-2, -2, 0], [-2, -2, 1], [-2, -2, -1]] },
            // { type: CUBE_TYPE.GREEN, positions: [[0, -2 , 0], [1, -2, 0], [-1, -2, 0]] },
            // { type: CUBE_TYPE.BLUE, positions: [[1, 0, 0] /*, [0, 0, 2], [0, -1, 2], [0, 1, 2]*/] },
            { type: L12_FudgeCraft_Points.CUBE_TYPE.YELLOW, positions: [[3, 1, 0], [2, 0, 1], [2, 1, 1]] }
            // { type: CUBE_TYPE.YELLOW, positions: [[0, -2, -2], [1, -2, -2], [-1, -2, -2]] }
        ];
        setupGrid(setups);
        L12_FudgeCraft_Points.updateDisplay();
        // debugger;
        // ƒ.Time.game.setScale(0.2);
        await L12_FudgeCraft_Points.ƒ.Time.game.delay(2000);
        L12_FudgeCraft_Points.compressAndHandleCombos();
    }
    function testCombos() {
        let setups = [
            { type: L12_FudgeCraft_Points.CUBE_TYPE.RED, positions: [[0, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, -1], [-1, 0, 0]] },
            { type: L12_FudgeCraft_Points.CUBE_TYPE.GREEN, positions: [[-5, 0, 0], [-5, 0, 1], [-5, 1, 2], [-5, -1, 2], [-5, 0, 2]] },
            { type: L12_FudgeCraft_Points.CUBE_TYPE.CYAN, positions: [[3, 0, 0], [3, 0, 1], [3, 0, 2], [3, 0, 3], [3, 0, 4], [3, 0, 5], [3, 0, 6], [3, 0, -1], [3, 0, -2]] },
            { type: L12_FudgeCraft_Points.CUBE_TYPE.BLUE, positions: [[0, 3, 0], [0, 3, 1], [0, 3, 2], [1, 3, 2], [2, 3, 2], [2, 3, 1], [2, 3, 0], [1, 3, 0], [0, 3, 0]] }
        ];
        setupGrid(setups);
        let startElements = setups.map((_setup) => {
            return L12_FudgeCraft_Points.grid.pull(new L12_FudgeCraft_Points.ƒ.Vector3(..._setup.positions[1]));
        });
        let combos = new L12_FudgeCraft_Points.Combos(startElements);
        for (let combo of combos.found)
            for (let element of combo) {
                let mtxLocal = element.cube.cmpTransform.local;
                L12_FudgeCraft_Points.ƒ.Debug.log(element.cube.name, mtxLocal.translation.getMutator());
                // mtxLocal.rotateX(45);
                // mtxLocal.rotateY(45);
                // mtxLocal.rotateY(45, true);
                // mtxLocal.translateX(1);
                mtxLocal.scale(L12_FudgeCraft_Points.ƒ.Vector3.ONE(0.5));
            }
        L12_FudgeCraft_Points.updateDisplay();
    }
    function testGrid() {
        let cube = new L12_FudgeCraft_Points.Cube(L12_FudgeCraft_Points.CUBE_TYPE.GREEN, L12_FudgeCraft_Points.ƒ.Vector3.ZERO());
        L12_FudgeCraft_Points.grid.push(cube.cmpTransform.local.translation, new L12_FudgeCraft_Points.GridElement(cube));
        let pulled = L12_FudgeCraft_Points.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = L12_FudgeCraft_Points.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = L12_FudgeCraft_Points.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function setupGrid(_setups) {
        _setups.forEach((_setup) => {
            _setup.positions.forEach((_position) => {
                let position = new L12_FudgeCraft_Points.ƒ.Vector3(..._position);
                let cube = new L12_FudgeCraft_Points.Cube(_setup.type, position);
                L12_FudgeCraft_Points.grid.push(position, new L12_FudgeCraft_Points.GridElement(cube));
            });
        });
    }
    function logResult(_success, ..._args) {
        let log = _success ? L12_FudgeCraft_Points.ƒ.Debug.log : L12_FudgeCraft_Points.ƒ.Debug.warn;
        log(`Test success: ${_success}`, _args);
    }
})(L12_FudgeCraft_Points || (L12_FudgeCraft_Points = {}));
//# sourceMappingURL=Test.js.map