import React, { Component } from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import { SliderRail, Handle, Track } from './components';

const sliderStyle = {
  position: 'relative' as 'relative',
  width: '100%',
};

const defaultValues = [20, 80];

interface SliderState {
  values: ReadonlyArray<number>;
  update: ReadonlyArray<number>;
  reversed: boolean;
}

interface SliderProps {
  onChange?: (values: ReadonlyArray<number>) => void;
  step: number;
  domain: ReadonlyArray<number>;
  format?: (value: number) => string;
}

export default class CustomSlider extends Component<SliderProps, {}, SliderState> {
 
  constructor(props: SliderProps) {
    super(props);
  }

  state = {
    values: this.props.domain,
    update: defaultValues.slice(),
    reversed: false
  };

  onUpdate = (update: ReadonlyArray<number>) => {
    this.setState({ update });
  };

  onChange = (values: ReadonlyArray<number>) => {
    this.setState({ values });
    this.props.onChange && this.props.onChange(values);
  };

  setDomain = (domain: number[]) => {
    this.setState({ domain });
  };

  toggleReverse = () => {
    this.setState(!this.state.reversed);
  };

  render() {
    const {
      state: { values, reversed },
    } = this;

    return (
      <div style={{ height: 0, width: '100%' }}>
        <Slider
          mode={1}
          step={this.props.step}
          domain={this.props.domain}
          reversed={reversed}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, activeHandleID, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    isActive={handle.id === activeHandleID}
                    key={handle.id}
                    handle={handle}
                    domain={this.props.domain}
                    getHandleProps={getHandleProps}
                    format={this.props.format || (number => String(number)) }
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </div>
    );
  }
}