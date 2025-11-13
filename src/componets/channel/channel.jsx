import { Box, Button, Container } from "@mui/material"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ChannelCard, Videos } from ".."
import { ApiService } from "../../service/api.service"

const Channel = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const dataChannelDetail = await ApiService.fetching(`channels?part=snippet&id=${id}`);
        
        console.log(dataChannelDetail)
        setChannelDetail(dataChannelDetail.items[0])

        const dataVideo = await ApiService.fetching(`search?channelId=${id}&part=snippet&order=date`);
        setVideos(dataVideo?.items);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    }
    getData();
  }, [id]);
  
  return (
    <Box minHeight={"95vh"} mt={"1vh"}>
      <Box>
        <Box 
          width={"100%"} 
          height={"300px"} 
          zIndex={10} 
          sx={{backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`, backgroundPosition:"center", backgroundSize:"cover", objectFit:"cover", backgroundRepeat:"no-repeat"}} />
        <ChannelCard video={channelDetail} marginTop={"-100px "} />
      </Box>
      <Container maxWidth={"90vh"}>
        <Videos videos={videos} /> 
      </Container>
    </Box>
  )
}

export default Channel