import React, { Component, Fragment } from 'react';
import {
  SliderItem,
  GetRailProps,
  GetTrackProps,
  GetHandleProps
} from 'react-compound-slider';

const railOuterStyle = {
  position: 'absolute' as 'absolute',
  transform: 'translate(0%, -50%)',
  width: '100%',
  height: 42,
  borderRadius: 7,
  cursor: 'pointer',
};

const railInnerStyle = {
  position: 'absolute' as 'absolute',
  width: '100%',
  height: 8,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  pointerEvents: 'none' as 'none',
  backgroundColor: '#d4d4d4',
};

interface SliderRailProps {
  getRailProps: GetRailProps;
}

export const SliderRail: React.FC<SliderRailProps> = ({ getRailProps }) => (
  <Fragment>
    <div style={railOuterStyle} {...getRailProps()} />
    <div style={railInnerStyle} />
  </Fragment>
);

interface HandleProps {
  isActive: boolean;
  domain: ReadonlyArray<number>;
  handle: SliderItem;
  getHandleProps: GetHandleProps;
  disabled?: boolean;
  format: (value: number) => string;
}

export class Handle extends Component<HandleProps> {
  state = {
    mouseOver: false,
  };

  onMouseEnter = () => {
    this.setState({ mouseOver: true });
  };

  onMouseLeave = () => {
    this.setState({ mouseOver: false });
  };

  render() {
    const {
      domain: [min, max],
      handle: { id, value, percent },
      isActive,
      disabled,
      getHandleProps,
      format,
    } = this.props;
    const { mouseOver } = this.state;

    return (
      <Fragment>
        {(mouseOver || isActive) && !disabled ? (
          <div
            style={{
              left: `${percent}%`,
              position: 'absolute',
              marginLeft: '-20px',
              width: '40px',
              marginTop: '-28px'
            }}
          >
            <div className="tooltip" style={{width: '40px'}}>
              <span className="tooltiptext" style={{width: '40px', fontSize: '12.5px', display: 'block', textAlign: 'center' }}>{format(value)}</span>
            </div>
          </div>
        ) : null}
        <div
          style={{
            left: `${percent}%`,
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            WebkitTapHighlightColor: 'rgba(0,0,0,0)',
            zIndex: 400,
            width: 26,
            height: 42,
            cursor: 'pointer',
            backgroundColor: 'none',
          }}
          {...getHandleProps(id)}
          {...{
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave
          }}
        />
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          style={{
            left: `${percent}%`,
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            WebkitTapHighlightColor: 'rgba(0,0,0,0)',
            zIndex: 300,
            width: 16,
            height: 16,
            border: 0,
            borderRadius: '50%',
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
            backgroundColor: disabled ? '#666' : '#007aff',
          }}
        />
      </Fragment>
    );
  }
}

interface TrackProps {
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
  disabled?: boolean;
}

export const Track: React.FC<TrackProps> = ({
  source,
  target,
  getTrackProps,
  disabled,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(0%, -50%)',
        height: 8,
        zIndex: 1,
        backgroundColor: disabled ? '#999' : '#bbb',
        borderRadius: 7,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  );
};