var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Vue.createApp({
    data: function () {
        return {
            completedWorkouts: [],
            dataPoints: [],
            dataLength: 10,
            workoutWeightB: [],
            workoutWeightS: [],
            workoutWeightD: [],
            totalB: 0,
            totalS: 0,
            totalD: 0,
            workoutNrB: 1,
            workoutNrS: 1,
            workoutNrD: 1
        };
    },
    methods: {
        //get sample workouts from json
        loadSampleData: function () {
            return __awaiter(this, void 0, void 0, function () {
                var response, json;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            window.localStorage.clear();
                            return [4 /*yield*/, fetch('data.json')];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            json = _a.sent();
                            Object.entries(json)
                                .forEach(function (_a) {
                                var k = _a[0], v = _a[1];
                                return localStorage.setItem(k, v);
                            });
                            window.location.reload();
                            return [2 /*return*/];
                    }
                });
            });
        },
        //get data from local storage for pages by id      
        getData: function (id) {
            var name = "";
            var check = JSON.parse(window.localStorage.getItem('completedWorkouts' + id));
            if (check !== null) {
                this.completedWorkouts = JSON.parse(window.localStorage.getItem('completedWorkouts' + id));
                this.dataPoints = [];
                for (var i = 0; i < this.completedWorkouts.length; i++) {
                    this.dataPoints.unshift({ y: this.completedWorkouts[i].total, x: this.completedWorkouts[i].workoutNr });
                }
                if (this.completedWorkouts.length > this.dataLength) {
                    for (var i = 0; i < this.completedWorkouts.length - this.dataLength; i++) {
                        this.dataPoints.shift();
                    }
                }
                switch (id) {
                    case "Bench":
                        name = "Bench Press Progress";
                        this.workoutWeightB = JSON.parse(window.localStorage.getItem('workoutWeight' + id));
                        this.workoutNrB = JSON.parse(window.localStorage.getItem('workoutNr' + id));
                        this.totalB = JSON.parse(window.localStorage.getItem('total' + id));
                        break;
                    case "Squat":
                        name = "Squat Progress";
                        this.workoutWeightS = JSON.parse(window.localStorage.getItem('workoutWeight' + id));
                        this.workoutNrS = JSON.parse(window.localStorage.getItem('workoutNr' + id));
                        this.totalS = JSON.parse(window.localStorage.getItem('total' + id));
                        break;
                    case "Deadl":
                        name = "Deadlift Progress";
                        this.workoutWeightD = JSON.parse(window.localStorage.getItem('workoutWeight' + id));
                        this.workoutNrD = JSON.parse(window.localStorage.getItem('workoutNr' + id));
                        this.totalD = JSON.parse(window.localStorage.getItem('total' + id));
                        break;
                }
            }
            //create charts with CanvasJS
            var chart = new CanvasJS.Chart(id, {
                animationEnabled: true,
                theme: "dark2",
                backgroundColor: "",
                title: {
                    text: name
                },
                axisX: {
                    title: "Workout number",
                    interval: 1
                },
                axisY: {
                    title: "Total weight",
                    interval: 10
                },
                data: [{
                        type: "line",
                        lineColor: "#00d2be",
                        markerColor: "#00d2be",
                        indexLabelFontSize: 16,
                        dataPoints: this.dataPoints
                    }]
            });
            chart.render();
        }
    },
    mounted: function () {
        this.getData("Bench");
        this.getData("Squat");
        this.getData("Deadl");
    }
}).mount('body');
//# sourceMappingURL=indexScript.js.map