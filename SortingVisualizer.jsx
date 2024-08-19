import React from "react";
import './SortingVisualizer.css'
import { mergeSortHelper } from "./algorithms/mergeSort";
import { barUpdate } from "./algorithms/mergeSort";  
let SIZE_OF_ARRAY = 100;
const PRIMARY_COLOR  = 'red';
const SECONDARY_COLOR = 'blue';
let BAR_WIDTH = 7;
let HEIGHT_MULTIPLIER = 5;
var arrSize
function setArraySize()
{
    SIZE_OF_ARRAY = arrSize.value*10
}
export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            array : [],
            BAR_WIDTH : 7
        }
    }
    componentDidMount()
    {
        this.resetArray();
        this.getBarHeight();
    }
    setBarWidth(){
        BAR_WIDTH = 7* 100 / SIZE_OF_ARRAY;
    }
    barUpdateNoDelay(bar, height, color)
   {
    window.setTimeout(
        function(){
            bar.style = "height:"+ height + "px;" + "background-color:" + color + ";" + "width: 7px; margin : 0 2px;";
        },0
    )
   }
    changeColor(bar , color){
        bar.style = "background-color : " + color + ";";
    }
    getBarHeight(){
        let height = window.innerHeight;
        HEIGHT_MULTIPLIER = height/100 * 0.55;
    }
    resetArray(){
        const array = [];
        let bars = document.getElementsByClassName("array-bar")

        for(let i=0; i<SIZE_OF_ARRAY; i++){
            array.push(Math.floor(Math.random()*(100-5) + 5))
            this.setState({array,BAR_WIDTH})
        }
        var i =0;
        while(i<SIZE_OF_ARRAY)
        {
            this.barUpdateNoDelay(bars[i], array[i]*HEIGHT_MULTIPLIER , PRIMARY_COLOR)
            i++;
        }
    }
    mergeSortVisualizer()
    {
        const {array} = this.state
       let arr =  mergeSortHelper(array)
    }
    render() {
        const {array} = this.state
        return (
            <div>
                <input type = "range" min = "1" max = "10" step = "1" defaultValue = "10" class = "slider" id = "arraySize" onChange={(event)=>{
                    SIZE_OF_ARRAY = event.target.value*10;
                    this.setBarWidth()
                    this.resetArray()
                    console.log(BAR_WIDTH)
                    
                }}></input>
                <button onClick ={()=>this.resetArray()}>Reset Array</button>
                <button onClick = {()=>this.mergeSortVisualizer()}>Merge Sort</button>
                <div className="array-container">
                {array.map((value, it)=>(
                    <div
                    className = "array-bar"
                    key = {it}
                    style = {{
                        backgroundColor : PRIMARY_COLOR,
                        height : `${value*HEIGHT_MULTIPLIER}px`,
                    }}></div>
                ))
                }
                </div>
            </div> 
        );
    }
}
