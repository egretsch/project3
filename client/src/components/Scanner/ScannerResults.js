import React from 'react';
import PropTypes from 'prop-types';

class ScannerResults extends React.Component{

    render() {
        const result = this.props.scanResults;

        if (!result) {
            return null;
        }
        return (
            <li>
            {result.codeResult.code} [{result.codeResult.format}]
            </li>
        );
    }
}

ScannerResults.propTypes = {
    result: PropTypes.object
}

export default ScannerResults;