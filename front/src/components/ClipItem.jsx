import React, {useContext, useState} from 'react';
import MyButton from "./ui/buttons/MyButton";
import {Context} from "../index";
import ClipPlayer from "./VideoPlayer";
import ClipService from "../api/ClipService";
import {Button, Space, Modal, Popconfirm, message} from 'antd';

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

    const [selectOkValues, setSelectOkValues] = useState(defaultState);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleVideoNotValid = () => {
        const videoData = {
            videoId: props.post.videoId,
            reviewer: store.user.email,
            valid: 0,
        }
        ClipService.sendVideoData(videoData)

        const clipsToRemove = props.clips.filter(clip => clip.videoId === props.post.videoId).map(clip => clip.subclipId)
        console.log(clipsToRemove)

        setIsModalOpen(false)
        message.success('Clips from that video have been removed')
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [selectNotOkValues] = useState({
        videoId: props.post.subclipId,
        reviewer: store.user.email,
        valid: 0,
    });

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
            options.push(<option value={value}>{value}</option>)
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
                        <ClipPlayer url={props.post.s3_url}/>
                    </div>
                </div>
                {printResult()}
                <div className="post__btns">
                    <select name="gender" value={selectOkValues.gender} onChange={handleSelectChange} >
                        <option value="">Gender</option>
                        {printFormOptions('gender')}
                    </select>
                    <select name="age_range" value={selectOkValues.age_range} onChange={handleSelectChange} style={{marginLeft: 7}}>
                        <option value="">Age</option>
                        {printFormOptions('ages')}
                    </select>
                    <select name="ethnicity" value={selectOkValues.ethnicity} onChange={handleSelectChange} style={{marginLeft: 7}}>
                        <option value="">Ethnicity</option>
                        {printFormOptions('ethnicity')}
                    </select>
                    <input hidden value={props.post.subclipId} name="clipid" readOnly={props.showResults}></input>
                    <MyButton     disabled={isDisabled}
                                  onClick={() => {
                                  selectOkValues.videoId = props.post.subclipId;
                                  ClipService.sendClipData(selectOkValues);
                                  props.remove([props.post]);
                                  }}
                                  style={{marginLeft: 10}}>
                                     Ok
                    </MyButton>
                    <MyButton     onClick={() => {
                                      selectNotOkValues.videoId = props.post.subclipId;
                                 //     ClipService.sendClipData(selectNotOkValues);
                                      props.remove([props.post])}
                                  }
                                  style={{marginLeft: 10, color: 'white',  backgroundColor: 'indianred'}}
                                  disabled={props.showResults}
                    >
                                     Not Ok
                    </MyButton>
                </div>
                <Space wrap>
                    <Button onClick={() => setIsModalOpen(true)}>Parent video</Button>
                    <Modal
                        title={"Entire video " + props.post.videoId}
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                        width={700}
                    >
                        <ClipPlayer url={props.post.s3_url}/>

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
