import ReactPlayer from "react-player";

const ClipPlayer = ({url}) => {

    return (
        <ReactPlayer url={url} playing={false} controls={true}/>
    );
}
export default ClipPlayer;