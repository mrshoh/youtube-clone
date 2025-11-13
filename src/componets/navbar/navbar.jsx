import { Stack, Box } from "@mui/material"
import { logo } from "../../constants"
import { colors } from "../../constants/colors"
import { Link } from "react-router-dom"
import SearchBar from "../search-bar/search-bar"

const Navbar = () => {
  return (
      <Stack direction="row" 
        alignItems="center" 
         p={2} 
         sx={{ position: 'sticky', top: 0, justifyContent: 'space-between', zIndex: 1000, background: colors.primary }}
        >
        <Link to={"/"}>
        <img src={logo} height={30} alt="Logo"/>
        </Link>
        <SearchBar />
        <Box />
    </Stack>
  )
}

export default Navbar