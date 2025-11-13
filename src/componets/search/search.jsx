import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ApiService } from "../../service/api.service"
import { Box, Container, Typography } from "@mui/material"
import { colors } from "../../constants/colors"
import { Videos } from "../"

const Search = () => {
  const [videos, setVideos] = useState([]) 
  const {id} = useParams()

  useEffect(() => {
    ApiService.fetching(`search?part=snippet&q=${id}`)
      .then((data) => setVideos(data.items))
  }, [id])

  return (
    <Box p={2} sx={{height: '90vh'}}>
      <Container maxWidth={'90%'}>
        <Typography variant="h4" fontWeight={"bold"} mb={2 }>
          Search Results for: <span style={{color: colors.accent}}>{id}</span> Videos
        </Typography>
        <Videos videos={videos} />
      </Container>
    </Box>
  )
}

export default Search