import React from "react";
import ScannerSettings from "./ScannerSettings";
import ScannerResults from "./ScannerResults";

class Scanner extends React.Component{
  constructor() {
    super();

    this.state = {
      scanning: false,
      results: []
    };
  }
  
  //turns scanner on.
  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  //when something is detected
  _onDetected = result => {
    if (this.state.results.length < 5) {
      this.setState;
      console.log("RESULT:", result);
      this.setState({ results: this.state.results.concat([result]) });
    }
  };


  render() {
    return (
      <div className='text-center' style={{margin: '10px'}}>
        <button className='btn btn-primary' onClick={this._scan}>
          {this.state.scanning ? "Stop Scanner" : "Use Scanner"}
        </button>
        <ul className="results">
          {this.state.results.map(result => (
            <ScannerResults key={result.codeResult.code} result={result} />
          ))}
        </ul>
        {this.state.scanning ? <ScannerSettings onDetected={this._onDetected} /> : null}

        <form>
          <label>
            Enter New Product's Brand name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Scanner;