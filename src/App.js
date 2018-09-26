import React from 'react';
import Scanner from './Scanner';
import Result from './Result';

export default class App extends React.Component{
  
    constructor() {
      super();

      this.state = {
        scanning: false,
        results: []
      }
    }

    render() {
        return (
            <div>
                <button onClick={this._scan}>{this.state.scanning ? 'Stop' : 'Start'}</button>
                <ul className="results">
                    {this.state.results.map((result) => (<Result key={result.codeResult.code} result={result} />))}
                </ul>
                {this.state.scanning ? <Scanner onDetected={this._onDetected}/> : null}
            </div>
        );
    }

    _scan = () => {
        this.setState({scanning: !this.state.scanning});
    }

    _onDetected = (result) => {

        if(this.state.results.length < 5) {
          this.setState
          console.log('RESULT:', result);
          this.setState({results: this.state.results.concat([result])});

        }
        
        
    }
};