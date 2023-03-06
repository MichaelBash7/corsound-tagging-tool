import React, {useContext, useState} from 'react';
import MyButton from "./ui/buttons/MyButton";
import {Context} from "../index";
import ClipPlayer from "./VideoPlayer";
import ClipService from "../api/ClipService";

const ClipItem = (props) => {

    const {store} = useContext(Context)

    const [selectOkValues, setSelectOkValues] = useState({
        videoId: props.post.subclipId,
        reviewer: store.user.email,
        valid: 1,
        gender: '',
        age_range: '',
        ethnicity: '',
    });

    const [selectNotOkValues] = useState({
        videoId: props.post.subclipId,
        reviewer: store.user.email,
        valid: 0,
    });

    const handleSelectChange = (event) => {
        setSelectOkValues({...selectOkValues, [event.target.name]: event.target.value});
    }

    const isDisabled = !selectOkValues.gender || !selectOkValues.age_range || !selectOkValues.ethnicity

    return (
            <div className="post">
                <div className="post__content">
                    <strong>{props.post.subclipId}</strong>
                    <div>
                        <ClipPlayer url={props.post.s3_url} onReady={true}/>
                    </div>
                </div>

                <div className="post__btns">
                    <select name="gender" value={selectOkValues.gender} onChange={handleSelectChange} >
                        <option value="">Gender</option>
                        <option value="man">man</option>
                        <option value="woman">woman</option>
                    </select>
                    <select name="age_range" value={selectOkValues.age_range} onChange={handleSelectChange} style={{marginLeft: 7}}>
                        <option value="">Age</option>
                        <option value="18-24">18-24</option>
                        <option value="25-34">25-34</option>
                        <option value="35-44">35-44</option>
                        <option value="45-54">45-54</option>
                        <option value="55-64">55-64</option>
                        <option value="65 and older">65 and older</option>
                    </select>
                    <select name="ethnicity" value={selectOkValues.ethnicity} onChange={handleSelectChange} style={{marginLeft: 7}}>
                        <option value="">Ethnicity</option>
                        <option value="African American">African American</option>
                        <option value="East Asian">East Asian</option>
                        <option value="Caucasian Latin">Caucasian Latin</option>
                        <option value="Asian Indian">Asian Indian</option>
                        <option value="Arab">Arab</option>
                    </select>
                    <input hidden value={props.post.subclipId} name="clipid"></input>
                    <MyButton     disabled={isDisabled}
                                  onClick={() => {
                                  selectOkValues.videoId = props.post.subclipId;
                                  ClipService.putOkClips({ ...selectOkValues});
                                  props.remove(props.post);
                                  }}
                                  style={{marginLeft: 10}}>
                                     Ok
                    </MyButton>
                    <MyButton     onClick={() => {
                                  selectNotOkValues.videoId = props.post.subclipId;
                                  ClipService.putNotOkClips({ ...selectNotOkValues});
                                  props.remove(props.post)}}
                                  style={{marginLeft: 10, color: 'white',  backgroundColor: 'indianred'}}>
                                     Not Ok
                    </MyButton>
                </div>
            </div>
    );
};

export default ClipItem;