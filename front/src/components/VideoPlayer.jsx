import ReactPlayer from "react-player";

const ClipPlayer = ({url}) => {

    return (
        <ReactPlayer url={url} playing controls/>
    );
}

export default ClipPlayer;