import React, { useMemo } from 'react';
import { Mouse } from './classMouse';
import { Point } from '../utils/draw/drawUtils';
import {
    MouseProps,
    defaultMouseProps,
    settingsByMouseType,
    colorsByMouseType,
    MouseColorType,
} from './mouseUtils';

const NOSE_ANIMATION_TIMES = 2;
const NOSE_ANIMATION_PAUSE_STATE_TIMES = 10;
const NOSE_ANIMATION_DURATION = '2s';
const NOSE_ANIMATION_REPEAT_COUNT = 'indefinite';

export default function SVGMouse(props: MouseProps) {
    const { height, animationDirection, useNoseAnimation, className, colorType } = {
        ...defaultMouseProps,
        ...props,
    };
    const mouseObject = useMemo(() => {
        const settingsByColorType = settingsByMouseType[colorType];
        return new Mouse({ height, ...settingsByColorType });
    }, [height, colorType]);

    const width = mouseObject.getWidth();
    const transform = animationDirection === 'left' ? '' : 'scale(-1, 1)';

    return (
        <svg
            width={width}
            height={height}
            style={{ transform }}
            className={`nosy-pests-mouse-svg ${className}`}
        >
            {renderHead(mouseObject, colorType)}
            {renderNoseSpot(mouseObject, colorType)}
            {renderEye(mouseObject)}
            {renderEar(mouseObject)}
            {renderWhiskers(mouseObject, useNoseAnimation)}
            {renderNose(mouseObject, useNoseAnimation)}
        </svg>
    );
}

function renderHead(mouseObject: Mouse, colorType: MouseColorType) {
    const headPath = mouseObject.getHeadPathSVG();
    const colors = colorsByMouseType[colorType];

    return <path d={headPath} fill={colors.bodyFillColor} stroke={colors.bodyStrokeColor} />;
}

function renderNoseSpot(mouseObject: Mouse, colorType: MouseColorType) {
    const spotPath = mouseObject.getNoseSpotPathSVG();
    if (spotPath === null) {
        return null;
    }
    const colors = colorsByMouseType[colorType];
    return (
        <path d={spotPath} fill={colors.noseSpotFillColor} stroke={colors.noseSpotStrokeColor} />
    );
}

function renderEye(mouseObject: Mouse) {
    const eyeData = mouseObject.getEyeData();
    const eyeHighLight = mouseObject.getEyeHighLightData();
    return (
        <g>
            <ellipse
                cx={eyeData.centerPoint[0]}
                cy={eyeData.centerPoint[1]}
                rx={eyeData.radiusX}
                ry={eyeData.radiusY}
                stroke='black'
                fill='black'
                key='eye'
            />
            <circle
                cx={eyeHighLight.centerPoint[0]}
                cy={eyeHighLight.centerPoint[1]}
                r={eyeHighLight.radius}
                stroke='white'
                fill='white'
                key='eye highLight'
            />
        </g>
    );
}

function renderWhiskers(mouseObject: Mouse, useNoseAnimation: boolean) {
    const areaPath = mouseObject.getWhiskersAreaPathSVG();
    const whiskers = mouseObject.getWhiskersData();

    return (
        <g>
            <path d={areaPath} stroke='grey' fill='none' />
            {whiskers.map((whiskerLine) => {
                const [firstVert, secondVert] = whiskerLine;
                return (
                    <line
                        x1={firstVert[0]}
                        y1={firstVert[1]}
                        x2={secondVert[0]}
                        y2={secondVert[1]}
                        stroke='grey'
                        fill='none'
                        strokeOpacity={0.5}
                        key={`${firstVert[0]}_${firstVert[1]}}`}
                    >
                        {useNoseAnimation && renderWhiskerAnimation(firstVert)}
                    </line>
                );
            })}
        </g>
    );
}

function renderEar(mouseObject: Mouse) {
    const pathString = mouseObject.getEarPathSVG();
    return <path d={pathString} fill='pink' stroke='grey' />;
}

function renderNose(mouseObject: Mouse, useNoseAnimation: boolean) {
    const { centerPoint, radiusX, radiusY, rotateAngle } = mouseObject.getNoseData();
    const [cx, cy] = centerPoint;

    const rotate = `rotate(${(rotateAngle * 180) / Math.PI} ${cx} ${cy})`;
    return (
        <ellipse
            cx={cx}
            cy={cy}
            rx={radiusX}
            ry={radiusY}
            stroke='grey'
            fill='pink'
            transform={rotate}
        >
            {useNoseAnimation && renderNoseAnimation(radiusX)}
        </ellipse>
    );
}

function renderNoseAnimation(radiusX: number) {
    const pauseValue = `${radiusX};`.repeat(NOSE_ANIMATION_PAUSE_STATE_TIMES);
    const oneCycle = `${(radiusX * 2) / 3};${radiusX};`;
    const allCycles = oneCycle.repeat(NOSE_ANIMATION_TIMES);
    return (
        <animate
            attributeName='rx'
            values={`${pauseValue}${allCycles}`}
            dur={NOSE_ANIMATION_DURATION}
            repeatCount={NOSE_ANIMATION_REPEAT_COUNT}
        />
    );
}

function renderWhiskerAnimation(firstVert: Point) {
    const pauseValue = `0 ${firstVert[0]} ${firstVert[1]};`.repeat(
        NOSE_ANIMATION_PAUSE_STATE_TIMES,
    );
    const oneCycle = `10 ${firstVert[0]} ${firstVert[1]};0 ${firstVert[0]} ${firstVert[1]};`;
    const allCycles = oneCycle.repeat(NOSE_ANIMATION_TIMES);
    return (
        <animateTransform
            attributeName='transform'
            attributeType='XML'
            type='rotate'
            values={`${pauseValue}${allCycles}`}
            dur={NOSE_ANIMATION_DURATION}
            repeatCount={NOSE_ANIMATION_REPEAT_COUNT}
        />
    );
}
