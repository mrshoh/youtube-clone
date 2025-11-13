import { useParams } from "react-router-dom"
import {  useEffect, useState } from "react";
import { ApiService } from "../../service/api.service"
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { Check, FavoriteOutlined, MarkChatRead, Tag, Visibility, CheckCircle} from "@mui/icons-material";
import { Loader, Videos } from ".."
import { Link } from "react-router-dom";


const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState({snippet: {tags: []}, statistics: {likeCount:0, viewCount:0, commentCount:0}});
  const [relatedVideos, setRelatedVideos] = useState([]);

  const {id} = useParams();


  useEffect(() => {
    ApiService.fetching(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]));

    ApiService.fetching(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setRelatedVideos(data.items));
  }, [id])

  

  if(!videoDetail?.snippet) return <Loader />;
  if(!relatedVideos?.length) return <Loader />;

  

 
  return (
    <Box minHeight={"90vh"} mb={10}>
      <Box display={"flex"} sx={{flexDirection: {xs: "column", md: "row"}}}>
        <Box width={{xs: "100%", md: "75%"}} px={2} py={1}>
          <iframe width="100%" height="500vh" src={`https://www.youtube.com/embed/${id}?si=z8obyw9p6jcV_DjV`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          {/* {videoDetail?.snippet?.tags && videoDetail?.snippet?.tags.map((tag, index) => (
            <Chip 
              key={index} 
              label={tag} 
              sx={{marginTop:"10px", cursor:"pointer", ml:"10px"}} 
              onDelete={()=>{}} 
              variant="outlined" 
              deleteIcon={<Tag />} 
              />
          ))} */}
          <Typography variant="h5" fontWeight={"bold"} p={2}>
            {videoDetail?.snippet.title}
          </Typography>
          <Stack direction={"row"} gap={"20px"} alignItems={"center"} px={2} py={1}>
            <Stack direction={"row"} gap={"3px"} alignItems={"center"} sx={{opacity:0.7}}>
              <Visibility />
              {parseInt(videoDetail.statistics.viewCount).toLocaleString()} views
            </Stack>
            <Stack direction={"row"} gap={"3px"} alignItems={"center"} sx={{opacity:0.7}}>
              <FavoriteOutlined />
              {parseInt(videoDetail?.statistics?.likeCount).toLocaleString()} likes
            </Stack>
            <Stack direction={"row"} gap={"3px"} alignItems={"center"} sx={{opacity:0.7}}>
              <MarkChatRead />
              {parseInt(videoDetail.statistics.commentCount).toLocaleString()} comments
            </Stack>
          </Stack>
          <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
          <Stack direction={"row"} gap={"10px"} alignItems={"center"} px={2} py={1}>
            <Avatar alt={videoDetail?.snippet?.channelTitle} src={videoDetail?.snippet?.thumbnails?.default?.url} />
            <Typography variant="subtitle1" color={"grey"} >
                {videoDetail?.snippet?.channelTitle}
                <CheckCircle sx={{fontSize: "12px", color: "grey", ml: "5px"}} />
            </Typography>
          </Stack>
          </Link>
          <Typography variant="subtitle2" p={2} sx={{opacity:0.7}}>
            {videoDetail.snippet.description}
          </Typography>
        </Box>
        <Box width={{xs:"100%", md:"25%"}} px={2} py={{md: 1, xs: 5}} justifyContent={"center"} alignItems={"center"} overflow={"scroll"} height={"120vh"}>
          <Videos videos={relatedVideos} />
        </Box>
      </Box>
    </Box>
    )
}

export default VideoDetail