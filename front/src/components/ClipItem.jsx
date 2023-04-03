import React, {useContext, useState, useEffect} from 'react';
import {Context} from "../index";
import ClipService from "../api/ClipService";
import {Button, Space, Modal, Popconfirm, message} from 'antd';
import ReactPlayer from "react-player";

const ClipItem = (props) => {

    const {store} = useContext(Context)

    const defaultState = {
        videoId: props.post.subclipId,
        reviewer: store.user.email,
        valid: props.showResults ? props.post.valid : 1,
        gender: props.showResults ? props.post.gender : '',
        age_range: props.showResults ? props.post.age_range : '',
        ethnicity: props.showResults ? props.post.ethnicity : '',
    }

    const [selectNotOkValues] = useState({
        videoId: props.post.subclipId,
        reviewer: store.user.email,
        valid: 0,
    });
    const [selectOkValues, setSelectOkValues] = useState(defaultState);
    const [modalWindow, setModalWindow] = useState({
        isOpen: false,
        isPlaying: false,
        url: '',
    });

    const openModal = (videoId) => {
        ClipService.getVideoById(videoId).then(response => {
            setModalWindow({
                isOpen: true,
                isPlaying: true,
                url: response.data.s3_url,
            })
        })
    }

    const closeModal = () => {
        setModalWindow({...modalWindow, isPlaying: false})
    };

    useEffect(() => {
        //this fixes a bug: stop playing after closing Modal didn't work
        if (modalWindow.isPlaying === false && modalWindow.isOpen !== false) {
            setModalWindow({...modalWindow, isOpen: false})
        }
    }, [modalWindow]);

    const handleVideoNotValid = () => {
        const videoData = {
            videoId: props.post.videoId,
            reviewer: store.user.email,
            valid: 0,
        }
        ClipService.sendVideoData(videoData)

        const clipsToRemove = props.clips.filter(clip => clip.videoId === props.post.videoId).map(clip => clip.subclipId)
        console.log('Removed: ' + clipsToRemove.length)
        props.remove(clipsToRemove)
        closeModal()
        message.success('Clips from that video have been removed')
    };

    const handleSelectChange = (event) => {
        setSelectOkValues({...selectOkValues, [event.target.name]: event.target.value});
    }

    const isDisabled = !selectOkValues.gender || !selectOkValues.age_range || !selectOkValues.ethnicity || props.showResults

    const formConfig = {
        ages: [
            "18-24",
            "25-34",
            "35-44",
            "45-54",
            "55-64",
            "65 and older",
        ],
        ethnicity: [
            "African American",
            "East Asian",
            "Caucasian Latin",
            "Asian Indian",
            "Arab",
        ],
        gender: [
            "man",
            "woman",
        ],
    }

    const printFormOptions = (formConfigKey) => {
        let options = []
        formConfig[formConfigKey].map(value => {
            options.push(<option key={value} value={value}>{value}</option>)
        })
        return options
    }

    const printResult = () => {
        if (!props.showResults) return

        return (
            <div className="post__result">
                {props.post.valid ? 'OK' : 'Not OK'}
            </div>
        )
    }

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.subclipId}</strong>
                <div>
                    <ReactPlayer url={props.post.s3_url} playing={false} controls={true}/>
                </div>
            </div>
            {printResult()}
            <div className="post__btns">
                <select name="gender" value={selectOkValues.gender} onChange={handleSelectChange}>
                    <option value="">Gender</option>
                    {printFormOptions('gender')}
                </select>
                <select name="age_range" value={selectOkValues.age_range} onChange={handleSelectChange}
                        style={{marginLeft: 7}}>
                    <option value="">Age</option>
                    {printFormOptions('ages')}
                </select>
                <select name="ethnicity" value={selectOkValues.ethnicity} onChange={handleSelectChange}
                        style={{marginLeft: 7}}>
                    <option value="">Ethnicity</option>
                    {printFormOptions('ethnicity')}
                </select>
                <Button
                    disabled={isDisabled}
                    onClick={() => {
                        selectOkValues.videoId = props.post.subclipId;
                        ClipService.sendClipData(selectOkValues);
                        props.remove([props.post.subclipId]);
                    }}
                    style={{marginLeft: 10}}
                >
                    Ok
                </Button>
                <Button
                    onClick={() => {
                        selectNotOkValues.videoId = props.post.subclipId;
                        ClipService.sendClipData(selectNotOkValues);
                        props.remove([props.post.subclipId])
                    }}
                    style={{marginLeft: 10, color: 'white', backgroundColor: 'indianred'}}
                    disabled={props.showResults}
                >
                    Not Ok
                </Button>
            </div>
            <Space wrap>
                <Button disabled={props.showResults} onClick={() => openModal(props.post.videoId)}>Parent video</Button>
                <Modal
                    title={"Entire video " + props.post.videoId}
                    open={modalWindow.isOpen}
                    onCancel={closeModal}
                    footer={null}
                    width={700}
                >
                    <ReactPlayer
                        url={modalWindow.url}
                        playing={modalWindow.isPlaying}
                        controls={true}
                        onPlay={() => setModalWindow({...modalWindow, isPlaying: true})}
                        onPause={() => setModalWindow({...modalWindow, isPlaying: false})}
                    />

                    <Space wrap style={{margin: "10px 0", display: "flex", justifyContent: "center"}}>
                        <Popconfirm title="Sure?" onConfirm={() => handleVideoNotValid()}>
                            <Button danger>Video is Not Ok</Button>
                        </Popconfirm>
                    </Space>
                </Modal>
            </Space>
        </div>
    );
};

export default ClipItem;
