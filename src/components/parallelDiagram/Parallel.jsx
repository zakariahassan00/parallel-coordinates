import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { rows } from '../../rows'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus, faSync } from '@fortawesome/free-solid-svg-icons'
import AutoComplete from '../autocomplete/AutoComplete';

function unpack(rows, key) {
    return rows.map(function(row) {
      return row[key];
    });
  }
  
  let data = [{
    type: 'parcoords',
    pad: [580,180,180,180],
    hovertemplate: '<i>Price</i>: Text' +
    '<br><b>X</b>: 213123<br>' +
    '<b>dasdas</b>',
    line: {
      highlight: true,
      hovermode: "closest",
      hoverlabel: { bgcolor: "#FFF" },
      color: unpack(rows, 'species_id'),
      colorscale: [[0, '#E67571'], [0.5, '#F5EA80'], [1, '#8BD9AF']],
      hovertemplate: '<i>Price</i>: Text' +
                          '<br><b>X</b>: 213123<br>' +
                          '<b>dasdas</b>',
      marker: {
        line: {
          color: 'rgb(231, 99, 250)',
          width: 6
        }
      }
      // showscale: true,
      // reversescale: true,
      // colorscale: 'Jet',
    },
    marker: {
      color: 'black'
    },
    dimensions: [{
      range: [2, 4.5],
      label: 'Text',
      values: unpack(rows, 'sepal_width')
    }, {
      constraintrange: [5, 6],
      range: [4,8],
      label: 'Text',
      values: unpack(rows, 'sepal_length')
    }, {
      label: 'Text',
      range: [0, 2.5],
      values: unpack(rows, 'petal_width')
    }, 
    // {
    //   label: 'pLength',
    //   range: [1, 7],
    //   values: unpack(rows, 'petal_length')
    // }
  ]
  }];
  
  let layout = {
    width: 850,
    hovermode:'closest',
    hovermode: "closest",
    hoverlabel: { bgcolor: "#FFF" },
      // annotations: [
      //   {showarrow: false,
    //     text: 'Higher sepal width',
    //     x: 0, y: 1, xref: 'paper', yref: 'paper'},
      //   {showarrow: false,
    //     text: 'Lower petal width and length',
    //     x: 0.9, y: .25, xref: 'paper', yref: 'paper'
    //   }]
  };
  
  function Parallel() {
    let [state, setState] = useState(data);
    const [ open, setOpen ] = useState(false)
  
    function handleAddAxis (axisName) {
      setState([{...state[0], dimensions: [...state[0].dimensions, {
        label: axisName,
        range: [1, 7],
        values: unpack(rows, axisName)
      }]}]);
  
      setOpen(false)
    };
  
    return (
      <div className="App">
        <div className="pcp">
          <div className="pcp__chart">
  
            <Plot data={state} layout={layout} config={{ displayModeBar: false }}/>
  
            {open && <div className="pcp__newAxes">
              <AutoComplete onChange={handleAddAxis} options={["petal_length", "sepal_length"]}/>
              <div className="pcp__axes">
                <div className="axes__green"/>
                <div className="axes__red"/>
                <div className="axes__yellow"/>
                <div className="axes__orange"/>
              </div>
            </div>}
          </div>
          <div className="pcp__controls">
            <button id="add_axes" onClick={() => setOpen(!open)}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button id="reload_axes">
              <FontAwesomeIcon icon={faSync} />
            </button>
            <button id="save_axes">
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Parallel;
  