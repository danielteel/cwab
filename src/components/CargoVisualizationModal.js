import {useRef} from 'react';
import {Header, Modal} from 'semantic-ui-react';

import armStationsImage from '../assets/arm-stations.png';
import {stationToImageXRatio} from './ArmPicker';
import {formatWeight} from '../common';

function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
}

function getDisplayCargo(cargo){
    return (cargo || [])
        .map((item, index) => {
            const arm = Number(item.arm);

            if (!Number.isFinite(arm)){
                return null;
            }

            const xRatio = clamp(stationToImageXRatio(arm), 0, 1);
            const yRatio = 0.24 + ((index % 5) * 0.12);
            const name = item.name?.trim() || `Cargo ${index + 1}`;

            return {
                ...item,
                arm,
                name,
                expended: Boolean(item.expended),
                left: `${xRatio * 100}%`,
                top: `${yRatio * 100}%`
            };
        })
        .filter(Boolean);
}

export default function CargoVisualizationModal({open, cargo, onClose}){
    const frameRef = useRef(null);
    const dragRef = useRef(null);
    const displayCargo = getDisplayCargo(cargo);

    const startDrag = (event) => {
        const frame = frameRef.current;

        if (!frame){
            return;
        }

        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        dragRef.current = {
            x: event.clientX,
            y: event.clientY,
            scrollLeft: frame.scrollLeft,
            scrollTop: frame.scrollTop
        };
    };

    const dragImage = (event) => {
        const frame = frameRef.current;
        const drag = dragRef.current;

        if (!frame || !drag){
            return;
        }

        event.preventDefault();
        frame.scrollLeft = drag.scrollLeft - (event.clientX - drag.x);
        frame.scrollTop = drag.scrollTop - (event.clientY - drag.y);
    };

    const stopDrag = () => {
        dragRef.current = null;
    };

    return (
        <Modal open={open} onClose={onClose} size='fullscreen' closeIcon>
            <Modal.Header>Cargo Visualization</Modal.Header>
            <Modal.Content>
                {
                    displayCargo.length
                    ?
                        <div className='cargo-visualizer-frame' ref={frameRef}>
                            <div
                                className='cargo-visualizer-stage'
                                onPointerDown={startDrag}
                                onPointerMove={dragImage}
                                onPointerUp={stopDrag}
                                onPointerCancel={stopDrag}
                                onLostPointerCapture={stopDrag}
                            >
                                <img
                                    className='cargo-visualizer-image'
                                    src={armStationsImage}
                                    alt='Aircraft station diagram'
                                    draggable='false'
                                />
                                {
                                    displayCargo.map((item) => (
                                        <div
                                            className={`cargo-visualizer-marker${item.expended ? ' cargo-visualizer-marker-expended' : ''}`}
                                            key={item.id}
                                            style={{left: item.left, top: item.top}}
                                        >
                                            <div className='cargo-visualizer-crosshair'/>
                                            <div className='cargo-visualizer-label'>
                                                <strong>{item.name}</strong>
                                                <span>FS {Math.round(item.arm)} / {formatWeight(item.weight)} lb</span>
                                                {item.expended ? <strong>Exp</strong> : null}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    :
                        <Header as='h4' textAlign='center'>
                            No cargo to visualize
                        </Header>
                }
            </Modal.Content>
        </Modal>
    );
}
