import { Stack } from "@mui/material"
import { categories } from "../../constants"
import { colors } from "../../constants/colors"

const Category = ({selectedCategoryHandler, selectedCategory}) => {
  return ( 
    <Stack direction={"row"} sx={{height: 'auto', overflowX: 'scroll'}} >
        {categories.map((category) => (
            <button key={category.name} style={{display: 'flex', alignItems: 'center', padding: '10px', border: 'none', background: 'none', cursor: 'pointer', background: category.name === selectedCategory && colors.accent, color: category.name === selectedCategory && "#fff" }} className="category-btn" onClick={() => selectedCategoryHandler(category.name)}>
                <span style={{marginRight: '15px'}}>{category.icon}</span>
                <span>{category.name}</span>
            </button>
        ))}
    </Stack>
  )
}

export default Category