declare var Vue: any;
declare var CanvasJS: any;

Vue.createApp({
    data() {
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
            workoutNrD: 1,
        };
    },
    methods: {
        //get sample workouts from json
        async loadSampleData() {
            window.localStorage.clear();
            let response = await fetch('data.json');
            let json = await response.json();
            Object.entries(json)
                .forEach(([k, v]) => localStorage.setItem(k, v))
            window.location.reload();
        },
        //get data from local storage for pages by id      
        getData(id) {
            let name = "";
            let check = JSON.parse(window.localStorage.getItem('completedWorkouts' + id));
            if (check !== null) {
                this.completedWorkouts = JSON.parse(window.localStorage.getItem('completedWorkouts' + id));
                this.dataPoints = [];
                for (let i = 0; i < this.completedWorkouts.length; i++) {
                    this.dataPoints.unshift({ y: this.completedWorkouts[i].total, x: this.completedWorkouts[i].workoutNr })
                }
                if (this.completedWorkouts.length > this.dataLength) {
                    for (let i = 0; i < this.completedWorkouts.length - this.dataLength; i++) {
                        this.dataPoints.shift();
                    }
                }
                switch (id) {
                    case "Bench":
                        name = "Bench Press Progress"
                        this.workoutWeightB = JSON.parse(window.localStorage.getItem('workoutWeight' + id));
                        this.workoutNrB = JSON.parse(window.localStorage.getItem('workoutNr' + id));
                        this.totalB = JSON.parse(window.localStorage.getItem('total' + id));
                        break;
                    case "Squat":
                        name = "Squat Progress"
                        this.workoutWeightS = JSON.parse(window.localStorage.getItem('workoutWeight' + id));
                        this.workoutNrS = JSON.parse(window.localStorage.getItem('workoutNr' + id));
                        this.totalS = JSON.parse(window.localStorage.getItem('total' + id));
                        break;
                    case "Deadl":
                        name = "Deadlift Progress"
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
    mounted() {
        this.getData("Bench")
        this.getData("Squat")
        this.getData("Deadl")

    },
}).mount('body');
