import { useRef,useState } from 'react';
import Scanner from './Scanner';

//Largely lifted from Quagga2's example page. 

const CodeScanner = ({lastScan,setLastScan}) => {
    const [scanning, setScanning] = useState(false);
    const scannerRef = useRef(null);

    return (
        <div>
            <button onClick={() => setScanning(!scanning) }>{scanning ? 'Stop' : 'Start'}</button>
            <div ref={scannerRef} style={{position: 'relative'}}>
                <canvas className="drawingBuffer" style={{
                    position: 'absolute',
                    top: '0px'
                }} width="320" height="240" />
                {scanning ? <Scanner scannerRef={scannerRef} onDetected={(result) => setLastScan(result)} /> : null}
            </div>
        </div>
    );
};

export default CodeScanner;