import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from 'gsap';
import { playImg, replayImg, pauseImg } from "../utils";
import {useGSAP} from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);
    const [video, setVideo] = useState(
        {
            isEnd:false,
            startPlay:false,
            videoId: 0,
            islastVideo:false ,
            isPlaying:false
        })
    const   { isEnd, startPlay, videoId, islastVideo , isPlaying} = video;
    
    const [loadedData, setloadedData] = useState([]);
    useGSAP(()=>{
        gsap.to(
            "#slider",
            {
                transform: `translateX(${-100 * videoId}%)`,
                duration: 2,
                ease: 'power2.inOut'
            }
        )
        gsap.to(
            "#video",
            {
                scrollTrigger:
                {
                    trigger: '#video',
                    toggleActions:'restart none none none'
                },
                onComplete:() => {
                    setVideo((pre) =>
                    ({
                        ...pre,
                        startPlay: true,
                        isPlaying: true
                    }))
                }
            }
        )
    }, [isEnd, videoId])

    useEffect(
        () =>
        {
            if (loadedData.length > 3)
            {
                if (!isPlaying)
                    videoRef.current[videoId].pause();
                else
                    startPlay && videoRef.current[videoId].play();
            }
        },[ startPlay, videoId, isPlaying, loadedData]
    )

    const handleLoadedMetaData = (index, e) => setloadedData(
        (pre) =>[...pre, e]
    )
    useEffect(
        () =>
        {
            let currentProgress = 0;
            let span = videoSpanRef.current;
            if (span[videoId])
            {
                // progress animation video
                let anim = gsap.to(
                    span[videoId],
                    {
                        onUpdate: () =>
                        {
                            const progress = Math.ceil(anim.progress() * 100);
                            if (progress != currentProgress)
                            {
                                currentProgress = progress;
                                gsap.to(videoDivRef.current[videoId],
                                    {
                                        width: window.innerWidth < 760
                                        ? '10vw' : window.innerWidth < 1200
                                        ? '10vw' : '4vw'
                                    }
                                )
                                gsap.to(span[videoId], 
                                    {
                                        width: `${currentProgress}%`,
                                        backgroundColor:'white'
                                    }
                                )
                            }
                        }
                        ,
                        onComplete:() =>
                        {
                            if (isPlaying)
                            {
                                gsap.to(videoDivRef.current[videoId],{
                                    width: '12px'
                                })
                                gsap.to(span[videoId], 
                                   {
                                        backgroundColor:'#afafaf'
                                    },
                                )
                            }
                        }
                    }
                )
                if (videoId === 0)
                {
                    anim.restart();
                }
                // how  long the animation will last
                const animUpdate = () =>
                {
                    if (videoRef.current)
                        anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
                }

                if (isPlaying)
                    gsap.ticker.add(animUpdate)
                else
                    gsap.ticker.remove(animUpdate)
            }
        }, [videoId, startPlay]
    )

    const handleProcess = (type, i)=>{
        switch(type)
        {
            case 'video-end':
                setVideo((pre) => ({...pre, isEnd:true, videoId: i + 1}))
                break;
            case 'video-last':
                setVideo((pre)=>({...pre, islastVideo: true}))
                break;
            case 'video-reset':
                setVideo((pre)=>({...pre, islastVideo:false, videoId:0}))
                break;
            case 'play':
                setVideo((pre)=>({...pre, isPlaying:!pre.isPlaying}))
                break;
            case 'pause':
                setVideo((pre)=>({...pre, isPlaying:!pre.isPlaying}))
                break;
            default:
                return video;
        }
    }
    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map(
                    (list, index) =>
                    (
                        <div key={index} id="slider"
                            className="sm:pr-20 pr-10">
                            <div className="video-carousel_container">
                                <div className="w-[100%] h-[80%] flex-center rounded-3xl overflow-hidden bg-black">
                                    <video
                                        id="video"
                                        playsInline={true}
                                        preload="auto"
                                        muted
                                        onEnded={() =>
                                        
                                            index !== 3 ? handleProcess('video-end', index) : handleProcess('video-last')
                                        }
                                        ref={(el) => (videoRef.current[index] = el)}
                                        onPlay={
                                            ()=>{
                                                setVideo((prevVideo) =>({
                                                    ...prevVideo, isPlaying:true
                                                }))
                                            }
                                        }
                                        onLoadedMetadata={(e) => handleLoadedMetaData(index, e)}
                                        >
                                        <source src={list.video} type="video/mp4"/>
                                    </video>
                                </div>
                                <div className="absolute top-12 left-[5%] z-10">
                                    {list.textLists.map(
                                        (text)=>
                                        (
                                            <p key={text} className="md:text-2xl text-xl font-medium">
                                                {text}
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {
                        videoRef.current.map((_, i)=>(
                        <span
                            key={i}
                            ref={(el) => (videoDivRef.current[i] = el)}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                        >
                            <span className="absolute h-full w-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el)}/>
                        </span>
                    ))}
                </div>
                <button className="control-btn">
                    <img
                        src={islastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={islastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
                        onClick={islastVideo ? () => handleProcess('video-reset') : !isPlaying ? () => handleProcess('play') : () => handleProcess('pause')}
                    />
                </button>
            </div>
        </>
    )
}

export default React.memo(VideoCarousel);