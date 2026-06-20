import {useCallback, useEffect, useRef, useState} from 'react';
import {Button, Header, Modal} from 'semantic-ui-react';

import armStationsImage from '../assets/arm-stations.png';

const stationCalibration = {
    left: {xRatio: 75 / 1454, station: 93},
    right: {xRatio: 1211 / 1454, station: 869}
};

const minStation = stationCalibration.left.station;
const maxStation = 1000;

function imageXRatioToStation(xRatio){
    const {left, right} = stationCalibration;
    const station = left.station + ((xRatio - left.xRatio) * (right.station - left.station)) / (right.xRatio - left.xRatio);
    return Math.round(station);
}

function stationToImageXRatio(station){
    const {left, right} = stationCalibration;
    return left.xRatio + ((station - left.station) * (right.xRatio - left.xRatio)) / (right.station - left.station);
}

function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
}

function isStationInBounds(station){
    return station >= minStation && station <= maxStation;
}

export default function ArmPicker({open, value, onPick, onClose}){
    const frameRef = useRef(null);
    const imageRef = useRef(null);
    const lastPointerYRef = useRef(null);
    const [pickedPoint, setPickedPoint] = useState(null);
    const [pickedStation, setPickedStation] = useState(null);
    const [hasUserSelection, setHasUserSelection] = useState(false);

    const updateScrollMetrics = useCallback(() => {
        const frame = frameRef.current;

        if (!frame){
            return;
        }
    }, []);

    const scrollToXRatio = useCallback((xRatio) => {
        const frame = frameRef.current;
        const image = imageRef.current;

        if (!frame || !image){
            return;
        }

        const targetX = xRatio * image.clientWidth;
        frame.scrollLeft = targetX - (frame.clientWidth / 2);
        updateScrollMetrics();
    }, [updateScrollMetrics]);

    const setStationSelection = useCallback((station, top='50%', userSelected=false) => {
        const xRatio = stationToImageXRatio(station);

        setPickedPoint({
            left: `${xRatio * 100}%`,
            top
        });
        setPickedStation(station);
        setHasUserSelection(userSelected);
        scrollToXRatio(xRatio);
    }, [scrollToXRatio]);

    useEffect(() => {
        if (!open){
            return;
        }

        const station = Number(value);

        if (!Number.isFinite(station)){
            setPickedPoint(null);
            setPickedStation(null);
            setHasUserSelection(false);
            return;
        }

        const clampedStation = Math.round(clamp(station, minStation, maxStation));
        setStationSelection(clampedStation);
        setTimeout(() => setStationSelection(clampedStation), 0);
    }, [open, value, setStationSelection]);

    useEffect(() => {
        if (!open){
            return;
        }

        updateScrollMetrics();
        window.addEventListener('resize', updateScrollMetrics);

        return () => {
            window.removeEventListener('resize', updateScrollMetrics);
        };
    }, [open, updateScrollMetrics]);

    const pickStation = (event, image = imageRef.current) => {
        event.preventDefault();

        if (!image){
            return;
        }

        const rect = image.getBoundingClientRect();
        const renderedX = event.clientX - rect.left;
        const renderedY = event.clientY - rect.top;
        const xRatio = clamp(renderedX / rect.width, 0, 1);
        const yRatio = clamp(renderedY / rect.height, 0, 1);
        const station = imageXRatioToStation(xRatio);

        setPickedPoint({
            left: `${xRatio * 100}%`,
            top: `${yRatio * 100}%`
        });
        setPickedStation(station);
        setHasUserSelection(true);
    };

    const startPickStation = (event) => {
        event.preventDefault();
        lastPointerYRef.current = event.clientY;
        event.currentTarget.setPointerCapture(event.pointerId);
        pickStation(event, event.currentTarget);
    };

    const dragPickStation = (event) => {
        const frame = frameRef.current;

        event.preventDefault();

        if (frame && lastPointerYRef.current !== null){
            frame.scrollTop -= event.clientY - lastPointerYRef.current;
        }

        lastPointerYRef.current = event.clientY;
        pickStation(event);
    };

    const stopPickStation = () => {
        lastPointerYRef.current = null;
    };

    const pickSliderStation = (event) => {
        const station = Number(event.target.value);
        setStationSelection(station, pickedPoint?.top || '50%', true);
    };

    const acceptStation = () => {
        const originalStation = Number(value);
        const originalStationIsInBounds = Number.isFinite(originalStation) && isStationInBounds(originalStation);

        if (pickedStation !== null && (hasUserSelection || originalStationIsInBounds)){
            onPick(pickedStation);
        }

        onClose();
    };

    const originalStation = Number(value);
    const originalStationIsInBounds = Number.isFinite(originalStation) && isStationInBounds(originalStation);
    const canAcceptStation = pickedStation !== null && (hasUserSelection || originalStationIsInBounds);

    return (
        <Modal open={open} onClose={onClose} size='fullscreen' closeIcon>
            <Modal.Header>Pick Arm</Modal.Header>
            <Modal.Content>
                <Header as='h4' textAlign='center'>
                    {pickedStation === null ? 'Tap the station diagram' : `Selected FS ${pickedStation}`}
                </Header>
                <div className='arm-picker-frame' ref={frameRef} onScroll={updateScrollMetrics}>
                    <div className='arm-picker-stage'>
                        <img
                            ref={imageRef}
                            className='arm-picker-image'
                            src={armStationsImage}
                            alt='Aircraft station diagram'
                            draggable='false'
                            onLoad={() => {
                                updateScrollMetrics();
                                if (pickedStation !== null){
                                    scrollToXRatio(stationToImageXRatio(pickedStation));
                                }
                            }}
                            onContextMenu={(event) => event.preventDefault()}
                            onDragStart={(event) => event.preventDefault()}
                            onPointerDown={startPickStation}
                            onPointerMove={(event) => {
                                if (event.buttons === 1 || event.pointerType === 'touch'){
                                    dragPickStation(event);
                                }
                            }}
                            onPointerUp={stopPickStation}
                            onPointerCancel={stopPickStation}
                            onLostPointerCapture={stopPickStation}
                        />
                        {
                            pickedPoint
                            ?
                                <>
                                    <div className='arm-picker-station-line' style={{left: pickedPoint.left}}/>
                                    <div className='arm-picker-marker' style={pickedPoint}/>
                                </>
                        :
                            null
                        }
                    </div>
                </div>
                <div className='arm-picker-slider-row'>
                    <span>{minStation}</span>
                    <input
                        className='arm-picker-slider'
                        type='range'
                        min={minStation}
                        max={maxStation}
                        step='1'
                        value={pickedStation === null ? minStation : pickedStation}
                        onChange={pickSliderStation}
                    />
                    <span>{maxStation}</span>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button content='Cancel' onClick={onClose}/>
                <Button content='Use Selected Arm' positive disabled={!canAcceptStation} onClick={acceptStation}/>
            </Modal.Actions>
        </Modal>
    );
}
