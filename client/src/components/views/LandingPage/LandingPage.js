import { Typography, Button, Form, message, Input, Icon , Row, Col, Avatar, Card} from 'antd';
import React,{ useEffect, useState }from 'react';
import { FaCode } from "react-icons/fa";
import Axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;
function LandingPage() {
    
    const [Videos, setVideo] = useState([])
    useEffect(() => {
        Axios.get('/api/video/getVideos')
        .then(response => {
            if (response.data.success) {
                console.log(response.data.videos)
                setVideo(response.data.videos)
            } else {
                alert('no video')
            }
        })
    }, [])

    const renderCards = Videos.map((video, index) => {
            
        var minutes = Math.floor(video.duration /60);
        var seconds = Math.floor(video.duration - minutes * 60);


        return <Col lg={6} md={8} xs={24} >
               <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
                </div>
                <br />
                <Meta
                    avatar ={
                        <Avatar src={video.writer.image} />
                    }
                    title ={video.title}
                    description={video.description}
                
                />
                <span>{video.writer.name}</span><br />
                <span style={{ marginLeft: '3rem'}}>{video.views} views</span> -<span>{moment(video.createAt).format("MMM Do YY")}</span>

                </Col>
    })
    
    
    
    return (
        <div style ={{ width : '85%', margin : '3rem auto' }}>
            <Title level={2}> recommend</Title>
            <hr />
            <Row gutter={[32,16]}>

                {renderCards}
                
                

            </Row>
        </div>
        )
}

export default LandingPage
