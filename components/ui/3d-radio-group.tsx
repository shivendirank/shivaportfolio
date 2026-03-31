'use client';

import React from 'react';
import styled from 'styled-components';

interface RadioProps {
    activeTab?: string;
    onChange?: (value: string) => void;
}

const Radio = ({ activeTab, onChange }: RadioProps) => {
    return (
        <StyledWrapper>
            <div className="radio-input">
                <div className="glass">
                    <div className="glass-inner" />
                </div>
                <div className="selector">
                    <div className="choice">
                        <div>
                            <input
                                className="choice-circle"
                                checked={activeTab === 'one'}
                                onChange={() => onChange?.('one')}
                                name="number-selector"
                                id="one"
                                type="radio"
                            />
                            <div className="ball" />
                        </div>
                        <label htmlFor="one" className="choice-name">1</label>
                    </div>
                    <div className="choice">
                        <div>
                            <input
                                className="choice-circle"
                                checked={activeTab === 'two'}
                                onChange={() => onChange?.('two')}
                                name="number-selector"
                                id="two"
                                type="radio"
                            />
                            <div className="ball" />
                        </div>
                        <label htmlFor="two" className="choice-name">2</label>
                    </div>
                    <div className="choice">
                        <div>
                            <input
                                className="choice-circle"
                                checked={activeTab === 'three'}
                                onChange={() => onChange?.('three')}
                                name="number-selector"
                                id="three"
                                type="radio"
                            />
                            <div className="ball" />
                        </div>
                        <label htmlFor="three" className="choice-name">3</label>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .radio-input {
    display: flex;
    height: 180px;
    align-items: center;
    justify-content: center;
  }

  .glass {
    z-index: 2;
    height: 100%;
    width: 60px;
    margin-right: 20px;
    padding: 6px;
    background-color: rgba(200, 255, 0, 0.1);
    border-radius: 25px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 40px -10px,
      rgba(200, 255, 0, 0.05) 0px -2px 6px 0px inset;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(200, 255, 0, 0.1);
  }

  .glass-inner {
    width: 100%;
    height: 100%;
    border-color: rgba(200, 255, 0, 0.2);
    border-width: 4px;
    border-style: solid;
    border-radius: 20px;
  }

  .selector {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .choice {
    display: flex;
    align-items: center;
  }

  .choice > div {
    position: relative;
    width: 32px;
    height: 32px;
    margin-right: 12px;
    z-index: 0;
  }

  .choice-circle {
    appearance: none;
    height: 100%;
    width: 100%;
    border-radius: 100%;
    border-width: 4px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.05);
    cursor: pointer;
    background: rgba(255, 255, 255, 0.02);
    transition: all 0.3s ease;
  }

  .choice-circle:hover {
    border-color: rgba(200, 255, 0, 0.3);
  }

  .ball {
    z-index: 1;
    position: absolute;
    inset: 0px;
    transform: translateX(-80px);
    box-shadow: rgba(0, 0, 0, 0.3) 0px -5px 10px 0px inset,
      rgba(200, 255, 0, 0.4) 0px 0px 15px -2px;
    border-radius: 100%;
    transition: transform 800ms cubic-bezier(1, -0.4, 0, 1.4);
    background-color: #C8FF00;
  }

  .choice-circle:checked + .ball {
    transform: translateX(0px);
  }

  .choice-name {
    color: rgba(255, 255, 255, 0.4);
    font-size: 24px;
    font-weight: 900;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  input:checked ~ .choice-name {
    color: #C8FF00;
  }
`;

export default Radio;
