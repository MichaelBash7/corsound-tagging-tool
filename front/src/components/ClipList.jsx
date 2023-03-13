import React from 'react';
import ClipItem from "./ClipItem";
import {TransitionGroup} from "react-transition-group";
import {CSSTransition} from "react-transition-group";

const ClipList = ({clips, title, remove = null, showResults = false}) => {

    if (!clips.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Clips not found!
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <TransitionGroup>
                {clips.map((clip, index) =>
                <CSSTransition
                    key={clip.id}
                    timeout={500}
                    classNames="post"
                >
                    <ClipItem remove={remove} number={index + 1} post={clip} showResults={showResults} />
                </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default ClipList;