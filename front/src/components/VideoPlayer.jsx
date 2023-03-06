import ReactPlayer from "react-player";

const ClipPlayer = ({url}) => {

    return (
        <ReactPlayer url={url} playing={true} controls={true}/>
    );
}
export default ClipPlayer;