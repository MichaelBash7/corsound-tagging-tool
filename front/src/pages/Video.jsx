import React, {useEffect, useRef, useState} from "react";
import {useFetching} from "../hooks/useFetching";
import ClipService from "../api/ClipService";
import {getPageCount} from "../utils/Pages";
import ClipList from "../components/ClipList";
import Loader from "../components/ui/loader/Loader";
import {useObserver} from "../hooks/useObserver";
import {Layout, Row} from 'antd';

function Video() {
    const [clips, setClips] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [limit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();


    const [fetchClips, isClipsLoading] = useFetching(async (limit, page) => {
        const response = await ClipService.getAllClips(limit, page);
        setClips([...clips, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));
    })

    //console.log(clips)

    useObserver(lastElement, page < totalPages, isClipsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchClips(limit, page)
    }, [page, limit])

    const removeClips = (clipsToRemove) => {
        console.log(clipsToRemove)
        console.log(clips.filter(c => !clipsToRemove.includes(c.subclipId)));
    }

    return (

        <Layout.Content>
            <ClipList remove={removeClips} clips={clips} title="Short clips"/>
            <Row justify="center" style={{height: '100vh'}}>
            <div ref={lastElement} />

            {isClipsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            </Row>
        </Layout.Content>
    );
}

export default Video;
