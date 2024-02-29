import React, { useState, useEffect, useContext } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { userContext } from "../../context/UserProvider";


const Graph = () => {
    const [chartData, setChartData] = useState({});
    const [labels, setlabels] = useState([]);
    const [counters, setcounters] = useState([]);
    const { user } = useContext(userContext);
    
    const fetchData = ()=>{
        setlabels(user.counterSongs.map((item) => item.SongsId.song_name));
        setcounters(user.counterSongs.map((item) => item.counter));
    }
        useEffect(()=>{
        fetchData()
        },[])
    
    const data ={
      labels: labels,
      datasets: [
        {
          label: "Counter",
          data: counters,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  
    return (
      <div>
        <h2>Counter Songs Graph</h2>
        <div style={{ height: "400px", width: "600px" }}>
          <Bar
            data={data}
          />
        </div>
      </div>
    );
  };
  
  export default Graph;